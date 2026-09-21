import Reveal from '@/components/Reveal';
import { getFees } from '@/lib/content';

export const metadata = { title: '비급여 항목 | 더원이비인후과 반월당점' };

export default function Page() {
  const fees = getFees();

  return (
    <>
      <section className="subhero">
        <h1>비급여 항목</h1>
        <p className="lead">의료법에 따라 비급여 진료 항목의 비용을 안내합니다. (기준일: {fees.updatedAt})</p>
      </section>
      <section style={{ paddingTop: 0 }}>
        <Reveal as="div">
          <table className="fees-table">
            <thead>
              <tr>
                <th>분류</th>
                <th>항목</th>
                <th>비용</th>
                <th>비고</th>
              </tr>
            </thead>
            <tbody>
              {fees.items.map((item) => (
                <tr key={item.name}>
                  <td>{item.category}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </section>
    </>
  );
}
