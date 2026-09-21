import SurgeryPage from '@/components/SurgeryPage';
import { getSurgeryContent, getSiteConfig } from '@/lib/content';

export const metadata = { title: '내시경 비중격 수술 | 더원이비인후과 반월당점' };

export default function Page() {
  return <SurgeryPage surgery={getSurgeryContent('septoplasty')} site={getSiteConfig()} />;
}
