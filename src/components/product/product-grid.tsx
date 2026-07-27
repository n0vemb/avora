import { ProductCard } from '@/components/product/product-card'
import type { ProductCardData } from '@/types/product'

interface ProductGridProps {
  products: ProductCardData[]
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="products-grid">
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  )
}
