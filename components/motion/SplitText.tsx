'use client';

import { motion } from 'framer-motion';
import { EASE } from './ease';

/** 단어 단위 마스크 리빌. 스크린리더에는 원문 그대로 읽힌다. */
export default function SplitText({
  text,
  as = 'h2',
  className,
  delay = 0,
  onView = true,
}: {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  delay?: number;
  onView?: boolean;
}) {
  const Tag = motion[as] as typeof motion.h2;
  const words = text.split(' ');
  const trigger = onView
    ? { whileInView: 'in', viewport: { once: true, amount: 0.6 } }
    : { animate: 'in' };
  return (
    <Tag
      className={`split ${className ?? ''}`}
      aria-label={text}
      initial="out"
      {...trigger}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span className="split-mask" aria-hidden key={i}>
          <motion.span
            className="split-word"
            variants={{ out: { y: '110%', rotate: 4 }, in: { y: 0, rotate: 0 } }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}
