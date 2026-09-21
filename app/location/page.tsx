import Reveal from '@/components/Reveal';
import { getSiteConfig } from '@/lib/content';

export const metadata = { title: '오시는 길 | 더원이비인후과 반월당점' };

export default function Page() {
  const site = getSiteConfig();

  return (
    <>
      <section className="subhero">
        <h1>오시는 길</h1>
        <p className="lead">{site.address}</p>
      </section>
      <section className="map" style={{ paddingTop: 0 }}>
        <Reveal as="div" className="box">
          <div className="placeholder">지도 임베드 자리 (카카오맵 API 키 연결 필요)</div>
        </Reveal>
        <Reveal as="div" index={1}>
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
