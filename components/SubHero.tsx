import SplitText from './motion/SplitText';
import Reveal from './Reveal';
import type { ReactNode } from 'react';

export default function SubHero({
  title,
  lead,
  color,
  crumb,
  art,
  children,
}: {
  title: string;
  lead?: string;
  color?: 'sage' | 'sky';
  crumb?: string;
  /** 우측에 깔리는 장식 이미지(이미 basePath가 붙은 경로) */
  art?: string;
  children?: ReactNode;
}) {
  return (
    <section className={`subhero ${color ?? ''}`}>
      <div className="subhero-orb a" aria-hidden />
      <div className="subhero-orb b" aria-hidden />
      {art && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="subhero-art kenburns" src={art} alt="" />
      )}
      {crumb && (
        <Reveal as="p" className="crumb">
          {crumb}
        </Reveal>
      )}
      <SplitText as="h1" text={title} onView={false} delay={0.2} />
      {lead && (
        <Reveal as="p" className="lead" index={3}>
          {lead}
        </Reveal>
      )}
      {children}
    </section>
  );
}
