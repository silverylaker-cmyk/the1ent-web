import CopyButton from './CopyButton';
import type { SiteConfig } from '@/lib/content';

/** 카카오맵 JS 키가 연결되기 전까지는 핀 애니메이션 + 외부 지도 링크로 대체 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MapBox({ site, ui, placeholder }: { site: SiteConfig; ui: any; placeholder: string }) {
  return (
    <div className="mapbox">
      <div className="box" role="img" aria-label={placeholder}>
        <div className="map-grid" aria-hidden />
        <div className="map-pin" aria-hidden>
          <i />
          <i />
          <b />
        </div>
        <div className="map-label">{site.addressDetail.subway}</div>
      </div>
      <div className="chips">
        <CopyButton text={site.address} label={ui.location.copyAddress} doneLabel={ui.copy.done} />
        <a className="chip" href={site.mapLinks.kakao} target="_blank" rel="noopener">
          {ui.location.kakaoMap}
        </a>
        <a className="chip" href={site.mapLinks.naver} target="_blank" rel="noopener">
          {ui.location.naverMap}
        </a>
        <a className="chip" href={site.telHref}>
          {ui.location.call}
        </a>
      </div>
    </div>
  );
}
