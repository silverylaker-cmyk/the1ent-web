import SubHero from '@/components/SubHero';
import SymptomCheck from '@/components/features/SymptomCheck';
import { getCheck, getCareContent } from '@/lib/content';

export const metadata = { title: '증상 자가체크 | 더원이비인후과 반월당점' };

export default function Page() {
  const data = getCheck();
  const careTitles = {
    nose: getCareContent('nose').title,
    ear: getCareContent('ear').title,
    sleep: getCareContent('sleep').title,
  };
  return (
    <>
      <SubHero title={data.title} lead={data.lead} color="sage" crumb="자가체크" />
      <section className="check-wrap">
        <SymptomCheck data={data} careTitles={careTitles} />
      </section>
    </>
  );
}
