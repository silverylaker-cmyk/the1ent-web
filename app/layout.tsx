import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import Fab from '@/components/Fab';
import Footer from '@/components/Footer';
import MotionRoot from '@/components/motion/MotionRoot';
import CommandPalette from '@/components/features/CommandPalette';
import FontSize from '@/components/features/FontSize';
import BackToTop from '@/components/features/BackToTop';
import { getSiteConfig, getSearchIndex, getUi } from '@/lib/content';
import './globals.css';
import './enhance.css';

export const metadata: Metadata = {
  title: '더원이비인후과 반월당점',
  description: '반월당역 10번 출구. 코·귀·수면 전문 이비인후과.',
  openGraph: {
    title: '더원이비인후과 반월당점',
    description: '반월당역 10번 출구. 코·귀·수면 전문 이비인후과.',
    locale: 'ko_KR',
    type: 'website',
  },
};
export const viewport: Viewport = { themeColor: '#F7F6F2' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const site = getSiteConfig();
  const ui = getUi();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: site.name,
    telephone: site.tel,
    faxNumber: site.fax,
    medicalSpecialty: 'Otolaryngologic',
    address: { '@type': 'PostalAddress', streetAddress: site.address, addressLocality: '대구', addressCountry: 'KR' },
  };

  return (
    <html lang="ko">
      <body>
        <a className="skip" href="#main">
          본문으로 건너뛰기
        </a>
        <MotionRoot>
          <Sidebar siteName={site.name} kakaoUrl={site.kakaoChannelUrl} />
          <div className="notice" id="top">
            <Link href="/notice" className="notice-text">
              <b>공지</b> <span>{site.notice}</span>
            </Link>
            <div className="notice-tools">
              <FontSize t={ui.fontSize} />
              <CommandPalette index={getSearchIndex()} t={ui.palette} />
            </div>
          </div>
          <main id="main">{children}</main>
          <Footer site={site} />
          <Fab kakaoUrl={site.kakaoChannelUrl} />
          <BackToTop label={ui.toTop} />
        </MotionRoot>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
