// 증상 등 민감할 수 있는 내용은 URL에 싣지 않고 세션 저장소로만 예약 도우미에 넘긴다
const KEY = 'the1-prefill';
export type Prefill = { symptom?: string; type?: number };

export function savePrefill(p: Prefill) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(p));
  } catch {}
}
export function takePrefill(): Prefill | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    sessionStorage.removeItem(KEY);
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
