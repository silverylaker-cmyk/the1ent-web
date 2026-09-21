import Reveal from '@/components/Reveal';
import SubHero from '@/components/SubHero';
import SubpageCta from '@/components/SubpageCta';
import { getDoctors, getSiteConfig } from '@/lib/content';

export const metadata = { title: '의료진 | 더원이비인후과 반월당점' };

export default function Page() {
  const doctors = getDoctors();
  const site = getSiteConfig();

  return (
    <>
      <SubHero title="의료진" lead="두 명의 이비인후과 전문의가 진료합니다." color="sage" />
      <section style={{ paddingTop: 0 }}>
        <div className="docs">
          {doctors.map((doc, i) => (
            <Reveal as="div" className="doc" index={i} key={doc.name}>
              <div className="photo">사진 준비 중</div>
              <div>
                <h2>
                  {doc.name} {i === 0 ? '대표원장' : '원장'}
                </h2>
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
      <SubpageCta kakaoUrl={site.kakaoChannelUrl} />
    </>
  );
}
