import Link from 'next/link';
import Hero from '@/components/Hero';
import Reveal from '@/components/Reveal';
import SurgerySteps from '@/components/SurgerySteps';
import { IconNose, IconEar, IconSleep } from '@/components/icons';
import { getCareContent, getAllSurgeryContent, getDoctors, getSiteConfig } from '@/lib/content';

export default function HomePage() {
  const site = getSiteConfig();
  const care = [getCareContent('nose'), getCareContent('ear'), getCareContent('sleep')];
  const careIcons = { nose: IconNose, ear: IconEar, sleep: IconSleep } as const;
  const surgeries = getAllSurgeryContent();
  const doctors = getDoctors();

  return (
    <>
      <Hero
        headline={['코, 귀, 그리고 잠.', '한 곳에서 끝까지 봅니다.']}
        lead="반월당역 10번 출구. 앉은 자세로 시행하는 Jikei 방식 내시경 코 수술부터 이명·어지럼, 코골이·수면다원검사까지 두 명의 전문의가 진단과 수술, 수술 후 관리를 이어서 맡습니다."
        kakaoUrl={site.kakaoChannelUrl}
      />

      <section id="care">
        <Reveal as="h2">세 가지 진료 축</Reveal>
        <Reveal as="p" className="lead" index={1}>
          이비인후과 전체를 나열하지 않습니다. 반월당점이 가장 많이 보고, 가장 깊게 보는 세 영역입니다.
        </Reveal>
        <div className="axis">
          {care.map((c, i) => {
            const Icon = careIcons[c.slug as keyof typeof careIcons];
            return (
              <Reveal as="div" index={i} key={c.slug}>
                <Link href={`/care/${c.slug}`} className={c.color}>
                  <Icon />
                  <h3>{c.title}</h3>
                  <p>{c.lead}</p>
                  <ul>
                    {c.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="surg" id="surgery">
        <Reveal as="h2">수술과 검사, 결정 전에 미리 봅니다</Reveal>
        <Reveal as="p" className="lead" index={1}>
          수술을 권유받은 분이 집에서 먼저 읽고 오시도록 만든 페이지입니다. 각 항목은 진단에서 회복까지 세 단계로 설명합니다.
        </Reveal>
        <div className="surg-grid">
          {surgeries.map((s, i) => (
            <Reveal as="div" className="surg-item" index={i} key={s.slug}>
              <h3>{s.title}</h3>
              <p className="sub">{s.sub}</p>
              <SurgerySteps steps={s.steps} color={s.color} />
              <Link className="more" href={`/surgery/${s.slug}`}>
                설명 영상과 동의 안내 보기
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section>
        <Reveal as="h2">더원이 다르게 하는 세 가지</Reveal>
        <div className="know">
          <Reveal as="div" index={0}>
            <div className="bar" />
            <h3>Jikei 대학 시술법</h3>
            <p>내시경 코 수술의 시초가 된 방식입니다. 환자가 앉은 상태로 진행해 출혈이 적고 회복이 빠릅니다.</p>
          </Reveal>
          <Reveal as="div" index={1}>
            <div className="bar" />
            <h3>검사에 근거한 결정</h3>
            <p>CT, 내시경, 청력·전정 검사, 수면다원검사로 먼저 수치를 만들고, 그 수치로 수술 여부를 정합니다.</p>
          </Reveal>
          <Reveal as="div" index={2}>
            <div className="bar" />
            <h3>수술 후 관리까지</h3>
            <p>수술한 의사가 세척과 외래를 끝까지 봅니다. 재발을 막는 건 수술 자체보다 그 이후입니다.</p>
          </Reveal>
        </div>
      </section>

      <section id="doctors">
        <Reveal as="h2">의료진</Reveal>
        <Reveal as="p" className="lead" index={1}>
          두 명의 이비인후과 전문의가 진료합니다.
        </Reveal>
        <div className="docs">
          {doctors.map((doc, i) => (
            <Reveal as="div" className="doc" index={i} key={doc.name}>
              <div className="photo">사진</div>
              <div>
                <h3>{doc.name} {i === 0 ? '대표원장' : '원장'}</h3>
                <div className="role">{doc.role}</div>
                <ul>
                  {doc.career.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="hours" id="hours">
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
          <p>채널을 추가하고 이름, 증상, 원하는 날짜를 보내 주세요. 진료 시간 내 순서대로 답합니다. 수술 상담은 같은 채널에서 &quot;수술 상담&quot;이라고 적어 주시면 됩니다.</p>
          <a className="btn dark" href={site.kakaoChannelUrl} target="_blank" rel="noopener">
            채널 열기
          </a>
          <a className="tel" href={site.telHref}>
            {site.tel}
          </a>
        </Reveal>
      </section>

      <section className="map" id="map">
        <Reveal as="div" className="box">
          <div className="placeholder">지도 임베드 자리 (카카오맵)</div>
        </Reveal>
        <Reveal as="div" index={1}>
          <h2>오시는 길</h2>
          <p className="lead">{site.address}</p>
          <dl>
            <dt>지하철</dt>
            <dd>{site.addressDetail.subway}</dd>
            <dt>버스</dt>
            <dd>{site.addressDetail.bus}</dd>
            <dt>자가용</dt>
            <dd>{site.addressDetail.car}</dd>
          </dl>
        </Reveal>
      </section>
    </>
  );
}
