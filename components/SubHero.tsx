import SplitText from './motion/SplitText';
import Reveal from './Reveal';
import type { ReactNode } from 'react';

export default function SubHero({
  title,
  lead,
  color,
  crumb,
  children,
}: {
  title: string;
  lead?: string;
  color?: 'sage' | 'sky';
  crumb?: string;
  children?: ReactNode;
}) {
  return (
    <section className={`subhero ${color ?? ''}`}>
      <div className="subhero-orb a" aria-hidden />
      <div className="subhero-orb b" aria-hidden />
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
