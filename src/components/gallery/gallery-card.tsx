'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { OptimizedImage } from '@/components/media/optimized-image'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import type { GalleryCardData } from '@/types/gallery'

interface GalleryCardProps {
  item: GalleryCardData
}

export function GalleryCard({ item }: GalleryCardProps) {
  const prefersReducedMotion = useReducedMotion()

  const inner = (
    <>
      <div className="merch-card-image" style={{ height: '280px' }}>
        <OptimizedImage
          src={item.image.src}
          alt={item.image.alt}
          width={item.image.width}
          height={item.image.height}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="merch-card-content">
        <small className="merch-card-category">
          {item.vehicleYear} {item.vehicleBrand} {item.vehicleModel}
        </small>
        <h3 className="merch-card-name">{item.wheelName}</h3>
        <div className="mt-2 text-sm font-medium text-gray-500 uppercase tracking-wider">
          {item.wheelFinish} &middot; {item.wheelSize}
        </div>
      </div>
    </>
  )

  const card = item.href ? (
    <Link href={item.href} className="merch-card group">
      {inner}
    </Link>
  ) : (
    <div className="merch-card group">
      {inner}
    </div>
  )

  if (prefersReducedMotion) return card

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="w-full"
    >
      {card}
    </motion.div>
  )
}
