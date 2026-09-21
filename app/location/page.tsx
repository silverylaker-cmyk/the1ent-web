import SubHero from '@/components/SubHero';
import Reveal from '@/components/Reveal';
import MapBox from '@/components/features/MapBox';
import { getSiteConfig, getUi, getHomeContent } from '@/lib/content';

export const metadata = { title: '오시는 길 | 더원이비인후과 반월당점' };

export default function Page() {
  const site = getSiteConfig();

  return (
    <>
      <SubHero title="오시는 길" lead={site.address} color="sky" />
      <section className="map" style={{ paddingTop: 0 }}>
        <Reveal as="div">
          <MapBox site={site} ui={getUi()} placeholder={getHomeContent().map.placeholder} />
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
