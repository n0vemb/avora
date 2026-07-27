'use client'

import { useState, useCallback } from 'react'
import { ProductHeader } from '@/components/product/product-header'
import { ProductImageGallery } from '@/components/product/product-image-gallery'
import { ProductFinishes } from '@/components/product/product-finishes'
import { ProductPricing } from '@/components/product/product-pricing'
import { ProductActions } from '@/components/product/product-actions'

interface ProductPageClientProps {
  breadcrumbs: { label: string; href: string }[]
  name: string
  tagline: string
  description: string
  basePrice: number
  sizes: { diameter: string; price: number; available: boolean }[]
  finishes: { name: string; colorCode?: string; price?: number; images?: { src: string; alt: string; width: number; height: number }[] }[]
  defaultImages: { src: string; alt: string; width: number; height: number }[]
}

export function ProductPageClient({
  breadcrumbs,
  name,
  tagline,
  description,
  basePrice,
  sizes,
  finishes,
  defaultImages,
}: ProductPageClientProps) {
  const [selectedFinish, setSelectedFinish] = useState(finishes[0] || null)

  const handleFinishChange = useCallback((finish: typeof finishes[0]) => {
    setSelectedFinish(finish)
  }, [])

  const currentImages = selectedFinish?.images?.length
    ? selectedFinish.images
    : defaultImages

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start">
      <div className="w-full md:w-1/2">
        <ProductImageGallery images={currentImages} />
      </div>

      <div className="w-full md:w-1/2">
        <ProductHeader
          breadcrumbs={breadcrumbs}
          name={name}
          tagline={tagline}
          description={description}
        />

        <div className="space-y-6">
          <ProductFinishes
            finishes={finishes}
            onChange={handleFinishChange}
          />

          <ProductPricing
            basePrice={basePrice}
            sizes={sizes}
            selectedFinishPrice={selectedFinish?.price || 0}
          />

          <ProductActions
            productName={name}
          />
        </div>
      </div>
    </div>
  )
}
