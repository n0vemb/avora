'use client'

import { useState, useMemo } from 'react'

export interface SizeOption {
  diameter: string
  price: number
  available: boolean
}

export interface ProductPricingProps {
  basePrice: number
  sizes: SizeOption[]
  selectedFinishPrice?: number
}

export function ProductPricing({ basePrice, sizes, selectedFinishPrice = 0 }: ProductPricingProps) {
  const [selectedSize, setSelectedSize] = useState(0)

  const availableSizes = sizes.filter(s => s.available)

  if (availableSizes.length === 0) {
    return (
      <div className="py-4">
        <p className="text-[var(--text-muted)]">Currently unavailable</p>
      </div>
    )
  }

  const currentSize = availableSizes[selectedSize]
  const totalPrice = useMemo(() => {
    return basePrice + (currentSize?.price || 0) + selectedFinishPrice
  }, [basePrice, currentSize?.price, selectedFinishPrice])

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
          Size (Diameter)
        </label>
        <div className="flex flex-wrap gap-2">
          {availableSizes.map((size, index) => (
            <button
              key={index}
              onClick={() => setSelectedSize(index)}
              className={`w-16 h-16 rounded-lg border transition-all text-sm font-semibold ${
                selectedSize === index
                  ? 'border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)]'
                  : 'border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
              }`}
            >
              {size.diameter}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
          ${totalPrice.toLocaleString()}
        </span>
        <span className="text-sm text-[var(--text-muted)]">per wheel</span>
      </div>

      {(currentSize?.price || selectedFinishPrice) > 0 && (
        <div className="text-xs text-[var(--text-muted)] space-y-1">
          {currentSize?.price > 0 && (
            <p>{currentSize.diameter} premium: +${currentSize.price}</p>
          )}
          {selectedFinishPrice > 0 && (
            <p>Finish premium: +${selectedFinishPrice}</p>
          )}
        </div>
      )}
    </div>
  )
}
