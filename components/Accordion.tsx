'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { sectionId } from '@/lib/markdown';

// 마크다운은 서버에서 렌더해 content로 넘긴다 (react-markdown을 클라이언트 번들에서 제외)
export type AccordionSection = { heading: string; content: ReactNode };
import { EASE } from './motion/ease';

export default function Accordion({ sections }: { sections: AccordionSection[] }) {
  const [open, setOpen] = useState<Set<number>>(new Set([0]));
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className="accordion">
      {sections.map((s, i) => {
        const isOpen = open.has(i);
        return (
          <div className="accordion-item" id={sectionId(i)} key={s.heading} data-open={isOpen}>
            <h2>
              <button type="button" aria-expanded={isOpen} aria-controls={`${sectionId(i)}-body`} onClick={() => toggle(i)}>
                <span className="acc-no" aria-hidden>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {s.heading}
                <motion.i aria-hidden animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3, ease: EASE }} />
              </button>
            </h2>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${sectionId(i)}-body`}
                  className="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  {s.content}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
