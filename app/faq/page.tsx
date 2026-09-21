import SubHero from '@/components/SubHero';
import SubpageCta from '@/components/SubpageCta';
import FaqList from '@/components/features/FaqList';
import { getFaq, getUi, getSiteConfig } from '@/lib/content';

export const metadata = { title: '자주 묻는 질문 | 더원이비인후과 반월당점' };

export default function Page() {
  const ui = getUi();
  const faq = getFaq();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  return (
    <>
      <SubHero title={ui.faq.title} lead={ui.faq.lead} color="sage" />
      <section style={{ paddingTop: 0 }}>
        <FaqList items={faq} t={ui.faq} />
      </section>
      <SubpageCta kakaoUrl={getSiteConfig().kakaoChannelUrl} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
