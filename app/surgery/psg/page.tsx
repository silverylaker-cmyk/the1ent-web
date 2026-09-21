import SurgeryPage from '@/components/SurgeryPage';
import { getSurgeryContent, getSiteConfig } from '@/lib/content';

export const metadata = { title: '수면다원검사 (PSG) | 더원이비인후과 반월당점' };

export default function Page() {
  return <SurgeryPage surgery={getSurgeryContent('psg')} site={getSiteConfig()} />;
}
