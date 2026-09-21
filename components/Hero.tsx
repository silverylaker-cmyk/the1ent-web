const HERO_SCRIPT = `
(function(){
  var rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (rm) return;
  var root = document.getElementById('hero-symbols');
  if (!root) return;
  var E = 'cubic-bezier(.22,1,.36,1)';
  var paths = [].slice.call(root.querySelectorAll('path'));
  paths.forEach(function (p) {
    var L = p.getTotalLength();
    p.style.setProperty('--len', L);
  });
  var t = 200;
  var draw = function (sel, dur) {
    root.querySelectorAll(sel).forEach(function (p) {
      p.animate(
        [{ strokeDashoffset: p.getTotalLength() }, { strokeDashoffset: 0 }],
        { duration: dur, delay: t, easing: E, fill: 'forwards' }
      );
    });
  };
  draw('#s1,#s2', 900);
  t += 700;
  draw('#s3,#s4', 900);
  t += 700;
  draw('#s5', 1100);
  t += 600;
  root.querySelectorAll('.fill').forEach(function (c, i) {
    c.animate(
      [
        { opacity: 0, transform: 'scale(.6)' },
        { opacity: 0.7, transform: 'scale(1)' },
      ],
      { duration: 800, delay: t + i * 120, easing: E, fill: 'forwards' }
    );
  });
  root.querySelectorAll('text').forEach(function (x, i) {
    x.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 500,
      delay: t + 200 + i * 120,
      fill: 'forwards',
    });
  });
  document.querySelectorAll('.hero h1 .l').forEach(function (l, i) {
    l.animate(
      [
        { opacity: 0, transform: 'translateY(14px)' },
        { opacity: 1, transform: 'none' },
      ],
      { duration: 800, delay: 300 + i * 140, easing: E, fill: 'forwards' }
    );
  });
  var p = document.querySelector('.hero p');
  if (p) p.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 700, delay: 800, fill: 'forwards' });
  var cta = document.querySelector('.hero .cta');
  if (cta) cta.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 700, delay: 1000, fill: 'forwards' });
})();
`;

export default function Hero({
  headline,
  lead,
  kakaoUrl,
}: {
  headline: [string, string];
  lead: string;
  kakaoUrl: string;
}) {
  return (
    <section className="hero">
      <div className="blob a" />
      <div className="blob b" />
      <div>
        <h1>
          <span className="l">{headline[0]}</span>
          <span className="l">{headline[1]}</span>
        </h1>
        <p>{lead}</p>
        <div className="cta">
          <a className="btn dark" href={kakaoUrl} target="_blank" rel="noopener">
            카카오톡으로 예약
          </a>
          <a className="btn ghost" href="#surgery">
            수술 설명 보기
          </a>
        </div>
      </div>
      <svg id="hero-symbols" className="symbols" viewBox="0 0 460 360" aria-hidden="true">
        <circle className="fill g" cx="100" cy="150" r="70" />
        <path id="s1" d="M104 78c-4 36-22 70-40 92 2 14 20 24 36 20 12-4 16-12 12-22" />
        <path id="s2" d="M84 172c-8 4-14 10-12 18" />
        <text x="100" y="262" textAnchor="middle">
          코 · 비염 · 부비동 · ESS
        </text>

        <circle className="fill" cx="260" cy="150" r="70" />
        <path
          id="s3"
          d="M232 130c0-30 18-48 40-48s36 18 36 40c0 20-14 28-22 40-6 10-6 24-18 30-12 6-26-2-30-16"
        />
        <path id="s4" d="M248 128c0-14 8-24 22-24s22 10 22 24c0 12-10 16-14 24" />
        <text x="260" y="262" textAnchor="middle">
          귀 · 이명 · 어지럼 · 중이염
        </text>

        <circle className="fill" cx="180" cy="300" r="0" />
        <path
          id="s5"
          d="M40 322c20 0 20-28 40-28s20 28 40 28 20-28 40-28 20 28 40 28 20-28 40-28 20 28 40 28 20-28 40-28 20 28 40 28 20-28 40-28"
        />
        <text x="230" y="350" textAnchor="middle">
          수면 · 코골이 · 수면다원검사
        </text>
      </svg>
      <script dangerouslySetInnerHTML={{ __html: HERO_SCRIPT }} />
    </section>
  );
}
