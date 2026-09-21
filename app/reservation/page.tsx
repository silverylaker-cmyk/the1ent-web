import Reveal from '@/components/Reveal';
import { getSiteConfig } from '@/lib/content';

export const metadata = { title: '예약 | 더원이비인후과 반월당점' };

export default function Page() {
  const site = getSiteConfig();

  return (
    <>
      <section className="subhero">
        <h1>예약</h1>
        <p className="lead">모든 예약은 카카오톡 채널을 통해 접수합니다. 전화 문의도 가능합니다.</p>
      </section>
      <section className="hours" style={{ paddingTop: 0 }}>
        <Reveal as="div">
          <h2>진료시간</h2>
          <table>
            <tbody>
              {site.hours.map((h) => (
                <tr key={h.label}>
                  <td>{h.label}</td>
                  <td>{h.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
        <Reveal as="div" className="kbox" index={1}>
          <h3>예약은 카카오톡으로</h3>
          <p>
            채널을 추가하고 이름, 증상, 원하는 날짜를 보내 주세요. 진료 시간 내 순서대로 답합니다. 수술
            상담은 같은 채널에서 &quot;수술 상담&quot;이라고 적어 주시면 됩니다.
          </p>
          <a className="btn dark" href={site.kakaoChannelUrl} target="_blank" rel="noopener">
            채널 열기
          </a>
          <a className="tel" href={site.telHref}>
            {site.tel}
          </a>
        </Reveal>
      </section>
    </>
  );
}
