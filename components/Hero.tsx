'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { EASE } from './motion/ease';
import SplitText from './motion/SplitText';
import Magnetic from './motion/Magnetic';
import OpenStatus from './features/OpenStatus';
import type { Schedule } from '@/lib/content';

type HeroContent = {
  eyebrow: string;
  headline: [string, string];
  lead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  scrollCue: string;
};

const draw = (delay: number, duration = 0.9) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { pathLength: { duration, delay, ease: EASE }, opacity: { duration: 0.01, delay } },
});
const pop = (delay: number) => ({
  initial: { opacity: 0, scale: 0.6 },
  animate: { opacity: 0.75, scale: 1 },
  transition: { duration: 0.8, delay, ease: EASE },
});
const fade = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay },
});

export default function Hero({
  content,
  kakaoUrl,
  media,
  schedule,
  statusLabels,
}: {
  content: HeroContent;
  kakaoUrl: string;
  media: { poster: string; video: string | null; videoMobile?: string | null };
  schedule: Schedule;
  statusLabels: Record<string, string>;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  // 타깃 측정 없이 창 스크롤(px)만 사용 — 측정 타이밍에 따라 본문이 투명해지는 일을 막는다
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 900], [0, 180]);
  const bgScale = useTransform(scrollY, [0, 900], [1.05, 1.22]);
  const textY = useTransform(scrollY, [0, 900], [0, -140]);
  const symY = useTransform(scrollY, [0, 900], [0, -260]);
  const fadeOut = useTransform(scrollY, [0, 640], [1, 0]);

  return (
    <section className="hero" ref={ref}>
      <motion.div className="hero-bg" aria-hidden style={reduce ? undefined : { y: bgY, scale: bgScale }}>
        {media.video && !reduce ? (
          <video poster={media.poster} autoPlay muted loop playsInline preload="metadata">
            {media.videoMobile && <source src={media.videoMobile} media="(max-width: 900px)" type="video/mp4" />}
            <source src={media.video} type="video/mp4" />
          </video>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={media.poster} alt="" className="kenburns" fetchPriority="high" />
        )}
      </motion.div>
      <div className="hero-veil" aria-hidden />
      <div className="blob a" />
      <div className="blob b" />

      <motion.div className="hero-copy" style={reduce ? undefined : { y: textY, opacity: fadeOut }}>
        <motion.div className="eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: EASE }}>
          <OpenStatus schedule={schedule} labels={statusLabels} />
          <span>{content.eyebrow}</span>
        </motion.div>
        <h1 aria-label={content.headline.join(' ')}>
          <SplitText as="span" className="l" text={content.headline[0]} delay={0.35} onView={false} />
          <SplitText as="span" className="l" text={content.headline[1]} delay={0.55} onView={false} />
        </h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1, ease: EASE }}>
          {content.lead}
        </motion.p>
        <motion.div className="cta" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.15, ease: EASE }}>
          <Magnetic>
            <a className="btn dark shine" href={kakaoUrl} target="_blank" rel="noopener">
              {content.ctaPrimary}
            </a>
          </Magnetic>
          <Magnetic>
            <Link className="btn ghost" href="/check">
              {content.ctaSecondary}
            </Link>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.svg
        className="symbols"
        viewBox="0 0 460 360"
        aria-hidden="true"
        style={reduce ? undefined : { y: symY, opacity: fadeOut }}
      >
        <motion.g animate={reduce ? undefined : { y: [0, -8, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
          <motion.circle className="fill g" cx="100" cy="150" r="70" {...pop(2.2)} />
          <motion.path d="M104 78c-4 36-22 70-40 92 2 14 20 24 36 20 12-4 16-12 12-22" {...draw(0.3)} />
          <motion.path d="M84 172c-8 4-14 10-12 18" {...draw(0.3)} />
          <motion.text x="100" y="262" textAnchor="middle" {...fade(2.4)}>
            코 · 비염 · 부비동 · ESS
          </motion.text>
        </motion.g>
        <motion.g animate={reduce ? undefined : { y: [0, 8, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}>
          <motion.circle className="fill" cx="260" cy="150" r="70" {...pop(2.32)} />
          <motion.path
            d="M232 130c0-30 18-48 40-48s36 18 36 40c0 20-14 28-22 40-6 10-6 24-18 30-12 6-26-2-30-16"
            {...draw(1.0)}
          />
          <motion.path d="M248 128c0-14 8-24 22-24s22 10 22 24c0 12-10 16-14 24" {...draw(1.0)} />
          <motion.text x="260" y="262" textAnchor="middle" {...fade(2.52)}>
            귀 · 이명 · 어지럼 · 중이염
          </motion.text>
        </motion.g>
        <motion.path
          className="wave"
          d="M40 322c20 0 20-28 40-28s20 28 40 28 20-28 40-28 20 28 40 28 20-28 40-28 20 28 40 28 20-28 40-28 20 28 40 28 20-28 40-28"
          {...draw(1.7, 1.1)}
        />
        <motion.text x="230" y="350" textAnchor="middle" {...fade(2.64)}>
          수면 · 코골이 · 수면다원검사
        </motion.text>
      </motion.svg>

      <motion.a href="#care" className="scroll-cue" style={{ opacity: fadeOut }}>
        <span>{content.scrollCue}</span>
        <i aria-hidden />
      </motion.a>
    </section>
  );
}
