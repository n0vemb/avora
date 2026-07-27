'use client'

import { motion } from 'framer-motion'
import { OptimizedImage } from '@/components/media/optimized-image'
import { Container } from '@/components/layout/container'
import { SectionHeader } from '@/components/layout/section-header'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import type { ManufacturingStep } from '@/types/homepage'

interface ManufacturingDetailProps {
  heading?: string
  subheading?: string
  steps: ManufacturingStep[]
}

export function ManufacturingDetail({ heading, subheading, steps }: ManufacturingDetailProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="bg-[var(--bg-base)] py-16 md:py-24 xl:py-32">
      <Container>
        {heading && <SectionHeader heading={heading} subheading={subheading} />}

        <div className="flex flex-col gap-20 md:gap-28 xl:gap-36">
          {steps.map((step, i) => {
            const reversed = i % 2 === 1

            const imageBlock = (
              <div className="overflow-hidden rounded-[var(--radius-card)]">
                <OptimizedImage
                  src={step.image.src}
                  alt={step.image.alt}
                  width={step.image.width}
                  height={step.image.height}
                  sizes="(max-width: 1279px) 100vw, 50vw"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            )

            const textBlock = (
              <div className="flex flex-col justify-center">
                <span className="text-sm font-bold tracking-[0.15em] text-[var(--text-muted)] [font-family:var(--font-mono),monospace]">
                  STEP {step.number}
                </span>
                <h3 className="mt-3 text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-[1.15] text-[var(--text-primary)] [font-family:var(--font-display),sans-serif]">
                  {step.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)] [font-family:var(--font-body),sans-serif] md:text-lg">
                  {step.description}
                </p>
              </div>
            )

            if (prefersReducedMotion) {
              return (
                <div
                  key={step.id}
                  className={`flex flex-col items-center gap-10 xl:flex-row xl:gap-20 ${reversed ? 'xl:flex-row-reverse' : ''}`}
                >
                  <div className="w-full xl:w-1/2">{imageBlock}</div>
                  <div className="w-full xl:w-1/2">{textBlock}</div>
                </div>
              )
            }

            return (
              <motion.div
                key={step.id}
                className={`flex flex-col items-center gap-10 xl:flex-row xl:gap-20 ${reversed ? 'xl:flex-row-reverse' : ''}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.15 } },
                }}
              >
                <motion.div
                  className="w-full xl:w-1/2"
                  variants={{
                    hidden: { opacity: 0, x: reversed ? 40 : -40 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  {imageBlock}
                </motion.div>
                <motion.div
                  className="w-full xl:w-1/2"
                  variants={{
                    hidden: { opacity: 0, x: reversed ? -40 : 40 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  {textBlock}
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
