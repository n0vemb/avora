'use client'

import { motion } from 'framer-motion'
import { GalleryCard } from '@/components/gallery/gallery-card'
import type { GalleryCardData } from '@/types/gallery'

interface GalleryGridProps {
  items: GalleryCardData[]
  limit?: number
}

export function GalleryGrid({ items, limit = 8 }: GalleryGridProps) {
  const displayItems = items.slice(0, limit)

  return (
    <div className="merch-grid" style={{ gap: '30px' }}>
      {displayItems.map((item, index) => (
        <motion.div
          key={item.slug}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: index * 0.08 }}
        >
          <GalleryCard item={item} />
        </motion.div>
      ))}
    </div>
  )
}
