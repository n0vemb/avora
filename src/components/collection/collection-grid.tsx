import { CollectionCard } from '@/components/collection/collection-card'
import type { CollectionCardData } from '@/types/collection'

interface CollectionGridProps {
  collections: CollectionCardData[]
}

export function CollectionGrid({ collections }: CollectionGridProps) {
  return (
    <div className="collections-grid">
      {collections.map((c) => (
        <CollectionCard key={c.slug} collection={c} />
      ))}
    </div>
  )
}
