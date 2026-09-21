'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { SurgeryStep } from '@/lib/content';

export default function SurgerySteps({
  steps,
  color,
}: {
  steps: SurgeryStep[];
  color: 'sage' | 'sky';
}) {
  const reduce = useReducedMotion();
  const dotColor = color === 'sky' ? 'var(--sky-deep)' : 'var(--sage-deep)';

  return (
    <div className="steps">
      {steps.map((step, i) => (
        <div className="step" key={step.label}>
          <motion.span
            aria-hidden
            style={{
              position: 'absolute',
              left: '50%',
              top: 4,
              width: 11,
              height: 11,
              borderRadius: '50%',
              translateX: '-50%',
              border: '1.5px solid var(--ink-2)',
              background: 'var(--cream)',
            }}
            initial={reduce ? false : { backgroundColor: 'var(--cream)', borderColor: 'var(--ink-2)' }}
            whileInView={{ backgroundColor: dotColor, borderColor: dotColor }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, delay: (i * 250) / 1000 }}
          />
          <b>{step.label}</b>
          {step.detail}
        </div>
      ))}
    </div>
  );
}
