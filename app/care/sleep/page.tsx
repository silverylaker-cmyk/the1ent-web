import CarePage from '@/components/CarePage';
import { getCareContent, getSiteConfig } from '@/lib/content';

export const metadata = { title: '수면 | 더원이비인후과 반월당점' };

export default function Page() {
  return <CarePage care={getCareContent('sleep')} site={getSiteConfig()} />;
}
