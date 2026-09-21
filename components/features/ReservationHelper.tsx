'use client';

import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { takePrefill } from '@/lib/prefill';
import { EASE } from '../motion/ease';

/** 서버 없이 동작: 입력값으로 카카오톡에 붙여 넣을 메시지를 만들어 복사한다 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ReservationHelper({ t, kakaoUrl }: { t: any; kakaoUrl: string }) {
  const [name, setName] = useState('');
  const [type, setType] = useState(0);
  const [symptom, setSymptom] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState(2);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const p = takePrefill();
    if (p?.symptom) setSymptom(p.symptom);
    if (typeof p?.type === 'number') setType(p.type);
  }, []);

  const message = useMemo(() => {
    const lines = [t.template.greeting];
    if (name) lines.push(`${t.template.name}: ${name}`);
    lines.push(`${t.template.type}: ${t.types[type]}`);
    if (symptom) lines.push(`${t.template.symptom}: ${symptom}`);
    if (date) lines.push(`${t.template.date}: ${date} ${t.times[time]}`);
    return lines.join('\n');
  }, [t, name, type, symptom, date, time]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 4000);
    } catch {}
  };

  return (
    <div className="helper" id="helper">
      <div className="helper-form">
        <h2>{t.title}</h2>
        <p className="lead">{t.lead}</p>
        <label>
          {t.name}
          <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        </label>
        <div className="field">
          <span>{t.type}</span>
          <div className="seg" role="radiogroup" aria-label={t.type}>
            {t.types.map((x: string, i: number) => (
              <button type="button" role="radio" aria-checked={type === i} key={x} onClick={() => setType(i)}>
                {type === i && <motion.i layoutId="seg-type" transition={{ duration: 0.35, ease: EASE }} />}
                <span>{x}</span>
              </button>
            ))}
          </div>
        </div>
        <label>
          {t.symptom}
          <textarea rows={3} value={symptom} placeholder={t.symptomPlaceholder} onChange={(e) => setSymptom(e.target.value)} />
        </label>
        <div className="helper-row">
          <label>
            {t.date}
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
          <div className="field">
            <span>{t.time}</span>
            <div className="seg" role="radiogroup" aria-label={t.time}>
              {t.times.map((x: string, i: number) => (
                <button type="button" role="radio" aria-checked={time === i} key={x} onClick={() => setTime(i)}>
                  {time === i && <motion.i layoutId="seg-time" transition={{ duration: 0.35, ease: EASE }} />}
                  <span>{x}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="helper-preview">
        <small>{t.preview}</small>
        <motion.pre key={message} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }}>
          {message}
        </motion.pre>
        <div className="quiz-actions">
          <button type="button" className="btn dark" onClick={copy}>
            {t.copy}
          </button>
          <a className="btn ghost" href={kakaoUrl} target="_blank" rel="noopener">
            {t.open}
          </a>
        </div>
        <p className="helper-toast" aria-live="polite">
          {copied ? t.copied : ''}
        </p>
      </div>
    </div>
  );
}
