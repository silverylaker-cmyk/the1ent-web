'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/** 서브페이지 sticky 목차 + 읽기 진행 표시 */
export default function Toc({ title, items }: { title: string; items: { id: string; label: string }[] }) {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });

  const jump = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.querySelector<HTMLButtonElement>('button[aria-expanded="false"]')?.click();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="toc" aria-label={title}>
      <div className="toc-rail" aria-hidden>
        <motion.span style={{ scaleY }} />
      </div>
      <b>{title}</b>
      <ol>
        {items.map((it) => (
          <li key={it.id}>
            <a href={`#${it.id}`} onClick={jump(it.id)}>
              {it.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
