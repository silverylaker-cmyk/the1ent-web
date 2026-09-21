import ReactMarkdown from 'react-markdown';
import type { MarkdownSection } from '@/lib/markdown';

export default function Accordion({ sections }: { sections: MarkdownSection[] }) {
  return (
    <div className="accordion">
      {sections.map((s, i) => (
        <details className="accordion-item" key={s.heading} open={i === 0}>
          <summary>{s.heading}</summary>
          <div className="body">
            <ReactMarkdown>{s.body}</ReactMarkdown>
          </div>
        </details>
      ))}
    </div>
  );
}
