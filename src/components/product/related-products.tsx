import { Container } from '@/components/layout/container'
import { SectionHeader } from '@/components/layout/section-header'
import { SectionCTA } from '@/components/layout/section-cta'
import { ProductGrid } from '@/components/product/product-grid'

export interface RelatedProductsSectionProps {
  products: Array<{
    slug: string
    name: string
    diameterRange: string
    thumbnail: { src: string; alt: string; width: number; height: number }
    href: string
  }>
}

export function RelatedProductsSection({ products }: RelatedProductsSectionProps) {
  return (
    <section className="bg-[var(--bg-base)] py-16 md:py-24 xl:py-32">
      <Container>
        <SectionHeader
          heading="You May Also Like"
          subheading="Explore other AVORA wheels from the same collection with similar specifications and styles."
        />
        <ProductGrid products={products} />
      </Container>
    </section>
  )
}
