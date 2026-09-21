'use client';

import { MotionConfig, motion, useScroll, useSpring, useMotionValue } from 'framer-motion';
import { useEffect, type ReactNode } from 'react';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });
  return <motion.div className="scroll-progress" aria-hidden style={{ scaleX }} />;
}

/** 데스크톱 포인터를 따라다니는 부드러운 파스텔 글로우 */
function CursorGlow() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 60, damping: 18 });
  const sy = useSpring(y, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX - 180);
      y.set(e.clientY - 180);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [x, y]);

  return <motion.div className="cursor-glow" aria-hidden style={{ x: sx, y: sy }} />;
}

export default function MotionRoot({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <CursorGlow />
      {children}
    </MotionConfig>
  );
}
