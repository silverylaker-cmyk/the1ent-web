import SubHero from '@/components/SubHero';
import Reveal from '@/components/Reveal';
import HoursTable from '@/components/features/HoursTable';
import ReservationHelper from '@/components/features/ReservationHelper';
import { getSiteConfig, getUi, getHomeContent } from '@/lib/content';

export const metadata = { title: '예약 | 더원이비인후과 반월당점' };

export default function Page() {
  const site = getSiteConfig();
  const ui = getUi();
  const home = getHomeContent();

  return (
    <>
      <SubHero title="예약" lead="모든 예약은 카카오톡 채널을 통해 접수합니다. 전화 문의도 가능합니다." color="sky" />
      <section style={{ paddingTop: 0 }}>
        {/* 첫 화면 콘텐츠라 JS에 묶인 Reveal 없이 둔다 — 페이지 진입 애니메이션(page-enter)이 이미 걸려 있다 */}
        <ReservationHelper t={ui.helper} kakaoUrl={site.kakaoChannelUrl} />
      </section>
      <section className="hours">
        <Reveal as="div">
          <h2>{home.hours.title}</h2>
          <HoursTable site={site} ui={ui} />
        </Reveal>
        <Reveal as="div" className="kbox" index={1}>
          <h3>{home.hours.kakaoTitle}</h3>
          <p>{home.hours.kakaoBody}</p>
          <a className="btn dark shine" href={site.kakaoChannelUrl} target="_blank" rel="noopener">
            {home.hours.kakaoCta}
          </a>
          <a className="tel" href={site.telHref}>
            {site.tel}
          </a>
        </Reveal>
      </section>
    </>
  );
}
