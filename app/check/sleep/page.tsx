import SubHero from '@/components/SubHero';
import StopBang from '@/components/features/StopBang';
import { getStopBang } from '@/lib/content';

export const metadata = { title: '수면무호흡 위험도 체크 | 더원이비인후과 반월당점' };

export default function Page() {
  const data = getStopBang();
  return (
    <>
      <SubHero title={data.title} lead={data.lead} color="sky" crumb="자가체크" />
      <section style={{ paddingTop: 0 }}>
        <StopBang data={data} />
      </section>
    </>
  );
}
