import OpenStatus from './OpenStatus';
import type { SiteConfig } from '@/lib/content';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HoursTable({ site, ui }: { site: SiteConfig; ui: any }) {
  return (
    <>
      <div className="hours-status">
        <OpenStatus schedule={site.schedule} labels={ui.status} days={ui.days} />
      </div>
      <table>
        <tbody>
          {site.hours.map((h) => (
            <tr key={h.label}>
              <td>{h.label}</td>
              <td>{h.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
