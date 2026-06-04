'use client';

import { useRef, useState } from 'react';
import { ArrowDown, ArrowUp, ImagePlus, Play, Trash2, Video } from 'lucide-react';
import { parseYoutubeInput } from '@/lib/youtube';

type NotifyFn = (text: string, type?: 'success' | 'error') => void;

function moveItem<T>(list: T[], from: number, to: number): T[] {
  if (to < 0 || to >= list.length) return list;
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

async function uploadProjectFile(
  file: File,
  projectSlug: string,
  type: 'image' | 'video',
  getAuthHeaders: () => HeadersInit
): Promise<string> {
  const fd = new FormData();
  fd.append('file', file);
  fd.append('projectId', projectSlug);
  fd.append('type', type);

  const headers = getAuthHeaders();
  const authOnly: HeadersInit = {};
  if (headers instanceof Headers) {
    headers.forEach((v, k) => {
      if (k.toLowerCase() === 'authorization') authOnly[k] = v;
    });
  } else if (Array.isArray(headers)) {
    headers.forEach(([k, v]) => {
      if (k.toLowerCase() === 'authorization') (authOnly as Record<string, string>)[k] = v;
    });
  } else {
    Object.entries(headers).forEach(([k, v]) => {
      if (k.toLowerCase() === 'authorization') (authOnly as Record<string, string>)[k] = v;
    });
  }

  const res = await fetch('/api/projects/upload', {
    method: 'POST',
    credentials: 'include',
    headers: authOnly,
    body: fd,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Upload failed');
  return json.url as string;
}

export function ProjectMediaEditor({
  projectSlug,
  gallery,
  onGalleryChange,
  youtubeVideos,
  onYoutubeVideosChange,
  videoFiles,
  onVideoFilesChange,
  leadVideoId,
  onLeadVideoChange,
  videoGridCount = 0,
  isCoco = false,
  getAuthHeaders,
  onNotify,
}: {
  projectSlug: string;
  gallery: string[];
  onGalleryChange: (urls: string[]) => void;
  youtubeVideos: string[];
  onYoutubeVideosChange: (ids: string[]) => void;
  videoFiles: string[];
  onVideoFilesChange: (urls: string[]) => void;
  leadVideoId?: string;
  onLeadVideoChange?: (id: string | null) => void;
  videoGridCount?: number;
  isCoco?: boolean;
  getAuthHeaders: () => HeadersInit;
  onNotify: NotifyFn;
}) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const [youtubeDraft, setYoutubeDraft] = useState('');
  const [uploading, setUploading] = useState<'image' | 'video' | null>(null);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    if (!projectSlug.trim()) {
      onNotify('Enter a project name first so uploads can be organized', 'error');
      return;
    }

    setUploading('image');
    try {
      const urls: string[] = [];
      for (const file of files) {
        urls.push(await uploadProjectFile(file, projectSlug, 'image', getAuthHeaders));
      }
      onGalleryChange([...gallery, ...urls]);
      onNotify(`${urls.length} image${urls.length > 1 ? 's' : ''} uploaded`);
    } catch (err) {
      onNotify(err instanceof Error ? err.message : 'Image upload failed', 'error');
    } finally {
      setUploading(null);
      e.target.value = '';
    }
  }

  async function handleVideoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    if (!projectSlug.trim()) {
      onNotify('Enter a project name first so uploads can be organized', 'error');
      return;
    }

    setUploading('video');
    try {
      const urls: string[] = [];
      for (const file of files) {
        urls.push(await uploadProjectFile(file, projectSlug, 'video', getAuthHeaders));
      }
      onVideoFilesChange([...videoFiles, ...urls]);
      onNotify(`${urls.length} video${urls.length > 1 ? 's' : ''} uploaded`);
    } catch (err) {
      onNotify(err instanceof Error ? err.message : 'Video upload failed', 'error');
    } finally {
      setUploading(null);
      e.target.value = '';
    }
  }

  function addYoutube() {
    const id = parseYoutubeInput(youtubeDraft);
    if (!id) {
      onNotify('Enter a valid YouTube URL or video ID', 'error');
      return;
    }
    if (youtubeVideos.includes(id)) {
      onNotify('This video is already added', 'error');
      return;
    }
    onYoutubeVideosChange([...youtubeVideos, id]);
    setYoutubeDraft('');
  }

  return (
    <div className="md:col-span-2 space-y-8 border-t border-outline-variant/20 pt-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-headline font-bold text-primary flex items-center gap-2">
              <ImagePlus className="h-5 w-5" />
              Project Images
            </h3>
            <p className="text-xs text-on-surface-variant mt-1">
              Upload multiple images (JPEG, PNG, WebP, GIF — max 16MB each). The first image is the
              cover. Reorder with arrows.
            </p>
          </div>
          <button
            type="button"
            onClick={() => imageInputRef.current?.click()}
            disabled={uploading === 'image'}
            className="text-sm font-bold bg-primary-container text-on-primary px-4 py-2 rounded-full hover:opacity-90 disabled:opacity-50"
          >
            {uploading === 'image' ? 'Uploading…' : 'Add Images'}
          </button>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>

        {gallery.length === 0 ? (
          <p className="text-sm text-on-surface-variant border border-dashed border-outline-variant/40 rounded-xl p-6 text-center">
            No images yet. Add photos for the project gallery.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gallery.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="relative rounded-xl overflow-hidden border border-outline-variant/30 bg-surface-container-low"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-36 object-cover" />
                {i === 0 && (
                  <span className="absolute top-2 left-2 bg-secondary-container text-primary text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
                    Cover
                  </span>
                )}
                <div className="flex items-center justify-between p-2 bg-surface-container-lowest">
                  <span className="text-xs text-on-surface-variant">#{i + 1}</span>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      title="Move up"
                      onClick={() => onGalleryChange(moveItem(gallery, i, i - 1))}
                      disabled={i === 0}
                      className="p-1 rounded hover:bg-surface-container disabled:opacity-30"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      title="Move down"
                      onClick={() => onGalleryChange(moveItem(gallery, i, i + 1))}
                      disabled={i === gallery.length - 1}
                      className="p-1 rounded hover:bg-surface-container disabled:opacity-30"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      title="Remove"
                      onClick={() => onGalleryChange(gallery.filter((_, idx) => idx !== i))}
                      className="p-1 rounded text-error hover:bg-error-container/30"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="font-headline font-bold text-primary flex items-center gap-2 mb-3">
          <Play className="h-5 w-5" />
          YouTube Videos
        </h3>
        <p className="text-xs text-on-surface-variant mb-3">
          Paste a YouTube link or 11-character video ID. The lead video appears above the gallery on
          the project page.
          {isCoco && videoGridCount > 0 && (
            <>
              {' '}
              Poster wall: {videoGridCount} slot{videoGridCount === 1 ? '' : 's'} (use Restore
              backup media for exact coco layout).
            </>
          )}
        </p>
        {youtubeVideos.length > 0 && onLeadVideoChange && (
          <div className="mb-4">
            <label className="block text-xs font-bold text-primary mb-1">Lead video</label>
            <select
              value={leadVideoId || youtubeVideos[0]}
              onChange={(e) => onLeadVideoChange(e.target.value || null)}
              className="w-full rounded-lg border border-outline-variant/40 px-3 py-2 text-sm"
            >
              {youtubeVideos.map((id) => (
                <option key={id} value={id}>
                  {id}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            value={youtubeDraft}
            onChange={(e) => setYoutubeDraft(e.target.value)}
            placeholder="https://youtube.com/watch?v=… or video ID"
            className="flex-1 rounded-lg border border-outline-variant/40 px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={addYoutube}
            className="text-sm font-bold bg-primary text-on-primary px-4 py-2 rounded-lg hover:opacity-90"
          >
            Add Video
          </button>
        </div>
        {youtubeVideos.length > 0 && (
          <ul className="space-y-2">
            {youtubeVideos.map((id, i) => (
              <li
                key={id}
                className="flex items-center justify-between gap-3 p-3 rounded-lg bg-surface-container-low border border-outline-variant/20"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-primary truncate">{id}</p>
                  <a
                    href={`https://youtube.com/watch?v=${id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-on-surface-variant hover:underline"
                  >
                    Preview on YouTube
                  </a>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => onYoutubeVideosChange(moveItem(youtubeVideos, i, i - 1))}
                    disabled={i === 0}
                    className="p-1 rounded hover:bg-surface-container disabled:opacity-30"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onYoutubeVideosChange(moveItem(youtubeVideos, i, i + 1))}
                    disabled={i === youtubeVideos.length - 1}
                    className="p-1 rounded hover:bg-surface-container disabled:opacity-30"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onYoutubeVideosChange(youtubeVideos.filter((_, idx) => idx !== i))}
                    className="p-1 rounded text-error hover:bg-error-container/30"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-headline font-bold text-primary flex items-center gap-2">
              <Video className="h-5 w-5" />
              Uploaded Videos
            </h3>
            <p className="text-xs text-on-surface-variant mt-1">MP4, WebM, or MOV files.</p>
          </div>
          <button
            type="button"
            onClick={() => videoInputRef.current?.click()}
            disabled={uploading === 'video'}
            className="text-sm font-bold bg-primary-container text-on-primary px-4 py-2 rounded-full hover:opacity-90 disabled:opacity-50"
          >
            {uploading === 'video' ? 'Uploading…' : 'Upload Video'}
          </button>
          <input
            ref={videoInputRef}
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
            multiple
            className="hidden"
            onChange={handleVideoUpload}
          />
        </div>
        {videoFiles.length === 0 ? (
          <p className="text-sm text-on-surface-variant border border-dashed border-outline-variant/40 rounded-xl p-6 text-center">
            No uploaded videos. Add MP4/WebM files to show on the project page.
          </p>
        ) : (
          <ul className="space-y-3">
            {videoFiles.map((src, i) => (
              <li
                key={`${src}-${i}`}
                className="rounded-xl border border-outline-variant/20 overflow-hidden bg-surface-container-low"
              >
                <video src={src} controls className="w-full max-h-48 bg-black" preload="metadata" />
                <div className="flex items-center justify-between p-2 bg-surface-container-lowest">
                  <span className="text-xs text-on-surface-variant truncate">{src.split('/').pop()}</span>
                  <div className="flex gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => onVideoFilesChange(moveItem(videoFiles, i, i - 1))}
                      disabled={i === 0}
                      className="p-1 rounded hover:bg-surface-container disabled:opacity-30"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onVideoFilesChange(moveItem(videoFiles, i, i + 1))}
                      disabled={i === videoFiles.length - 1}
                      className="p-1 rounded hover:bg-surface-container disabled:opacity-30"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onVideoFilesChange(videoFiles.filter((_, idx) => idx !== i))}
                      className="p-1 rounded text-error hover:bg-error-container/30"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
