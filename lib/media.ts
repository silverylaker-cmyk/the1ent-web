import fs from 'node:fs';
import path from 'node:path';

/**
 * Optional media slots. Drop a file into `public/media/<name>.<ext>` and the
 * matching <MediaSlot name="..."> renders it instead of its illustration
 * fallback. Resolved at build time (static export).
 */
const MEDIA_DIR = path.join(process.cwd(), 'public', 'media');
const IMAGE_EXT = ['jpg', 'jpeg', 'png', 'webp', 'avif'];
const VIDEO_EXT = ['mp4', 'webm'];

export type MediaFile =
  | { kind: 'image'; src: string }
  | { kind: 'video'; src: string; poster?: string };

export function getMedia(name: string): MediaFile | null {
  if (!fs.existsSync(MEDIA_DIR)) return null;
  for (const ext of VIDEO_EXT) {
    if (fs.existsSync(path.join(MEDIA_DIR, `${name}.${ext}`))) {
      const poster = IMAGE_EXT.map((e) => `${name}-poster.${e}`).find((f) =>
        fs.existsSync(path.join(MEDIA_DIR, f)),
      );
      return { kind: 'video', src: `/media/${name}.${ext}`, poster: poster && `/media/${poster}` };
    }
  }
  for (const ext of IMAGE_EXT) {
    if (fs.existsSync(path.join(MEDIA_DIR, `${name}.${ext}`))) {
      return { kind: 'image', src: `/media/${name}.${ext}` };
    }
  }
  return null;
}
