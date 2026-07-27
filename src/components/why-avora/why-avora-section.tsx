import { Container } from '@/components/layout/container'
import { SectionHeader } from '@/components/layout/section-header'
import { WhyGrid } from '@/components/why-avora/why-card'
import type { WhyAvoraSectionProps } from '@/types/homepage'

export function WhyAvoraSection({ heading, subheading, reasons }: WhyAvoraSectionProps) {
  return (
    <section aria-label="Why AVORA" className="bg-[var(--bg-surface)] py-16 md:py-24 xl:py-32">
      <Container>
        <SectionHeader heading={heading} subheading={subheading} />
        <WhyGrid reasons={reasons} />
      </Container>
    </section>
  )
}
