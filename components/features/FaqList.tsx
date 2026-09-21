'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import type { FaqItem } from '@/lib/content';
import { EASE } from '../motion/ease';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function FaqList({ items, t }: { items: FaqItem[]; t: any }) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const cats = useMemo(() => [...new Set(items.map((i) => i.category))], [items]);
  const rows = items.filter(
    (i) => (!cat || i.category === cat) && (!q || `${i.q}${i.a}`.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <div>
      <div className="filter">
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.search} aria-label={t.search} />
        <div className="seg" role="radiogroup" aria-label="분류">
          {[null, ...cats].map((c) => (
            <button type="button" role="radio" aria-checked={cat === c} key={c ?? 'all'} onClick={() => setCat(c)}>
              {cat === c && <motion.i layoutId="seg-faq" transition={{ duration: 0.35, ease: EASE }} />}
              <span>{c ?? t.all}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="faq">
        <AnimatePresence initial={false}>
          {rows.map((item) => {
            const isOpen = open === item.q;
            return (
              <motion.div layout="position" className="faq-item" key={item.q} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : item.q)}>
                  <small>{item.category}</small>
                  <span>{item.q}</span>
                  <motion.i aria-hidden animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3, ease: EASE }} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="faq-body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <p>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
        {rows.length === 0 && <p className="lead empty">{t.empty}</p>}
      </div>
    </div>
  );
}
