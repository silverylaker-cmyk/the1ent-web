import Link from 'next/link';
import type { SiteConfig } from '@/lib/content';

export default function Footer({ site }: { site: SiteConfig }) {
  return (
    <footer>
      <div>
        {site.nameShort} · 대표자 {site.ceo} · 사업자등록번호 {site.bizRegNo}
        <br />
        전화 {site.tel} · 팩스 {site.fax}
      </div>
      <div>
        <Link href="/fees">비급여 항목</Link> &nbsp;
        <Link href="/faq">자주 묻는 질문</Link> &nbsp;
        <Link href="/notice">공지</Link> &nbsp;
        <a href="#">개인정보처리방침</a> &nbsp;
        <a href={site.sisterClinic.url}>{site.sisterClinic.name}</a>
      </div>
    </footer>
  );
}
