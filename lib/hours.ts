import type { DayKey, Schedule } from './content';

const KEYS: DayKey[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const toMin = (hhmm: string) => Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3));

export type OpenState =
  | { kind: 'open'; until: string }
  | { kind: 'lunch'; until: string }
  | { kind: 'closed'; next?: { day: DayKey; at: string } }
  | { kind: 'holiday'; next?: { day: DayKey; at: string } }
  | { kind: 'unknown' };

/** 한국 시간 기준 현재 진료 상태 */
export function getOpenState(schedule: Schedule, now = new Date()): OpenState {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Seoul',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const dayIdx = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  const minutes = (Number(get('hour')) % 24) * 60 + Number(get('minute'));
  const today = schedule[KEYS[dayIdx]];

  const findNext = (includeToday: boolean) => {
    for (let i = includeToday ? 0 : 1; i <= 7; i++) {
      const key = KEYS[(dayIdx + i) % 7];
      const d = schedule[key];
      // 진료시간이 미확정인 날을 건너뛰고 그다음 날을 안내하면 오해를 부르므로 안내를 생략한다
      if (d === null) return undefined;
      if (Array.isArray(d) && (i > 0 || minutes < toMin(d[0]))) return { day: key, at: d[0] };
    }
    return undefined;
  };

  if (today === null) return { kind: 'unknown' };
  if (today === 'closed') return { kind: 'holiday', next: findNext(false) };
  const [open, close] = today.map(toMin);
  const [ls, le] = schedule.lunch.map(toMin);
  // 점심시간은 진료시간 안에 온전히 들어오는 날에만 적용한다.
  // 토요일(09:00–13:00)은 게시된 진료시간표대로 13:00까지 이어서 진료하는 것으로 본다.
  const lunchInside = ls >= open && le <= close;
  if (minutes < open) return { kind: 'closed', next: findNext(true) };
  if (minutes >= close) return { kind: 'closed', next: findNext(false) };
  if (lunchInside && minutes >= ls && minutes < le) return { kind: 'lunch', until: schedule.lunch[1] };
  return { kind: 'open', until: lunchInside && minutes < ls ? schedule.lunch[0] : today[1] };
}
