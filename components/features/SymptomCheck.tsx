'use client';

import Link from 'next/link';
import { AnimatePresence, motion, LayoutGroup } from 'framer-motion';
import { useMemo, useState } from 'react';
import { EASE } from '../motion/ease';
import { IconCheck, IconArrow } from '../icons';
import { savePrefill } from '@/lib/prefill';

type Group = { axis: string; label: string; color: string; symptoms: { id: string; text: string }[] };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = { data: any; careTitles: Record<string, string> };

export default function SymptomCheck({ data, careTitles }: Props) {
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const groups: Group[] = data.groups;
  const r = data.result;

  const toggle = (id: string) =>
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const ranked = useMemo(
    () =>
      groups
        .map((g) => ({
          ...g,
          count: g.symptoms.filter((s) => picked.has(s.id)).length,
          picked: g.symptoms.filter((s) => picked.has(s.id)).map((s) => s.text),
        }))
        .filter((g) => g.count > 0)
        .sort((a, b) => b.count / b.symptoms.length - a.count / a.symptoms.length),
    [groups, picked],
  );

  const summary = ranked.flatMap((g) => g.picked).join(', ');

  return (
    <LayoutGroup>
      <div className="check">
        {groups.map((g) => (
          <fieldset key={g.axis} className={`check-group ${g.color}`}>
            <legend>{g.label}</legend>
            <div className="check-list">
              {g.symptoms.map((s) => {
                const on = picked.has(s.id);
                return (
                  <motion.button
                    type="button"
                    key={s.id}
                    className="check-item"
                    aria-pressed={on}
                    onClick={() => toggle(s.id)}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="check-box" aria-hidden>
                      <AnimatePresence>
                        {on && (
                          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: 'spring', stiffness: 500, damping: 24 }}>
                            <IconCheck />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                    {s.text}
                  </motion.button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <motion.div layout className="check-result" aria-live="polite" transition={{ duration: 0.5, ease: EASE }}>
        <h2>{r.title}</h2>
        <AnimatePresence mode="popLayout">
          {ranked.length === 0 ? (
            <motion.p key="none" className="lead" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {r.none}
            </motion.p>
          ) : (
            ranked.map((g, i) => (
              <motion.div
                layout
                key={g.axis}
                className={`check-card ${g.color}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <small>{i === 0 ? r.primary : r.also}</small>
                <h3>{careTitles[g.axis]}</h3>
                <div className="meter" aria-hidden>
                  <motion.span animate={{ scaleX: g.count / g.symptoms.length }} transition={{ duration: 0.6, ease: EASE }} />
                </div>
                <p>
                  {g.count}
                  {r.count} · {g.picked.join(' · ')}
                </p>
                <div className="check-links">
                  <Link href={`/care/${g.axis}`} className="more">
                    {r.careLink}
                    <IconArrow />
                  </Link>
                  {g.axis === 'sleep' && (
                    <Link href="/check/sleep" className="more">
                      {r.sleepLink}
                      <IconArrow />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
        {ranked.length > 0 && (
          <motion.div layout className="check-actions">
            <Link className="btn dark" href="/reservation#helper" onClick={() => savePrefill({ symptom: summary })}>
              {r.reserve}
            </Link>
            <button type="button" className="btn ghost" onClick={() => setPicked(new Set())}>
              {r.reset}
            </button>
          </motion.div>
        )}
        <p className="disclaimer">{data.disclaimer}</p>
      </motion.div>
    </LayoutGroup>
  );
}
