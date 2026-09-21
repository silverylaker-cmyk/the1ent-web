'use client';

import { animate, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useLayoutEffect, useRef } from 'react';

export default function CountUp({ value, duration = 1.6 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduce = useReducedMotion();

  // 첫 페인트 전에 0으로 맞춰 '최종값 → 0 → 최종값' 깜빡임을 없앤다 (JS가 없으면 최종값 그대로)
  useLayoutEffect(() => {
    if (!reduce && ref.current) ref.current.textContent = '0';
  }, [reduce]);

  useEffect(() => {
    if (!inView || !ref.current || reduce) return;
    const node = ref.current;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => (node.textContent = String(Math.round(v))),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduce]);

  // SSR·JS 미동작 시에도 실제 값이 보이도록 초기 텍스트는 최종값
  return <span ref={ref}>{value}</span>;
}
