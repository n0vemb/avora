'use client'

import { motion } from 'framer-motion'
import { OptimizedImage } from '@/components/media/optimized-image'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import type { ManufacturingStep } from '@/types/homepage'

interface ManufacturingTimelineProps {
  steps: ManufacturingStep[]
}

export function ManufacturingTimeline({ steps }: ManufacturingTimelineProps) {
  const prefersReducedMotion = useReducedMotion()

  // ---- Desktop: horizontal timeline with step images ----
  const Desktop = () => (
    <motion.div
      className="hidden md:block"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
    >
      <div className="flex items-start gap-0">
        {steps.map((step, i) => (
          <motion.div
            key={step.id}
            className="flex flex-1 flex-col items-center"
            variants={
              prefersReducedMotion
                ? {}
                : { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }
            }
          >
            {/* Step image */}
            <div className="mb-5 w-full overflow-hidden rounded-[var(--radius-card)]">
              <OptimizedImage
                src={step.image.src}
                alt={step.image.alt}
                width={step.image.width}
                height={step.image.height}
                sizes="(max-width: 1279px) 25vw, 16vw"
                className="aspect-[4/3] object-cover"
              />
            </div>
            {/* Connector line */}
            <div className="flex w-full items-center">
              <div className={`h-px flex-1 ${i === 0 ? 'bg-transparent' : 'bg-[var(--border-default)]'}`} />
              <div className="mx-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--bg-card)]">
                <span className="text-xs font-bold text-[var(--text-muted)] [font-family:var(--font-mono),monospace]">
                  {step.number}
                </span>
              </div>
              <div className={`h-px flex-1 ${i === steps.length - 1 ? 'bg-transparent' : 'bg-[var(--border-default)]'}`} />
            </div>
            {/* Title + Description */}
            <div className="mt-4 text-center">
              <h4 className="text-base font-semibold text-[var(--text-primary)] [font-family:var(--font-display),sans-serif]">
                {step.title}
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)] [font-family:var(--font-body),sans-serif]">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )

  // ---- Mobile + Tablet: vertical list ----
  const Mobile = () => (
    <div className="md:hidden">
      <div className="flex flex-col gap-8">
        {steps.map((step, i) => (
          <div key={step.id} className="flex gap-4">
            {/* Left rail */}
            <div className="flex shrink-0 flex-col items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--bg-card)]">
                <span className="text-xs font-bold text-[var(--text-muted)] [font-family:var(--font-mono),monospace]">
                  {step.number}
                </span>
              </div>
              {i < steps.length - 1 && <div className="mt-2 h-full w-px bg-[var(--border-default)]" />}
            </div>
            {/* Content */}
            <div className="flex-1 pb-2">
              <OptimizedImage
                src={step.image.src}
                alt={step.image.alt}
                width={step.image.width}
                height={step.image.height}
                sizes="100vw"
                className="mb-3 aspect-[16/9] w-full rounded-[var(--radius-card)] object-cover"
              />
              <h4 className="text-base font-semibold text-[var(--text-primary)] [font-family:var(--font-display),sans-serif]">
                {step.title}
              </h4>
              <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)] [font-family:var(--font-body),sans-serif]">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <>
      <Desktop />
      <Mobile />
    </>
  )
}
