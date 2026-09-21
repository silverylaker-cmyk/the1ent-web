'use client';

import { motion } from 'framer-motion';
import type { ReactNode, CSSProperties } from 'react';
import { EASE } from './motion/ease';

const TAGS = {
  div: motion.div,
  p: motion.p,
  h2: motion.h2,
  h3: motion.h3,
  li: motion.li,
  section: motion.section,
} as const;

export default function Reveal({
  children,
  as = 'div',
  index = 0,
  className,
  staggerMs = 80,
  style,
}: {
  children: ReactNode;
  as?: keyof typeof TAGS;
  index?: number;
  className?: string;
  staggerMs?: number;
  style?: CSSProperties;
}) {
  const MotionTag = TAGS[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.8, ease: EASE, delay: (index * staggerMs) / 1000 }}
    >
      {children}
    </MotionTag>
  );
}
