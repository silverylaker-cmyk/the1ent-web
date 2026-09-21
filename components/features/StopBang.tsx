'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { EASE } from '../motion/ease';
import { savePrefill } from '@/lib/prefill';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function StopBang({ data }: { data: any }) {
  const qs: { id: string; title: string; text: string; bmi?: boolean }[] = data.questions;
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [h, setH] = useState('');
  const [w, setW] = useState('');
  const done = step >= qs.length;
  const score = Object.values(answers).filter(Boolean).length;
  const level = data.levels.find((l: { max: number }) => score <= l.max);
  const bmi = Number(h) > 0 && Number(w) > 0 ? Number(w) / (Number(h) / 100) ** 2 : null;

  const answer = (v: boolean) => {
    setAnswers((a) => ({ ...a, [qs[step].id]: v }));
    setDir(1);
    setStep((s) => s + 1);
  };
  const back = () => {
    setDir(-1);
    setStep((s) => Math.max(0, s - 1));
  };
  const reset = () => {
    setAnswers({});
    setDir(-1);
    setStep(0);
  };

  return (
    <div className="quiz">
      <div className="quiz-bar" role="progressbar" aria-label={data.progress} aria-valuemin={0} aria-valuemax={qs.length} aria-valuenow={Math.min(step, qs.length)}>
        <motion.span animate={{ scaleX: Math.min(step, qs.length) / qs.length }} transition={{ duration: 0.5, ease: EASE }} />
      </div>
      <div className="quiz-letters" aria-hidden>
        {qs.map((q, i) => (
          <motion.b
            key={q.id}
            animate={{
              backgroundColor: answers[q.id] && i < step ? 'var(--sky-deep)' : 'rgba(0,0,0,0)',
              color: answers[q.id] && i < step ? '#fff' : i === step ? 'var(--ink)' : 'var(--ink-2)',
              scale: i === step ? 1.15 : 1,
            }}
          >
            {q.id}
          </motion.b>
        ))}
      </div>

      <div className="quiz-stage">
        <AnimatePresence mode="wait" custom={dir}>
          {!done ? (
            <motion.div
              key={step}
              className="quiz-card"
              custom={dir}
              initial={{ opacity: 0, x: 60 * dir, rotate: 1.5 * dir }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              exit={{ opacity: 0, x: -60 * dir, rotate: -1.5 * dir }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <small>
                {data.progress} {step + 1} / {qs.length} · {qs[step].title}
              </small>
              <h2>{qs[step].text}</h2>
              {qs[step].bmi && (
                <details className="bmi">
                  <summary>{data.bmi.toggle}</summary>
                  <div className="bmi-row">
                    <label>
                      {data.bmi.height}
                      <input inputMode="decimal" value={h} onChange={(e) => setH(e.target.value)} />
                    </label>
                    <label>
                      {data.bmi.weight}
                      <input inputMode="decimal" value={w} onChange={(e) => setW(e.target.value)} />
                    </label>
                    <output>
                      {data.bmi.result} <b>{bmi ? bmi.toFixed(1) : '–'}</b>
                    </output>
                  </div>
                </details>
              )}
              <div className="quiz-actions">
                <button type="button" className="btn dark" onClick={() => answer(true)}>
                  {data.yes}
                </button>
                <button type="button" className="btn ghost" onClick={() => answer(false)}>
                  {data.no}
                </button>
                {step > 0 && (
                  <button type="button" className="quiz-back" onClick={back}>
                    {data.prev}
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              className={`quiz-card result ${level.key}`}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE }}
              aria-live="polite"
            >
              <small>{data.result.title}</small>
              <div className="gauge">
                <svg viewBox="0 0 120 120" aria-hidden>
                  <circle cx="60" cy="60" r="52" className="gauge-track" />
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="52"
                    className="gauge-fill"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: score / 8 }}
                    transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
                  />
                </svg>
                <div>
                  <b>{score}</b>
                  <span>{data.result.of}</span>
                </div>
              </div>
              <h2>{level.label}</h2>
              <p>{level.body}</p>
              <div className="quiz-actions">
                <Link className="btn dark" href="/surgery/psg">
                  {data.result.psg}
                </Link>
                <Link className="btn ghost" href="/reservation#helper"
                  onClick={() => savePrefill({ type: 2, symptom: `STOP-BANG ${score}${data.result.score}` })}
                >
                  {data.result.reserve}
                </Link>
                <button type="button" className="quiz-back" onClick={reset}>
                  {data.result.reset}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p className="disclaimer">
        {data.disclaimer}
        <br />
        {data.source}
      </p>
    </div>
  );
}
