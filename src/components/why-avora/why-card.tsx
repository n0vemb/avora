'use client'

import { motion } from 'framer-motion'
import type { WhyReason } from '@/types/homepage'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

// Dynamic icon renderer — maps iconName to Lucide component
import {
  Hammer,
  Gauge,
  Settings2,
  Palette,
  Globe,
  Timer,
  type LucideIcon,
} from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
  Hammer,
  Gauge,
  Settings2,
  Palette,
  Globe,
  Timer,
}

interface WhyCardProps {
  reason: WhyReason
}

export function WhyCard({ reason }: WhyCardProps) {
  const Icon = reason.iconName ? ICON_MAP[reason.iconName] ?? Settings2 : Settings2

  return (
    <div className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-[var(--border-default)] bg-[var(--bg-card)] p-6 transition-shadow duration-[var(--duration-default)] hover:border-[var(--border-strong)] md:p-8">
      {/* Icon */}
      <Icon className="mb-1 h-6 w-6 text-[var(--text-secondary)]" strokeWidth={1.5} />

      {/* Number */}
      <span className="text-[clamp(2rem,2.5vw,2.5rem)] font-bold leading-none text-[var(--border-default)] [font-family:var(--font-mono),monospace]">
        {reason.number}
      </span>

      {/* Title */}
      <h4 className="text-lg font-semibold text-[var(--text-primary)] [font-family:var(--font-display),sans-serif] md:text-xl">
        {reason.title}
      </h4>

      {/* Description */}
      <p className="text-sm leading-relaxed text-[var(--text-secondary)] [font-family:var(--font-body),sans-serif] md:text-base">
        {reason.description}
      </p>
    </div>
  )
}

// ---- Grid ----

interface WhyGridProps {
  reasons: WhyReason[]
}

export function WhyGrid({ reasons }: WhyGridProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 xl:gap-8">
        {reasons.map((r) => (
          <WhyCard key={r.id} reason={r} />
        ))}
      </div>
    )
  }

  return (
    <motion.div
      className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 xl:gap-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
    >
      {reasons.map((r) => (
        <motion.div
          key={r.id}
          variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <WhyCard reason={r} />
        </motion.div>
      ))}
    </motion.div>
  )
}
