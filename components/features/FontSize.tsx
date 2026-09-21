'use client';

import { useEffect, useState } from 'react';

const SCALES = [1, 1.125, 1.25];
const KEY = 'the1-font';

/** 글자 크기 3단계 — 어르신 환자를 위한 접근성 옵션. 이 기기에만 저장된다. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function FontSize({ t }: { t: any }) {
  const [level, setLevel] = useState(0);
  const names = [t.normal, t.large, t.xlarge];

  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem(KEY));
      if (saved > 0 && saved < SCALES.length) setLevel(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--fs', String(SCALES[level]));
    try {
      localStorage.setItem(KEY, String(level));
    } catch {}
  }, [level]);

  return (
    <button
      type="button"
      className="fontsize"
      onClick={() => setLevel((l) => (l + 1) % SCALES.length)}
      aria-label={`${t.label}: ${names[level]}`}
      title={`${t.label}: ${names[level]}`}
    >
      <span aria-hidden data-level={level}>
        가
      </span>
      <em>
        {t.label} · {names[level]}
      </em>
    </button>
  );
}
