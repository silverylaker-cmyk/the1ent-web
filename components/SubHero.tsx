import SplitText from './motion/SplitText';
import type { CSSProperties, ReactNode } from 'react';

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
        <p className="crumb rise fade">{crumb}</p>
      )}
      <SplitText as="h1" text={title} onView={false} delay={0.05} />
      {lead && (
        <p className="lead rise" style={{ '--d': '0.2s' } as CSSProperties}>
          {lead}
        </p>
      )}
      {children}
    </section>
  );
}
