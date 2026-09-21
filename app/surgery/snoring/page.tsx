import SurgeryPage from '@/components/SurgeryPage';
import { getSurgeryContent, getSiteConfig } from '@/lib/content';

export const metadata = { title: '코골이 수술 | 더원이비인후과 반월당점' };

export default function Page() {
  return <SurgeryPage surgery={getSurgeryContent('snoring')} site={getSiteConfig()} />;
}
