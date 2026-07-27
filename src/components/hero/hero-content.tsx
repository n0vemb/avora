'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { EASING, DURATION } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface HeroContentProps {
  heading: string
  subheading: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
}

function CtaLink({
  href,
  variant,
  children,
}: {
  href: string
  variant: 'primary' | 'secondary'
  children: React.ReactNode
}) {
  const base = 'inline-flex h-14 items-center justify-center rounded-none px-10 text-sm font-bold tracking-wider uppercase transition-all duration-[var(--duration-fast)]'
  const variants = {
    primary: `${base} bg-pink-400 text-white hover:bg-pink-500 active:scale-[0.98]`,
    secondary: `${base} border-2 border-white bg-transparent text-white hover:bg-white hover:text-black active:scale-[0.98]`,
  }
  return (
    <Link href={href} className={variants[variant]}>
      {children}
    </Link>
  )
}

export function HeroContent({ heading, subheading, primaryCta, secondaryCta }: HeroContentProps) {
  const prefersReducedMotion = useReducedMotion()

  const content = (
    <div className="flex flex-col gap-6 text-left">
      <span className="text-sm font-bold tracking-[0.3em] text-pink-400 uppercase">Wheels for her</span>
      <h1 className="text-[clamp(3rem,8vw,7rem)] font-black leading-[0.9] tracking-[0.05em] text-white [font-family:var(--font-display),sans-serif]">
        {heading}
      </h1>
      <p className="text-lg leading-relaxed text-gray-300 [font-family:var(--font-body),sans-serif] max-w-md">
        {subheading}
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <CtaLink href={primaryCta.href} variant="primary">
          {primaryCta.label}
        </CtaLink>
        <CtaLink href={secondaryCta.href} variant="secondary">
          {secondaryCta.label}
        </CtaLink>
      </div>
    </div>
  )

  if (prefersReducedMotion) return content

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
      }}
      className="flex flex-col gap-6 text-left"
    >
      <motion.span
        className="text-sm font-bold tracking-[0.3em] text-pink-400 uppercase"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: DURATION.luxury, ease: EASING.luxury, delay: 0.1 } },
        }}
      >
        Wheels for her
      </motion.span>

      <motion.h1
        className="text-[clamp(3rem,8vw,7rem)] font-black leading-[0.9] tracking-[0.05em] text-white [font-family:var(--font-display),sans-serif]"
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: DURATION.cinematic, ease: EASING.luxury, delay: 0.2 } },
        }}
      >
        {heading}
      </motion.h1>

      <motion.p
        className="text-lg leading-relaxed text-gray-300 [font-family:var(--font-body),sans-serif] max-w-md"
        variants={{
          hidden: { opacity: 0, y: 24 },
          visible: { opacity: 1, y: 0, transition: { duration: DURATION.luxury, ease: EASING.luxury, delay: 0.4 } },
        }}
      >
        {subheading}
      </motion.p>

      <motion.div
        className="mt-8 flex flex-col gap-4 sm:flex-row"
        variants={{
          hidden: { opacity: 0, y: 24 },
          visible: { opacity: 1, y: 0, transition: { duration: DURATION.luxury, ease: EASING.luxury, delay: 0.6 } },
        }}
      >
        <CtaLink href={primaryCta.href} variant="primary">
          {primaryCta.label}
        </CtaLink>
        <CtaLink href={secondaryCta.href} variant="secondary">
          {secondaryCta.label}
        </CtaLink>
      </motion.div>
    </motion.div>
  )
}
