import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export type SiteConfig = {
  name: string;
  nameShort: string;
  ceo: string;
  bizRegNo: string;
  tel: string;
  telHref: string;
  fax: string;
  address: string;
  addressDetail: { subway: string; bus: string; car: string };
  kakaoChannelUrl: string;
  hours: { label: string; time: string }[];
  notice: string;
  sisterClinic: { name: string; url: string };
};

export type Doctor = {
  name: string;
  role: string;
  photo: string | null;
  focus: string;
  career: string[];
};

export type FeeItem = { category: string; name: string; price: string; note: string };
export type FeesData = { updatedAt: string; items: FeeItem[] };

export type CareContent = {
  slug: string;
  title: string;
  color: 'sage' | 'sky';
  lead: string;
  tags: string[];
  body: string;
};

export type SurgeryStep = { label: string; detail: string };
export type SurgeryContent = {
  slug: string;
  title: string;
  sub: string;
  color: 'sage' | 'sky';
  steps: SurgeryStep[];
  body: string;
};

export type Notice = { slug: string; date: string; title: string; body: string };

export function getSiteConfig(): SiteConfig {
  const file = fs.readFileSync(path.join(CONTENT_DIR, 'site.json'), 'utf-8');
  return JSON.parse(file);
}

export function getDoctors(): Doctor[] {
  const file = fs.readFileSync(path.join(CONTENT_DIR, 'doctors.json'), 'utf-8');
  return JSON.parse(file);
}

export function getFees(): FeesData {
  const file = fs.readFileSync(path.join(CONTENT_DIR, 'fees.json'), 'utf-8');
  return JSON.parse(file);
}

export type CareSlug = 'nose' | 'ear' | 'sleep';

export function getCareContent(slug: CareSlug): CareContent {
  const file = fs.readFileSync(path.join(CONTENT_DIR, 'care', `${slug}.md`), 'utf-8');
  const { data, content } = matter(file);
  return {
    slug,
    title: data.title,
    color: data.color,
    lead: data.lead,
    tags: data.tags ?? [],
    body: content.trim(),
  };
}

const SURGERY_SLUGS = ['ess', 'septoplasty', 'snoring', 'psg'] as const;
export type SurgerySlug = (typeof SURGERY_SLUGS)[number];

export function getSurgeryContent(slug: SurgerySlug): SurgeryContent {
  const file = fs.readFileSync(path.join(CONTENT_DIR, 'surgery', `${slug}.md`), 'utf-8');
  const { data, content } = matter(file);
  return {
    slug,
    title: data.title,
    sub: data.sub,
    color: data.color,
    steps: data.steps ?? [],
    body: content.trim(),
  };
}

export function getAllSurgeryContent(): SurgeryContent[] {
  return SURGERY_SLUGS.map(getSurgeryContent);
}

export function getNotices(): Notice[] {
  const dir = path.join(CONTENT_DIR, 'notices');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
  const notices = files.map((filename) => {
    const raw = fs.readFileSync(path.join(dir, filename), 'utf-8');
    const { data, content } = matter(raw);
    return {
      slug: filename.replace(/\.md$/, ''),
      date: String(data.date ?? ''),
      title: data.title ?? filename,
      body: content.trim(),
    };
  });
  return notices.sort((a, b) => (a.date < b.date ? 1 : -1));
}
