import SubHero from '@/components/SubHero';
import Reveal from '@/components/Reveal';
import Accordion from '@/components/MarkdownAccordion';
import { getNotices } from '@/lib/content';

export const metadata = { title: '공지 | 더원이비인후과 반월당점' };

export default function Page() {
  const notices = getNotices();

  return (
    <>
      <SubHero title="공지" lead="진료 일정 변경, 휴진 안내 등을 이곳에서 확인하실 수 있습니다." />
      <section style={{ paddingTop: 0 }}>
        <Reveal as="div">
          {notices.length === 0 ? (
            <p className="lead">등록된 공지가 없습니다.</p>
          ) : (
            <Accordion sections={notices.map((n) => ({ heading: `${n.date} · ${n.title}`, body: n.body }))} />
          )}
        </Reveal>
      </section>
    </>
  );
}
