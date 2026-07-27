import { Container } from '@/components/layout/container'
import { SectionHeader } from '@/components/layout/section-header'
import { SectionCTA } from '@/components/layout/section-cta'
import { GalleryGrid } from '@/components/gallery/gallery-grid'

export interface GalleryCardData {
  slug: string
  image: { src: string; alt: string; width: number; height: number }
  vehicleYear: number; vehicleBrand: string; vehicleModel: string
  wheelName: string; wheelFinish: string; wheelSize: string
  href?: string
}

export interface VehicleGallerySectionProps {
  builds: GalleryCardData[]
}

export function VehicleGallerySection({ builds }: VehicleGallerySectionProps) {
  return (
    <section className="bg-[var(--bg-base)] py-16 md:py-24 xl:py-32">
      <Container>
        <SectionHeader
          heading="AF-10 on the Street"
          subheading="See AVORA AF-10 wheels on the world\'s most exciting builds around the world."
        />
        <GalleryGrid items={builds} limit={8} />
        <SectionCTA label="View All Builds →" href="#" />
      </Container>
    </section>
  );
}
