import SurgeryPage from '@/components/SurgeryPage';
import { getSurgeryContent, getSiteConfig } from '@/lib/content';

export const metadata = { title: '축농증 내시경 수술 (ESS) | 더원이비인후과 반월당점' };

export default function Page() {
  return <SurgeryPage surgery={getSurgeryContent('ess')} site={getSiteConfig()} />;
}
