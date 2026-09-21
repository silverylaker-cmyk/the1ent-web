import type { Metadata } from 'next';
import Sidebar from '@/components/Sidebar';
import Fab from '@/components/Fab';
import Footer from '@/components/Footer';
import { getSiteConfig } from '@/lib/content';
import './globals.css';

export const metadata: Metadata = {
  title: '더원이비인후과 반월당점',
  description: '반월당역 10번 출구. 코·귀·수면 전문 이비인후과.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const site = getSiteConfig();

  return (
    <html lang="ko">
      <body>
        <Sidebar siteName={site.name} kakaoUrl={site.kakaoChannelUrl} />
        <div className="notice" id="top">
          <b>공지</b> {site.notice}
        </div>
        <main>{children}</main>
        <Footer site={site} />
        <Fab kakaoUrl={site.kakaoChannelUrl} />
      </body>
    </html>
  );
}
