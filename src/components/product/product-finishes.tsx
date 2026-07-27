'use client'

import { useState } from 'react'
import Image from 'next/image'

export interface FinishOption {
  name: string
  colorCode?: string
  price?: number
  previewImage?: { src: string; alt: string; width: number; height: number } | null
  images?: { src: string; alt: string; width: number; height: number }[]
}

export interface ProductFinishesProps {
  finishes: FinishOption[]
  onChange?: (finish: FinishOption, index: number) => void
}

export function ProductFinishes({ finishes, onChange }: ProductFinishesProps) {
  const [selectedFinish, setSelectedFinish] = useState(0)

  if (!finishes || finishes.length === 0) return null

  const handleSelect = (finish: FinishOption, index: number) => {
    setSelectedFinish(index)
    onChange?.(finish, index)
  }

  return (
    <div>
      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
        Color Options
      </label>
      <div className="flex flex-wrap gap-4">
        {finishes.map((finish, index) => {
          const previewImage = finish.previewImage || finish.images?.[0]
          return (
            <button
              key={index}
              onClick={() => handleSelect(finish, index)}
              className={`flex flex-col items-center p-1 transition-all relative ${
                selectedFinish === index ? '' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <div className="relative w-16 h-16 rounded-md overflow-hidden bg-[var(--bg-card)]">
                {previewImage ? (
                  <Image
                    src={previewImage.src}
                    alt={previewImage.alt}
                    fill
                    className="object-contain p-1"
                  />
                ) : finish.colorCode ? (
                  <div
                    className="w-full h-full"
                    style={{ backgroundColor: finish.colorCode }}
                  />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center text-xs text-[var(--text-muted)]">
                    {finish.name.substring(0, 2)}
                  </span>
                )}
              </div>
              {selectedFinish === index && (
                <div className="absolute bottom-0 w-12 h-0.5 bg-purple-600 rounded-full" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
