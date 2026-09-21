import type { ReactNode } from 'react';
import { getMedia } from '@/lib/media';

/**
 * Server component. Renders `public/media/<name>.*` when present (image or
 * muted looping video), otherwise the illustration passed as children.
 */
export default function MediaSlot({
  name,
  alt,
  children,
  className = '',
  ratio = '4 / 3',
}: {
  name: string;
  alt: string;
  children: ReactNode;
  className?: string;
  ratio?: string;
}) {
  const media = getMedia(name);
  return (
    <div className={`media ${media ? 'has-file' : 'fallback'} ${className}`.trim()} style={{ aspectRatio: ratio }}>
      {media?.kind === 'video' ? (
        <video src={media.src} poster={media.poster} autoPlay muted loop playsInline aria-label={alt} />
      ) : media?.kind === 'image' ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={media.src} alt={alt} loading="lazy" />
      ) : (
        children
      )}
    </div>
  );
}
