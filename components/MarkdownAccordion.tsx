import ReactMarkdown from 'react-markdown';
import Accordion from './Accordion';
import type { MarkdownSection } from '@/lib/markdown';

export default function MarkdownAccordion({ sections }: { sections: MarkdownSection[] }) {
  return (
    <Accordion
      sections={sections.map((s) => ({ heading: s.heading, content: <ReactMarkdown>{s.body}</ReactMarkdown> }))}
    />
  );
}
