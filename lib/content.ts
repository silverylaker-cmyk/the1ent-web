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
  schedule: Schedule;
  mapLinks: { kakao: string; naver: string };
};

export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
/** [open, close] · null = 미확정(전화 확인) · 'closed' = 휴진 */
export type Schedule = Record<DayKey, [string, string] | null | 'closed'> & { lunch: [string, string] };

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

function readJson<T>(name: string): T {
  return JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, name), 'utf-8'));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Json = any;
export const getHomeContent = (): Json => readJson('home.json');
export type MediaConfig = {
  hero: { poster: string; video: string | null; videoMobile?: string | null };
  band: { image: string; video: string | null };
  care: Record<CareSlug, string | null>;
};

/** media.json의 video가 null이어도 public/media에 약속된 파일명이 있으면 자동으로 켠다 */
export function getMedia(): MediaConfig {
  const m = readJson<MediaConfig>('media.json');
  const has = (rel: string) => fs.existsSync(path.join(process.cwd(), 'public', rel));
  if (!m.hero.video && has('/media/hero.mp4')) m.hero.video = '/media/hero.mp4';
  if (!m.hero.videoMobile && has('/media/hero-mobile.mp4')) m.hero.videoMobile = '/media/hero-mobile.mp4';
  if (!m.band.video && has('/media/band.mp4')) m.band.video = '/media/band.mp4';
  return m;
}
export const getUi = (): Json => readJson('ui.json');
export const getCheck = (): Json => readJson('check.json');
export const getStopBang = (): Json => readJson('stopbang.json');

export type FaqItem = { category: string; q: string; a: string };
export const getFaq = (): FaqItem[] => readJson('faq.json');

export type SearchEntry = { href: string; title: string; desc: string; keywords: string };

/** 빠른 검색(Cmd+K) 팔레트용 정적 인덱스 */
export function getSearchIndex(): SearchEntry[] {
  const care = (['nose', 'ear', 'sleep'] as CareSlug[]).map(getCareContent);
  const check = getCheck();
  const sb = getStopBang();
  const ui = getUi();
  const site = getSiteConfig();
  return [
    ...care.map((c) => ({ href: `/care/${c.slug}`, title: c.title, desc: c.lead, keywords: c.tags.join(' ') })),
    ...getAllSurgeryContent().map((s) => ({ href: `/surgery/${s.slug}`, title: s.title, desc: s.sub, keywords: s.steps.map((x) => x.detail).join(' ') })),
    { href: '/check', title: check.title, desc: check.lead, keywords: '증상 체크 자가진단' },
    { href: '/check/sleep', title: sb.title, desc: sb.lead, keywords: 'STOP-BANG 코골이 수면무호흡' },
    { href: '/faq', title: ui.faq.title, desc: ui.faq.lead, keywords: getFaq().map((f) => f.q).join(' ') },
    { href: '/doctors', title: '의료진', desc: getDoctors().map((d) => d.name).join(' · '), keywords: '원장 전문의' },
    { href: '/reservation', title: '예약', desc: ui.helper.lead, keywords: '카카오톡 예약 진료시간 전화' },
    { href: '/location', title: '오시는 길', desc: site.address, keywords: '주차 지하철 버스 반월당 지도' },
    { href: '/notice', title: '공지', desc: site.notice, keywords: '휴진 안내' },
    { href: '/fees', title: '비급여 항목', desc: '비급여 진료 비용 안내', keywords: '비용 가격 수가' },
  ];
}
