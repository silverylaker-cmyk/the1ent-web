import SubHero from '@/components/SubHero';
import Reveal from '@/components/Reveal';
import FeesTable from '@/components/features/FeesTable';
import { getFees, getUi } from '@/lib/content';

export const metadata = { title: '비급여 항목 | 더원이비인후과 반월당점' };

export default function Page() {
  const fees = getFees();
  return (
    <>
      <SubHero
        title="비급여 항목"
        lead={`의료법에 따라 비급여 진료 항목의 비용을 안내합니다. (기준일: ${fees.updatedAt})`}
      />
      <section style={{ paddingTop: 0 }}>
        <Reveal as="div">
          <FeesTable items={fees.items} t={getUi().fees} />
        </Reveal>
      </section>
    </>
  );
}
