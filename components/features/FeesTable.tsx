'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import type { FeeItem } from '@/lib/content';
import { EASE } from '../motion/ease';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function FeesTable({ items, t }: { items: FeeItem[]; t: any }) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<string | null>(null);
  const cats = useMemo(() => [...new Set(items.map((i) => i.category))], [items]);
  const rows = items.filter(
    (i) => (!cat || i.category === cat) && (!q || `${i.name}${i.note}${i.category}`.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <div>
      <div className="filter">
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.search} aria-label={t.search} />
        <div className="seg" role="radiogroup" aria-label="분류">
          {[null, ...cats].map((c) => (
            <button type="button" role="radio" aria-checked={cat === c} key={c ?? 'all'} onClick={() => setCat(c)}>
              {cat === c && <motion.i layoutId="seg-fee" transition={{ duration: 0.35, ease: EASE }} />}
              <span>{c ?? t.all}</span>
            </button>
          ))}
        </div>
        <span className="filter-count" aria-live="polite">
          {rows.length}
          {t.count}
        </span>
      </div>
      <div className="table-scroll">
        <table className="fees-table">
          <thead>
            <tr>
              <th>분류</th>
              <th>항목</th>
              <th>비용</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {rows.map((item) => (
                <motion.tr
                  layout
                  key={item.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <td>{item.category}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.note}</td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      {rows.length === 0 && <p className="lead empty">{t.empty}</p>}
    </div>
  );
}
