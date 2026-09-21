'use client';

import { motion } from 'framer-motion';
import type { ReactNode, ElementType, CSSProperties } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Reveal({
  children,
  as = 'div',
  index = 0,
  className,
  staggerMs = 80,
  style,
}: {
  children: ReactNode;
  as?: ElementType;
  index?: number;
  className?: string;
  staggerMs?: number;
  style?: CSSProperties;
}) {
  const MotionTag = motion(as as 'div');
  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, ease: EASE, delay: (index * staggerMs) / 1000 }}
    >
      {children}
    </MotionTag>
  );
}
