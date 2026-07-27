'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export interface ProductImage {
  src: string
  alt: string
  width: number
  height: number
}

export interface ProductImageGalleryProps {
  images: ProductImage[]
}

export function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    setActiveIndex(0)
  }, [images])

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-[var(--bg-card)] rounded-xl overflow-hidden flex items-center justify-center">
        <span className="text-[var(--text-muted)]">No images available</span>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="relative aspect-square bg-[var(--bg-card)] rounded-xl overflow-hidden">
        <Image
          src={images[activeIndex]?.src || '/hero-placeholder.jpg'}
          alt={images[activeIndex]?.alt || 'Product image'}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 40vw"
        />
      </div>

      {images.length > 1 && (
        <div className="grid gap-3 mt-4 grid-cols-3">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative aspect-square bg-[var(--bg-card)] rounded-xl overflow-hidden transition-all ${
                activeIndex === index
                  ? 'opacity-100'
                  : 'opacity-50 hover:opacity-80'
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-contain p-3"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
