const YOUTUBE_ID_RE = /^[a-zA-Z0-9_-]{11}$/;

export function isYoutubeId(value: string): boolean {
  return YOUTUBE_ID_RE.test(value.trim());
}

/** Extract a YouTube video ID from a URL or bare ID string. */
export function parseYoutubeInput(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  if (isYoutubeId(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed);
    const host = url.hostname.replace(/^www\./, '');

    if (host === 'youtu.be') {
      const id = url.pathname.slice(1).split('/')[0];
      return isYoutubeId(id) ? id : null;
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const v = url.searchParams.get('v');
      if (v && isYoutubeId(v)) return v;

      const embedMatch = url.pathname.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
      if (embedMatch?.[1]) return embedMatch[1];

      const shortsMatch = url.pathname.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
      if (shortsMatch?.[1]) return shortsMatch[1];
    }
  } catch {
    return null;
  }

  return null;
}

/** Parse comma- or newline-separated YouTube URLs/IDs into unique IDs. */
export function parseYoutubeList(raw: string): string[] {
  const ids = raw
    .split(/[\n,]+/)
    .map(parseYoutubeInput)
    .filter((id): id is string => Boolean(id));
  return [...new Set(ids)];
}

/** Standard YouTube poster URL (hqdefault is reliably available). */
export function youtubeThumbnailUrl(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export function isUploadedVideoSrc(src: string): boolean {
  return (
    src.startsWith('/uploads/') ||
    /\.(mp4|webm|mov|m4v)(\?|$)/i.test(src)
  );
}
