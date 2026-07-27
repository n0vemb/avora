import { Container } from '@/components/layout/container'
import { SectionHeader } from '@/components/layout/section-header'
import { SectionCTA } from '@/components/layout/section-cta'
import { ProductGallery } from '@/components/product/product-gallery'

export interface ProductGallerySectionProps {
  images: Array<{ src: string; alt: string; width: number; height: number }>
}

export function ProductGallerySection({ images }: ProductGallerySectionProps) {
  return (
    <section className="bg-[var(--bg-base)] py-16 md:py-24 xl:py-32">
      <Container>
        <SectionHeader
          heading="Product Gallery"
          subheading="Discover every detail of the AVORA AF-10 — from the main view to the finest specifications."
        />
        <ProductGallery images={images} />
        <SectionCTA label="Download Spec Sheet (PDF) ↓" href="#" />
      </Container>
    </section>
  );
}
