export default function SubpageCta({ kakaoUrl }: { kakaoUrl: string }) {
  return (
    <section className="hours">
      <div className="kbox rv in" style={{ gridColumn: '1 / -1', maxWidth: 520 }}>
        <h2>예약은 카카오톡으로</h2>
        <p>이름, 증상, 원하는 날짜를 보내 주시면 순서대로 답해 드립니다.</p>
        <a className="btn dark" href={kakaoUrl} target="_blank" rel="noopener">
          카카오톡으로 예약
        </a>
      </div>
    </section>
  );
}
