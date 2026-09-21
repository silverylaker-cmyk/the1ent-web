import Reveal from '@/components/Reveal';
import Accordion from '@/components/Accordion';
import SubpageCta from '@/components/SubpageCta';
import { splitSections } from '@/lib/markdown';
import type { CareContent, SiteConfig } from '@/lib/content';

export default function CarePage({ care, site }: { care: CareContent; site: SiteConfig }) {
  const sections = splitSections(care.body);

  return (
    <>
      <section className="subhero">
        <h1>{care.title}</h1>
        <p className="lead">{care.lead}</p>
        <ul className="tags">
          {care.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </section>
      <section style={{ paddingTop: 0 }}>
        <Reveal as="div">
          <Accordion sections={sections} />
        </Reveal>
      </section>
      <SubpageCta kakaoUrl={site.kakaoChannelUrl} />
    </>
  );
}
