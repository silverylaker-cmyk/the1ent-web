'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

/** 배경 이미지가 스크롤에 따라 천천히 흐르는 풀블리드 밴드 */
export default function ParallaxBand({ image, video, children }: { image: string; video?: string | null; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-14%', '14%']);
  return (
    <div className="band" ref={ref}>
      <motion.div className="band-bg" aria-hidden style={{ y }}>
        {video ? (
          <video src={video} poster={image} autoPlay muted loop playsInline preload="none" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="" loading="lazy" />
        )}
      </motion.div>
      <div className="band-inner">{children}</div>
    </div>
  );
}
