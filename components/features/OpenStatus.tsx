'use client';

import { useEffect, useState } from 'react';
import { getOpenState, type OpenState } from '@/lib/hours';
import type { Schedule } from '@/lib/content';

/** 진료시간 데이터로 계산한 실시간 진료 상태 배지 */
export default function OpenStatus({
  schedule,
  labels,
  days,
}: {
  schedule: Schedule;
  labels: Record<string, string>;
  days?: Record<string, string>;
}) {
  const [state, setState] = useState<OpenState | null>(null);

  useEffect(() => {
    const tick = () => setState(getOpenState(schedule));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [schedule]);

  if (!state) return <span className="status" data-kind="loading" />;

  let text = labels[state.kind];
  if (state.kind === 'open') text += ` · ${state.until}${labels.until}`;
  if (state.kind === 'lunch') text += ` · ${state.until} ${labels.reopen}`;
  if ((state.kind === 'closed' || state.kind === 'holiday') && state.next) {
    text += ` · ${labels.nextOpen} ${days ? `${days[state.next.day]} ` : ''}${state.next.at}`;
  }

  return (
    <span className="status" data-kind={state.kind} role="status">
      <i aria-hidden />
      {text}
    </span>
  );
}
