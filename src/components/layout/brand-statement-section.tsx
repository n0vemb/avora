'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface BrandStatementSectionProps {
  quote: string
  body: string
}

export function BrandStatementSection({ quote, body }: BrandStatementSectionProps) {
  const prefersReducedMotion = useReducedMotion()

  const content = (
    <div className="mx-auto max-w-[800px] px-5 text-center md:px-10">
      <blockquote className="text-[clamp(1.75rem,3vw,3rem)] font-bold leading-[1.15] text-[var(--text-primary)] [font-family:var(--font-display),sans-serif]">
        {quote}
      </blockquote>
      <hr className="mx-auto my-8 w-[100px] border-[var(--border-default)]" />
      <p className="text-[clamp(1rem,1.125vw,1.25rem)] leading-relaxed text-[var(--text-secondary)] [font-family:var(--font-body),sans-serif]">
        {body}
      </p>
    </div>
  )

  if (prefersReducedMotion) {
    return (
      <section aria-label="Brand Statement" className="bg-[var(--bg-base)] py-16 md:py-24 xl:py-32">
        {content}
      </section>
    )
  }

  return (
    <section aria-label="Brand Statement" className="bg-[var(--bg-base)] py-16 md:py-24 xl:py-32">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {content}
      </motion.div>
    </section>
  )
}
