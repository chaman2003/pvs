'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { ProjectMediaEditor } from '@/components/admin/ProjectMediaEditor';
import { isCocoProject, type CocoProjectId, type ProjectVideoSlot } from '@/content/backup-project-media';
import { getCocoMediaDocument } from '@/lib/project-page-media';
import { slugify } from '@/lib/utils';

export interface AdminProject {
  _id?: string;
  id: string;
  title: string;
  location?: string;
  price?: string;
  status?: string;
  category?: string;
  description?: string;
  image?: string;
  gallery?: string[];
  videos?: string[];
  videoFiles?: string[];
  youtubeId?: string;
  bannerTitle?: string;
  leadVideo?: ProjectVideoSlot;
  videoGrid?: ProjectVideoSlot[];
  details?: { area?: string; totalArea?: string };
  seo?: { title?: string; description?: string };
}

type NotifyFn = (text: string, type?: 'success' | 'error') => void;

const emptyForm = {
  projectName: '',
  bannerTitle: '',
  location: '',
  price: '',
  plotSize: '',
  totalArea: '',
  status: 'Available',
  category: 'Residential',
  description: '',
};

function buildVideoGridFromVideos(
  videos: string[],
  gallery: string[],
  cover: string
): ProjectVideoSlot[] {
  return videos.map((id, i) => ({
    id,
    poster: gallery[i % gallery.length] || cover,
  }));
}

export function ProjectForm({
  mode,
  initial,
  getAuthHeaders,
  onSuccess,
  onCancel,
  onNotify,
}: {
  mode: 'create' | 'edit';
  initial?: AdminProject | null;
  getAuthHeaders: () => HeadersInit;
  onSuccess: () => void;
  onCancel?: () => void;
  onNotify: NotifyFn;
}) {
  const [form, setForm] = useState(emptyForm);
  const [gallery, setGallery] = useState<string[]>([]);
  const [youtubeVideos, setYoutubeVideos] = useState<string[]>([]);
  const [videoFiles, setVideoFiles] = useState<string[]>([]);
  const [videoGrid, setVideoGrid] = useState<ProjectVideoSlot[]>([]);
  const [leadVideo, setLeadVideo] = useState<ProjectVideoSlot | null>(null);
  const [saving, setSaving] = useState(false);

  const isCoco = initial?.id ? isCocoProject(initial.id) : false;

  useEffect(() => {
    if (mode === 'edit' && initial) {
      let media = {
        bannerTitle: initial.bannerTitle || '',
        gallery:
          initial.gallery?.length ? initial.gallery : initial.image ? [initial.image] : [],
        leadVideo: initial.leadVideo,
        videoGrid: initial.videoGrid,
        videos: initial.videos?.length
          ? initial.videos
          : initial.youtubeId
            ? [initial.youtubeId]
            : [],
      };

      if (isCocoProject(initial.id)) {
        const backup = getCocoMediaDocument(initial.id as CocoProjectId);
        media = {
          bannerTitle: media.bannerTitle || backup.bannerTitle,
          gallery: media.gallery.length ? media.gallery : backup.gallery,
          leadVideo: media.leadVideo?.id ? media.leadVideo : backup.leadVideo,
          videoGrid: media.videoGrid?.length ? media.videoGrid : backup.videoGrid,
          videos: media.videos.length ? media.videos : backup.videos,
        };
      }

      setForm({
        projectName: initial.title || '',
        bannerTitle: media.bannerTitle,
        location: initial.location || '',
        price: initial.price || '',
        plotSize: initial.details?.area || '',
        totalArea: initial.details?.totalArea || '',
        status: initial.status || 'Available',
        category: initial.category || 'Residential',
        description: initial.description || '',
      });
      setGallery(media.gallery);
      setYoutubeVideos(media.videos);
      setVideoFiles(initial.videoFiles || []);
      setLeadVideo(media.leadVideo || null);
      setVideoGrid(media.videoGrid || []);
    } else {
      setForm(emptyForm);
      setGallery([]);
      setYoutubeVideos([]);
      setVideoFiles([]);
      setLeadVideo(null);
      setVideoGrid([]);
    }
  }, [mode, initial]);

  const projectSlug = slugify(form.projectName || initial?.id || 'new-project');
  const cover = gallery[0] || '';

  function restoreCocoBackup() {
    if (!initial?.id || !isCocoProject(initial.id)) return;
    const doc = getCocoMediaDocument(initial.id as CocoProjectId);
    setForm((f) => ({ ...f, bannerTitle: doc.bannerTitle }));
    setGallery(doc.gallery);
    setYoutubeVideos(doc.videos);
    setLeadVideo(doc.leadVideo);
    setVideoGrid(doc.videoGrid);
    onNotify('Backup media loaded — save to sync database');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.projectName.trim()) {
      onNotify('Project name is required', 'error');
      return;
    }
    if (!form.location.trim()) {
      onNotify('Location is required', 'error');
      return;
    }
    if (!form.status.trim()) {
      onNotify('Status is required', 'error');
      return;
    }
    if (!form.category.trim()) {
      onNotify('Category is required', 'error');
      return;
    }

    const resolvedLead: ProjectVideoSlot | undefined =
      leadVideo?.id
        ? { id: leadVideo.id, poster: leadVideo.poster || cover }
        : youtubeVideos[0]
          ? { id: youtubeVideos[0], poster: cover }
          : undefined;

    const resolvedGrid =
      videoGrid.length > 0
        ? videoGrid
        : buildVideoGridFromVideos(youtubeVideos, gallery, cover);

    setSaving(true);
    const payload = {
      ...form,
      gallery,
      videos: youtubeVideos,
      videoFiles,
      youtubeId: resolvedLead?.id || youtubeVideos[0] || '',
      bannerTitle: form.bannerTitle || form.projectName,
      leadVideo: resolvedLead,
      videoGrid: resolvedGrid,
    };

    try {
      const url =
        mode === 'edit' && initial
          ? `/api/projects/${initial._id || initial.id}`
          : '/api/projects/add';
      const method = mode === 'edit' ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        const msg =
          typeof json.error === 'string'
            ? json.error
            : json.error?.fieldErrors
              ? Object.values(json.error.fieldErrors).flat().join(', ')
              : 'Save failed';
        throw new Error(msg);
      }

      onNotify(mode === 'edit' ? 'Project updated!' : 'Project added!');
      if (mode === 'create') {
        setForm(emptyForm);
        setGallery([]);
        setYoutubeVideos([]);
        setVideoFiles([]);
        setLeadVideo(null);
        setVideoGrid([]);
      }
      onSuccess();
    } catch (err) {
      onNotify(err instanceof Error ? err.message : 'Save failed', 'error');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 grid md:grid-cols-2 gap-4"
    >
      <div className="md:col-span-2 flex items-center justify-between gap-4 flex-wrap">
        <h2 className="font-headline font-bold text-primary text-xl">
          {mode === 'edit' ? `Edit: ${initial?.title}` : 'Add New Project'}
        </h2>
        <div className="flex items-center gap-3">
          {isCoco && (
            <button
              type="button"
              onClick={restoreCocoBackup}
              className="text-sm font-bold text-secondary hover:text-primary"
            >
              Restore backup media
            </button>
          )}
          {mode === 'edit' && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="text-sm font-bold text-on-surface-variant hover:text-primary"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold mb-1">Project Name</label>
        <Input
          name="projectName"
          required
          placeholder="e.g., PVS Coco Phase 2"
          value={form.projectName}
          onChange={(e) => setForm((f) => ({ ...f, projectName: e.target.value }))}
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-1">Banner Title</label>
        <Input
          name="bannerTitle"
          placeholder="Headline on inner banner (e.g. Gated Community Farmland Project)"
          value={form.bannerTitle}
          onChange={(e) => setForm((f) => ({ ...f, bannerTitle: e.target.value }))}
        />
        <p className="text-xs text-on-surface-variant mt-1">
          Shown on the project page hero strip. Defaults to project name if empty.
        </p>
      </div>
      <div>
        <label className="block text-sm font-bold mb-1">Location</label>
        <Input
          name="location"
          required
          placeholder="e.g., Hosur, Near Bangalore"
          value={form.location}
          onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-1">Price (per sq ft)</label>
        <Input
          name="price"
          placeholder="e.g., ₹1200 / sq ft"
          value={form.price}
          onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-1">Plot Size</label>
        <Input
          name="plotSize"
          placeholder="e.g., 1200 - 2400 sq ft"
          value={form.plotSize}
          onChange={(e) => setForm((f) => ({ ...f, plotSize: e.target.value }))}
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-1">Total Area</label>
        <Input
          name="totalArea"
          placeholder="e.g., 5 Acres"
          value={form.totalArea}
          onChange={(e) => setForm((f) => ({ ...f, totalArea: e.target.value }))}
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-1">Status</label>
        <Select
          name="status"
          required
          value={form.status}
          onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
        >
          <option value="Available">Available</option>
          <option value="Coming Soon">Coming Soon</option>
          <option value="Sold Out">Sold Out</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
        </Select>
      </div>
      <div>
        <label className="block text-sm font-bold mb-1">Category</label>
        <Select
          name="category"
          required
          value={form.category}
          onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
        >
          <option>Residential</option>
          <option>Commercial</option>
          <option>Farmland</option>
        </Select>
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-bold mb-1">Description</label>
        <Textarea
          name="description"
          rows={3}
          placeholder="Project description..."
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
        />
      </div>

      <ProjectMediaEditor
        projectSlug={projectSlug}
        gallery={gallery}
        onGalleryChange={setGallery}
        youtubeVideos={youtubeVideos}
        onYoutubeVideosChange={setYoutubeVideos}
        videoFiles={videoFiles}
        onVideoFilesChange={setVideoFiles}
        leadVideoId={leadVideo?.id}
        onLeadVideoChange={(id) =>
          setLeadVideo(id ? { id, poster: cover } : null)
        }
        videoGridCount={videoGrid.length}
        isCoco={isCoco}
        getAuthHeaders={getAuthHeaders}
        onNotify={onNotify}
      />

      <button
        type="submit"
        disabled={saving}
        className="md:col-span-2 bg-primary text-on-primary py-3 rounded-full font-bold hover:opacity-90 disabled:opacity-50"
      >
        {saving ? 'Saving…' : mode === 'edit' ? 'Save Changes' : 'Add Project'}
      </button>
    </form>
  );
}
