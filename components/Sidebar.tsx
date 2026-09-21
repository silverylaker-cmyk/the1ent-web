'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  IconHome,
  IconNose,
  IconSurgery,
  IconDoctors,
  IconClock,
  IconMap,
  IconKakao,
} from './icons';

const NAV = [
  { href: '/', label: '홈', icon: IconHome, match: (p: string) => p === '/' },
  { href: '/care/nose', label: '진료', icon: IconNose, match: (p: string) => p.startsWith('/care') },
  {
    href: '/surgery/ess',
    label: '수술·검사',
    icon: IconSurgery,
    match: (p: string) => p.startsWith('/surgery'),
  },
  { href: '/doctors', label: '의료진', icon: IconDoctors, match: (p: string) => p.startsWith('/doctors') },
  {
    href: '/reservation',
    label: '예약',
    icon: IconClock,
    match: (p: string) => p.startsWith('/reservation'),
  },
  { href: '/location', label: '오시는 길', icon: IconMap, match: (p: string) => p.startsWith('/location') },
];

export default function Sidebar({
  siteName,
  kakaoUrl,
}: {
  siteName: string;
  kakaoUrl: string;
}) {
  const pathname = usePathname();

  return (
    <aside className="sb">
      <Link href="/" className="logo">
        <div className="mark" />
        <span>{siteName}</span>
      </Link>
      <nav>
        {NAV.map(({ href, label, icon: Icon, match }) => (
          <Link key={href} href={href} className={match(pathname) ? 'active' : ''}>
            <Icon />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
      <a className="kakao" href={kakaoUrl} target="_blank" rel="noopener">
        <IconKakao />
        <span>카카오톡 예약</span>
      </a>
    </aside>
  );
}
