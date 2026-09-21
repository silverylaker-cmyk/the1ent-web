import Link from 'next/link';
import Reveal from './Reveal';
import Magnetic from './motion/Magnetic';

export default function SubpageCta({ kakaoUrl }: { kakaoUrl: string }) {
  return (
    <section className="cta-band">
      <Reveal as="div" className="cta-inner">
        <div className="cta-orb" aria-hidden />
        <h2>예약은 카카오톡으로</h2>
        <p>이름, 증상, 원하는 날짜를 보내 주시면 순서대로 답해 드립니다.</p>
        <div className="kbox-cta">
          <Magnetic>
            <a className="btn dark shine" href={kakaoUrl} target="_blank" rel="noopener">
              카카오톡으로 예약
            </a>
          </Magnetic>
          <Link className="btn ghost" href="/reservation#helper">
            예약 메시지 만들기
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
