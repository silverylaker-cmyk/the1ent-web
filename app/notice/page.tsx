import Reveal from '@/components/Reveal';
import { getNotices } from '@/lib/content';

export const metadata = { title: '공지 | 더원이비인후과 반월당점' };

export default function Page() {
  const notices = getNotices();

  return (
    <>
      <section className="subhero">
        <h1>공지</h1>
        <p className="lead">진료 일정 변경, 휴진 안내 등을 이곳에서 확인하실 수 있습니다.</p>
      </section>
      <section style={{ paddingTop: 0 }}>
        <Reveal as="div" className="accordion">
          {notices.length === 0 && <p className="lead">등록된 공지가 없습니다.</p>}
          {notices.map((n) => (
            <details className="accordion-item" key={n.slug}>
              <summary>
                {n.title}
                <span style={{ fontSize: 13, color: 'var(--ink-2)', fontFamily: 'var(--sans)' }}>
                  {n.date}
                </span>
              </summary>
              <div className="body">{n.body}</div>
            </details>
          ))}
        </Reveal>
      </section>
    </>
  );
}
