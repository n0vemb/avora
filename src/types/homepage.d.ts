// Homepage types — phased expansion as modules are built

import type { CtaLink, HeroImageData } from './common'

export interface HeroProps {
  heading: string; subheading: string
  primaryCta: CtaLink; secondaryCta: CtaLink
  image: HeroImageData
  backgroundImage?: { src: string; alt: string; width: number; height: number }
  height?: number
}

// ---- Wheels Specific ----

export interface WheelsHeroProps {
  heading: string; subheading: string
  primaryCta: CtaLink; secondaryCta: CtaLink
  image: HeroImageData
}
export interface WheelsFeaturedProductsProps {
  heading: string; subheading: string; ctaLabel: string; ctaHref: string
}
export interface WheelsCTAProps {
  heading: string; ctas: CtaLink[]
}

// ---- Manufacturing ----

export interface ManufacturingStep {
  id: number; number: string; title: string; description: string
  image: { src: string; alt: string; width: number; height: number }
}
export interface ManufacturingSectionProps {
  heading?: string; subheading?: string; steps: ManufacturingStep[]
  ctaLabel?: string; ctaHref?: string
}

// ---- Why AVORA ----

export interface WhyReason {
  id?: number; number?: string; title: string; description: string
  iconName?: string
}
export interface WhyAvoraSectionProps {
  heading: string; subheading: string; reasons: WhyReason[]
}

// ---- Brand Statement ----

export interface BrandStatementProps {
  quote: string
  body: string
}

// ---- CTA Section ----

export interface CTALink {
  label: string
  description: string
  href: string
  variant: 'primary' | 'secondary'
}

export interface CTASectionProps {
  heading: string
  description?: string
  ctas: CTALink[]
}
