import Link from 'next/link'
import { OptimizedImage } from '@/components/media/optimized-image'
import type { CollectionCardData } from '@/types/collection'

interface CollectionCardProps {
  collection: CollectionCardData
}

export function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link
      href={collection.href}
      className="collection"
    >
      <OptimizedImage
        src={collection.coverImage.src}
        alt={collection.coverImage.alt}
        width={collection.coverImage.width}
        height={collection.coverImage.height}
        className="w-full h-full object-cover"
      />
      <div className="collection-info">
        <small>{collection.tagline.toUpperCase()}</small>
        <h3>{collection.name}</h3>
      </div>
    </Link>
  )
}
