import Link from 'next/link'
import { OptimizedImage } from '@/components/media/optimized-image'
import type { ProductCardData } from '@/types/product'

interface ProductCardProps {
  product: ProductCardData
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={product.href}
      className="product"
    >
      <div className="product-image">
        <OptimizedImage
          src={product.thumbnail.src}
          alt={product.thumbnail.alt}
          width={product.thumbnail.width}
          height={product.thumbnail.height}
          className="w-[85%]"
        />
      </div>
      <div className="product-content">
        <div className="product-category">
          {product.collection?.name || 'Forged Series'}
        </div>
        <div className="product-title">
          {product.name}
        </div>
        <div className="product-price">
          From $699
        </div>
        <div className="colors">
          <span className="c1"></span>
          <span className="c2"></span>
          <span className="c3"></span>
        </div>
      </div>
    </Link>
  )
}
