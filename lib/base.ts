const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** public/ 아래 정적 파일 경로에 GitHub Pages basePath를 붙인다. */
export function withBase(path: string): string {
  return `${BASE}${path.startsWith('/') ? path : `/${path}`}`;
}
