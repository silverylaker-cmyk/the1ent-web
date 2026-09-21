'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { SearchEntry } from '@/lib/content';
import { EASE } from '../motion/ease';
import { IconSearch } from '../icons';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CommandPalette({ index, t }: { index: SearchEntry[]; t: any }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const results = useMemo(() => {
    const terms = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return index;
    return index
      .map((e) => {
        const title = e.title.toLowerCase();
        const hay = `${title} ${e.desc} ${e.keywords}`.toLowerCase();
        if (!terms.every((w) => hay.includes(w))) return null;
        return { e, score: terms.reduce((n, w) => n + (title.includes(w) ? 2 : 1), 0) };
      })
      .filter((x): x is { e: SearchEntry; score: number } => !!x)
      .sort((a, b) => b.score - a.score)
      .map((x) => x.e);
  }, [q, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === '/' && !/input|textarea|select/i.test((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQ('');
      setSel(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      triggerRef.current?.blur();
    }
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSel((s) => Math.min(results.length - 1, s + 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSel((s) => Math.max(0, s - 1));
    }
    if (e.key === 'Enter' && results[sel]) go(results[sel].href);
  };

  return (
    <>
      <button type="button" className="palette-trigger" ref={triggerRef} onClick={() => setOpen(true)} aria-label={t.open}>
        <IconSearch />
        <span>{t.open}</span>
        <kbd>⌘K</kbd>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="palette-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="palette"
              role="dialog"
              aria-modal="true"
              aria-label={t.open}
              initial={{ opacity: 0, y: -24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={onKeyDown}
            >
              <div className="palette-input">
                <IconSearch />
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value);
                    setSel(0);
                  }}
                  placeholder={t.placeholder}
                  aria-label={t.placeholder}
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="palette-list"
                  aria-activedescendant={results[sel] ? `pal-${sel}` : undefined}
                />
              </div>
              <ul id="palette-list" role="listbox">
                {results.map((r, i) => (
                  <li
                    key={r.href}
                    id={`pal-${i}`}
                    role="option"
                    aria-selected={i === sel}
                    onPointerMove={() => setSel(i)}
                    onClick={() => go(r.href)}
                  >
                    {i === sel && <motion.span className="palette-sel" layoutId="pal-sel" transition={{ duration: 0.2 }} />}
                    <b>{r.title}</b>
                    <span>{r.desc}</span>
                  </li>
                ))}
                {results.length === 0 && <li className="palette-empty">{t.empty}</li>}
              </ul>
              <div className="palette-hint">{t.hint}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
