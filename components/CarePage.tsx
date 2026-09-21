import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Accordion from '@/components/MarkdownAccordion';
import SubHero from '@/components/SubHero';
import SubpageCta from '@/components/SubpageCta';
import Toc from '@/components/features/Toc';
import { IconArrow } from '@/components/icons';
import { splitSections, sectionId } from '@/lib/markdown';
import { getAllSurgeryContent, getUi, type CareContent, type SiteConfig } from '@/lib/content';

const RELATED: Record<string, string[]> = {
  nose: ['ess', 'septoplasty'],
  ear: [],
  sleep: ['snoring', 'psg'],
};

export default function CarePage({ care, site }: { care: CareContent; site: SiteConfig }) {
  const sections = splitSections(care.body);
  const ui = getUi();
  const related = getAllSurgeryContent().filter((s) => RELATED[care.slug]?.includes(s.slug));

  return (
    <>
      <SubHero title={care.title} lead={care.lead} color={care.color} crumb="진료">
        <ul className="tags">
          {care.tags.map((tag, i) => (
            <Reveal as="li" index={i + 4} staggerMs={50} key={tag}>
              {tag}
            </Reveal>
          ))}
        </ul>
      </SubHero>
      <section className="sub-body">
        <Toc title={ui.toc} items={sections.map((s, i) => ({ id: sectionId(i), label: s.heading }))} />
        <Reveal as="div">
          <Accordion sections={sections} />
          {related.length > 0 && (
            <div className="related">
              {related.map((s) => (
                <Link key={s.slug} href={`/surgery/${s.slug}`} className={`tool ${s.color}`}>
                  <h3>{s.title}</h3>
                  <p>{s.sub}</p>
                  <span className="tool-go" aria-hidden>
                    <IconArrow />
                  </span>
                </Link>
              ))}
            </div>
          )}
          {care.slug === 'sleep' && (
            <Link href="/check/sleep" className="more" style={{ marginTop: 28 }}>
              수면무호흡 위험도 체크 (STOP-BANG)
              <IconArrow />
            </Link>
          )}
        </Reveal>
      </section>
      <SubpageCta kakaoUrl={site.kakaoChannelUrl} />
    </>
  );
}
