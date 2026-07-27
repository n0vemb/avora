import { Container } from '@/components/layout/container'
import { CollectionGrid } from '@/components/collection/collection-grid'
import type { CollectionsSectionProps } from '@/types/collection'

export function CollectionsSection({ heading, subheading, collections }: CollectionsSectionProps) {
  return (
    <section className="collections">
      <Container>
        <div className="collections-title">
          <div className="hero-sub">OUR COLLECTIONS</div>
          <h2>{heading}</h2>
          <p style={{ maxWidth: '650px', margin: 'auto' }}>
            {subheading}
          </p>
        </div>
        <CollectionGrid collections={collections} />
      </Container>
    </section>
  )
}
