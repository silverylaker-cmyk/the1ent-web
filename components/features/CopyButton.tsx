'use client';

import { useState } from 'react';

export default function CopyButton({
  text,
  label,
  doneLabel,
  className = 'chip',
}: {
  text: string;
  label: string;
  doneLabel: string;
  className?: string;
}) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1800);
    } catch {
      /* 클립보드 권한이 없으면 조용히 무시 */
    }
  };
  return (
    <button type="button" className={className} onClick={copy} data-done={done || undefined}>
      <span aria-live="polite">{done ? doneLabel : label}</span>
    </button>
  );
}
