'use client';

import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';
import { EASE } from './ease';

/**
 * 단어 단위 마스크 리빌. 스크린리더에는 숨긴 원문(sr-only)이 읽히고, 애니메이션 조각은 aria-hidden.
 * - onView(기본): 스크롤로 들어올 때 framer-motion으로 재생
 * - onView={false}: 첫 화면용. CSS 애니메이션이라 JS 하이드레이션을 기다리지 않고 바로 시작한다(LCP 보호)
 */
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
  const words = text.split(' ');
  const gap = (i: number) => (i < words.length - 1 ? '\u00A0' : '');

  if (!onView) {
    const Tag = as;
    return (
      <Tag className={`split ${className ?? ''}`}>
        <span className="sr-only">{text}</span>
        {words.map((w, i) => (
          <span className="split-mask" aria-hidden key={i}>
            <span className="split-word split-css" style={{ '--d': `${delay + i * 0.06}s` } as CSSProperties}>
              {w}
            </span>
            {gap(i)}
          </span>
        ))}
      </Tag>
    );
  }

  const MotionTag = motion[as] as typeof motion.h2;
  return (
    <MotionTag
      className={`split ${className ?? ''}`}
      initial="out"
      whileInView="in"
      viewport={{ once: true, amount: 0.6 }}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
    >
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span className="split-mask" aria-hidden key={i}>
          <motion.span
            className="split-word"
            variants={{ out: { y: '110%', rotate: 4 }, in: { y: 0, rotate: 0 } }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            {w}
          </motion.span>
          {gap(i)}
        </span>
      ))}
    </MotionTag>
  );
}
