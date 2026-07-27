import { Container } from '@/components/layout/container'
import { SectionHeader } from '@/components/layout/section-header'
import { SectionCTA } from '@/components/layout/section-cta'
import { GalleryGrid } from '@/components/gallery/gallery-grid'
import type { GallerySectionProps } from '@/types/gallery'

export function GallerySection({ heading, subheading, items, ctaLabel, ctaHref }: GallerySectionProps) {
  return (
    <section aria-label="Vehicle Gallery" className="bg-[var(--bg-base)] py-16 md:py-24 xl:py-32">
      <Container>
        <SectionHeader heading={heading} subheading={subheading} />
        <GalleryGrid items={items} limit={8} />
        <SectionCTA label={ctaLabel} href={ctaHref} />
      </Container>
    </section>
  )
}
