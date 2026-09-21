'use client';

import { motion } from 'framer-motion';
import { EASE } from './motion/ease';
import type { SurgeryStep } from '@/lib/content';

export default function SurgerySteps({ steps, color }: { steps: SurgeryStep[]; color: 'sage' | 'sky' }) {
  const dotColor = color === 'sky' ? 'var(--sky-deep)' : 'var(--sage-deep)';

  return (
    <motion.div className="steps" initial="out" whileInView="in" viewport={{ once: true, amount: 0.6 }}>
      <motion.span
        className="steps-fill"
        aria-hidden
        style={{ background: dotColor }}
        variants={{ out: { scaleX: 0 }, in: { scaleX: 1 } }}
        transition={{ duration: 0.25 * steps.length + 0.3, ease: EASE }}
      />
      {steps.map((step, i) => (
        <div className="step" key={step.label}>
          <motion.span
            className="step-dot"
            aria-hidden
            variants={{
              out: { backgroundColor: 'var(--cream)', borderColor: 'var(--ink-2)', scale: 1 },
              in: { backgroundColor: dotColor, borderColor: dotColor, scale: [1, 1.5, 1] },
            }}
            transition={{ duration: 0.5, delay: i * 0.25 }}
          />
          <b>{step.label}</b>
          {step.detail}
        </div>
      ))}
    </motion.div>
  );
}
