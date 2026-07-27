import { Container } from '@/components/layout/container'
import { SectionHeader } from '@/components/layout/section-header'
import { SectionCTA } from '@/components/layout/section-cta'
import { ManufacturingTimeline } from '@/components/manufacturing/manufacturing-timeline'
import type { ManufacturingSectionProps } from '@/types/homepage'

export function ManufacturingSection({
  heading,
  subheading,
  steps,
  ctaLabel,
  ctaHref,
}: ManufacturingSectionProps) {
  return (
    <section aria-label="Manufacturing Process" className="bg-[var(--bg-base)] py-16 md:py-24 xl:py-32">
      <Container>
        {heading && <SectionHeader heading={heading} subheading={subheading} />}
        <ManufacturingTimeline steps={steps} />
        {ctaLabel && ctaHref && <SectionCTA label={ctaLabel} href={ctaHref} />}
      </Container>
    </section>
  )
}
