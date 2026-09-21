'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';

export default function BackToTop({ label }: { label: string }) {
  const { scrollY, scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, 'change', (v) => setShow(v > 900));

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          className="totop"
          aria-label={label}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          whileHover={{ y: -3 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <svg viewBox="0 0 48 48" aria-hidden>
            <motion.circle cx="24" cy="24" r="22" style={{ pathLength: scrollYProgress }} />
            <path d="M24 31V17M18 23l6-6 6 6" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
