import Reveal from '@/components/Reveal';
import Accordion from '@/components/Accordion';
import SurgerySteps from '@/components/SurgerySteps';
import SubpageCta from '@/components/SubpageCta';
import { splitSections } from '@/lib/markdown';
import type { SurgeryContent, SiteConfig } from '@/lib/content';

export default function SurgeryPage({
  surgery,
  site,
}: {
  surgery: SurgeryContent;
  site: SiteConfig;
}) {
  const sections = splitSections(surgery.body);

  return (
    <>
      <section className="subhero">
        <h1>{surgery.title}</h1>
        <p className="lead">{surgery.sub}</p>
        <div style={{ marginTop: 32, maxWidth: 480 }}>
          <SurgerySteps steps={surgery.steps} color={surgery.color} />
        </div>
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
