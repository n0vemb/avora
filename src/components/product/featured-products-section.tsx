import Link from 'next/link'
import { Container } from '@/components/layout/container'
import { ProductGrid } from '@/components/product/product-grid'
import type { FeaturedProductsSectionProps } from '@/types/product'

export function FeaturedProductsSection({
  heading,
  subheading,
  products,
  ctaLabel,
  ctaHref,
}: FeaturedProductsSectionProps) {
  return (
    <section className="products">
      <Container>
        <div className="products-header">
          <div>
            <div className="hero-sub">FEATURED WHEELS</div>
            <h2>{heading}</h2>
          </div>
          <Link href={ctaHref} className="btn btn-dark">
            {ctaLabel}
          </Link>
        </div>
        <ProductGrid products={products} />
      </Container>
    </section>
  )
}
