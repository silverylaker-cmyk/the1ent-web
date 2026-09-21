'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Wraps an inline SVG illustration. Adds `.in` once the element scrolls into
 * view (threshold .18, once) so `.ill path` stroke drawing and `.ill .fill`
 * scale-in can run. With prefers-reduced-motion everything is shown at once.
 */
export default function Illustration({
  children,
  className = '',
  eager = false,
  loop = false,
}: {
  children: ReactNode;
  className?: string;
  /** Start immediately (hero) instead of waiting for viewport entry. */
  eager?: boolean;
  /** Keep the idle loop animation running after the draw finishes. */
  loop?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (eager || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('in');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add('in');
          io.disconnect();
        }
      },
      { threshold: 0.18 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [eager]);

  return (
    <div ref={ref} className={`ill ${loop ? 'loop' : ''} ${className}`.trim()}>
      {children}
    </div>
  );
}
