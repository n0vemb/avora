'use client'

import { useState } from 'react'
import Link from 'next/link'

export interface ProductActionsProps {
  productName: string
}

export function ProductActions({ productName }: ProductActionsProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [shareMessage, setShareMessage] = useState('')

  const handleShare = async () => {
    const url = window.location.href
    const text = `Check out the ${productName} from AVORA Wheels`

    if (navigator.share) {
      try {
        await navigator.share({
          title: productName,
          text,
          url,
        })
      } catch (err) {
        setShareMessage('Share cancelled')
        setTimeout(() => setShareMessage(''), 2000)
      }
    } else {
      navigator.clipboard.writeText(url)
      setShareMessage('Link copied to clipboard!')
      setTimeout(() => setShareMessage(''), 2000)
    }
  }

  return (
    <div className="space-y-8">
      <Link href="/contact">
        <button className="w-full py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors mb-6">
          Request a Quote
        </button>
      </Link>

      <div className="flex gap-3">
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`flex-1 py-3 border rounded-lg transition-colors flex items-center justify-center gap-2 ${
            isWishlisted
              ? 'border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--border-strong)]'
              : 'border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
          }`}
        >
          <svg className="w-5 h-5" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {isWishlisted ? 'Added to Wishlist' : 'Add to Wishlist'}
        </button>

        <button
          onClick={handleShare}
          className="flex-1 py-3 border border-[var(--border-default)] rounded-lg text-[var(--text-secondary)] hover:border-[var(--border-strong)] transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share
        </button>
      </div>

      {shareMessage && (
        <p className="text-center text-sm text-[var(--border-strong)]">{shareMessage}</p>
      )}

      <Link href="/contact" className="block text-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm">
        Contact us for pricing and availability
      </Link>
    </div>
  )
}
