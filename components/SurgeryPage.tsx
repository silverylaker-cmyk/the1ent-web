import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Accordion from '@/components/MarkdownAccordion';
import SubHero from '@/components/SubHero';
import SurgerySteps from '@/components/SurgerySteps';
import SubpageCta from '@/components/SubpageCta';
import Toc from '@/components/features/Toc';
import { splitSections, sectionId } from '@/lib/markdown';
import { getAllSurgeryContent, getUi, type SurgeryContent, type SiteConfig } from '@/lib/content';

export default function SurgeryPage({ surgery, site }: { surgery: SurgeryContent; site: SiteConfig }) {
  const sections = splitSections(surgery.body);
  const ui = getUi();
  const all = getAllSurgeryContent();

  return (
    <>
      <SubHero title={surgery.title} lead={surgery.sub} color={surgery.color} crumb="수술 · 검사">
        <Reveal as="div" className="subhero-steps" index={5}>
          <SurgerySteps steps={surgery.steps} color={surgery.color} />
        </Reveal>
      </SubHero>
      <nav className="pills" aria-label="수술 · 검사 목록">
        {all.map((s) => (
          <Link key={s.slug} href={`/surgery/${s.slug}`} aria-current={s.slug === surgery.slug ? 'page' : undefined}>
            {s.title}
          </Link>
        ))}
      </nav>
      <section className="sub-body">
        <Toc title={ui.toc} items={sections.map((s, i) => ({ id: sectionId(i), label: s.heading }))} />
        <Reveal as="div">
          <Accordion sections={sections} />
        </Reveal>
      </section>
      <SubpageCta kakaoUrl={site.kakaoChannelUrl} />
    </>
  );
}
