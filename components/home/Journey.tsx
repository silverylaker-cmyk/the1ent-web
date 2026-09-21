'use client';

import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';

type Step = { title: string; body: string };

function JourneyStep({ step, i, total, progress }: { step: Step; i: number; total: number; progress: MotionValue<number> }) {
  const start = i / total;
  const active = useTransform(progress, [start - 0.08, start + 0.04], [0, 1]);
  // 글자는 항상 또렷하게 둔다(대비 기준). 비활성 상태는 점·번호 색·가로 이동으로만 표현한다.
  const x = useTransform(active, [0, 1], [22, 0]);
  const dotScale = useTransform(active, [0, 1], [0.45, 1]);
  const numColor = useTransform(active, [0, 1], ['#5c5a57', '#245a75']);
  const barScale = useTransform(active, [0, 1], [0, 1]);
  return (
    <motion.li style={{ x }}>
      <motion.i aria-hidden style={{ scale: dotScale, opacity: active }} />
      <motion.span className="num" style={{ color: numColor }}>
        {String(i + 1).padStart(2, '0')}
        <motion.b aria-hidden style={{ scaleX: barScale }} />
      </motion.span>
      <h3>{step.title}</h3>
      <p>{step.body}</p>
    </motion.li>
  );
}

/** 스크롤에 연동되어 선이 채워지고 단계가 하나씩 켜지는 방문 흐름 */
export default function Journey({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });
  return (
    <ol className="journey" ref={ref}>
      <motion.div className="journey-line" aria-hidden style={{ scaleY: progress }} />
      {steps.map((s, i) => (
        <JourneyStep key={s.title} step={s} i={i} total={steps.length} progress={progress} />
      ))}
    </ol>
  );
}
