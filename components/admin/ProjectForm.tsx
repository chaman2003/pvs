'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { ProjectMediaEditor } from '@/components/admin/ProjectMediaEditor';
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
  details?: { area?: string; totalArea?: string };
  seo?: { title?: string; description?: string };
}

type NotifyFn = (text: string, type?: 'success' | 'error') => void;

const emptyForm = {
  projectName: '',
  location: '',
  price: '',
  plotSize: '',
  totalArea: '',
  status: 'Available',
  category: 'Residential',
  description: '',
  seoTitle: '',
  seoDescription: '',
};

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
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && initial) {
      setForm({
        projectName: initial.title || '',
        location: initial.location || '',
        price: initial.price || '',
        plotSize: initial.details?.area || '',
        totalArea: initial.details?.totalArea || '',
        status: initial.status || 'Available',
        category: initial.category || 'Residential',
        description: initial.description || '',
        seoTitle: initial.seo?.title || '',
        seoDescription: initial.seo?.description || '',
      });
      const imgs =
        initial.gallery?.length ? initial.gallery : initial.image ? [initial.image] : [];
      setGallery(imgs);
      const yt = initial.videos?.length
        ? initial.videos
        : initial.youtubeId
          ? [initial.youtubeId]
          : [];
      setYoutubeVideos(yt);
      setVideoFiles(initial.videoFiles || []);
    } else {
      setForm(emptyForm);
      setGallery([]);
      setYoutubeVideos([]);
      setVideoFiles([]);
    }
  }, [mode, initial]);

  const projectSlug = slugify(form.projectName || initial?.id || 'new-project');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.projectName.trim()) {
      onNotify('Project name is required', 'error');
      return;
    }

    setSaving(true);
    const payload = {
      ...form,
      gallery,
      videos: youtubeVideos,
      videoFiles,
      youtubeId: youtubeVideos[0] || '',
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
      <div className="md:col-span-2 flex items-center justify-between gap-4">
        <h2 className="font-headline font-bold text-primary text-xl">
          {mode === 'edit' ? `Edit: ${initial?.title}` : 'Add New Project'}
        </h2>
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
          required
          placeholder="e.g., ₹1200 / sq ft"
          value={form.price}
          onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-1">Plot Size</label>
        <Input
          name="plotSize"
          required
          placeholder="e.g., 1200 - 2400 sq ft"
          value={form.plotSize}
          onChange={(e) => setForm((f) => ({ ...f, plotSize: e.target.value }))}
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-1">Total Area</label>
        <Input
          name="totalArea"
          required
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
          required
          rows={3}
          placeholder="Project description..."
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
        />
      </div>

      <div className="md:col-span-2 border-t border-outline-variant/20 pt-4 mt-2">
        <h3 className="font-headline font-bold text-primary mb-3">SEO Settings</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-bold mb-1">SEO Title</label>
            <Input
              name="seoTitle"
              placeholder="Page title for search engines (≤60 chars)"
              value={form.seoTitle}
              onChange={(e) => setForm((f) => ({ ...f, seoTitle: e.target.value }))}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-bold mb-1">SEO Description</label>
            <Textarea
              name="seoDescription"
              rows={2}
              placeholder="Meta description for search results (≤160 chars)"
              value={form.seoDescription}
              onChange={(e) => setForm((f) => ({ ...f, seoDescription: e.target.value }))}
            />
          </div>
        </div>
      </div>

      <ProjectMediaEditor
        projectSlug={projectSlug}
        gallery={gallery}
        onGalleryChange={setGallery}
        youtubeVideos={youtubeVideos}
        onYoutubeVideosChange={setYoutubeVideos}
        videoFiles={videoFiles}
        onVideoFilesChange={setVideoFiles}
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
