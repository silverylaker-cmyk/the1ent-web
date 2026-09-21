import CarePage from '@/components/CarePage';
import { getCareContent, getSiteConfig } from '@/lib/content';

export const metadata = { title: '코 | 더원이비인후과 반월당점' };

export default function Page() {
  return <CarePage care={getCareContent('nose')} site={getSiteConfig()} />;
}
