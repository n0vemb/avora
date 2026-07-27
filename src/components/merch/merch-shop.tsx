'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { MerchProduct } from '@/features/strapi/fetchers'

interface MerchShopProps {
  products: MerchProduct[]
  fallbackProducts: MerchProduct[]
}

const categoryLabels: Record<string, string> = {
  apparel: 'Apparel',
  hardware: 'Hardware',
  accessories: 'Accessories',
}

const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'OS']

const availableColors = [
  { id: 'black', label: 'Black', hex: '#1a1a1a' },
  { id: 'white', label: 'White', hex: '#ffffff' },
  { id: 'gray', label: 'Gray', hex: '#888888' },
  { id: 'red', label: 'Red', hex: '#e54973' },
  { id: 'blue', label: 'Blue', hex: '#3b82f6' },
  { id: 'gold', label: 'Gold', hex: '#d4af37' },
]

export function MerchShop({ products, fallbackProducts }: MerchShopProps) {
  const sourceProducts = products.length > 0 ? products : fallbackProducts
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [sortBy, setSortBy] = useState<string>('default')

  const priceMin = useMemo(() => Math.min(...sourceProducts.map(p => p.price)), [sourceProducts])
  const priceMax = useMemo(() => Math.max(...sourceProducts.map(p => p.price)), [sourceProducts])

  const filteredProducts = useMemo(() => {
    let result = [...sourceProducts]

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory)
    }

    if (selectedSize) {
      result = result.filter((p) => p.sizes.includes(selectedSize))
    }

    if (selectedColors.length > 0) {
      result = result.filter((p) => {
        const productColor = p.name.toLowerCase()
        return selectedColors.some(color => productColor.includes(color))
      })
    }

    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    }

    return result
  }, [sourceProducts, selectedCategory, selectedSize, selectedColors, priceRange, sortBy])

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: sourceProducts.length }
    for (const product of sourceProducts) {
      counts[product.category] = (counts[product.category] || 0) + 1
    }
    return counts
  }, [sourceProducts])

  const availableSizes = useMemo(() => {
    const sizes = new Set<string>()
    for (const product of sourceProducts) {
      for (const size of product.sizes) {
        sizes.add(size)
      }
    }
    return Array.from(sizes)
  }, [sourceProducts])

  const toggleColor = (colorId: string) => {
    setSelectedColors(prev => 
      prev.includes(colorId) 
        ? prev.filter(c => c !== colorId)
        : [...prev, colorId]
    )
  }

  const isFilterActive = selectedCategory !== 'all' || selectedSize || selectedColors.length > 0 || priceRange[0] > 0 || priceRange[1] < 500

  return (
    <section style={{ padding: '80px 0' }}>
      <div className="container">
        <div className="merch-layout">
          <aside className="merch-sidebar">
            <div className="merch-sidebar-header">
              <h3 className="merch-sidebar-title">Filters</h3>
              {isFilterActive && (
                <button 
                  className="merch-clear-all"
                  onClick={() => {
                    setSelectedCategory('all')
                    setSelectedSize(null)
                    setSelectedColors([])
                    setPriceRange([0, 500])
                  }}
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="filter-group">
              <div className="filter-header">
                <h4 className="filter-title">Category</h4>
              </div>
              <nav className="filter-nav">
                <button
                  className={`filter-item ${selectedCategory === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('all')}
                >
                  <span>All Products</span>
                  <span className="filter-count">{categoryCounts.all || 0}</span>
                </button>
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <button
                    key={key}
                    className={`filter-item ${selectedCategory === key ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(key)}
                  >
                    <span>{label}</span>
                    <span className="filter-count">{categoryCounts[key] || 0}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="filter-group">
              <div className="filter-header">
                <h4 className="filter-title">Size</h4>
              </div>
              <div className="size-grid">
                {allSizes.map((size) => {
                  const isAvailable = availableSizes.includes(size)
                  return (
                    <button
                      key={size}
                      className={`size-chip ${selectedSize === size ? 'active' : ''} ${!isAvailable ? 'disabled' : ''}`}
                      onClick={() => isAvailable && setSelectedSize(selectedSize === size ? null : size)}
                      disabled={!isAvailable}
                    >
                      {size}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="filter-group">
              <div className="filter-header">
                <h4 className="filter-title">Color</h4>
              </div>
              <div className="color-grid">
                {availableColors.map((color) => (
                  <button
                    key={color.id}
                    className={`color-chip ${selectedColors.includes(color.id) ? 'active' : ''}`}
                    onClick={() => toggleColor(color.id)}
                    title={color.label}
                    style={{ backgroundColor: color.hex }}
                  >
                    {selectedColors.includes(color.id) && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <div className="filter-header">
                <h4 className="filter-title">Price</h4>
                <span className="filter-value">${priceRange[0]} - ${priceRange[1]}</span>
              </div>
              <div className="price-slider-container">
                <input
                  type="range"
                  min={priceMin}
                  max={priceMax}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="price-slider"
                />
              </div>
              <div className="price-range-labels">
                <span>${priceMin}</span>
                <span>${priceMax}</span>
              </div>
            </div>
          </aside>

          <main className="merch-main">
            <div className="merch-toolbar">
              <div className="merch-count">
                <span className="merch-count-label">
                  {selectedCategory === 'all' ? 'All Products' : categoryLabels[selectedCategory] || selectedCategory}
                </span>
                <span className="merch-count-num">({filteredProducts.length})</span>
              </div>
              <div className="merch-sort">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="default">Sort: Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A-Z</option>
                </select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="merch-empty">
                <p>No products found. Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="merch-grid">
                {filteredProducts.map((product) => (
                  <Link key={product.slug} href={`/merch/${product.slug}`} className="merch-card">
                    <div className="merch-card-image">
                      <img src={product.image.src} alt={product.image.alt} />
                      {product.featured && <span className="merch-badge">Featured</span>}
                    </div>
                    <div className="merch-card-content">
                      <small className="merch-card-category">{categoryLabels[product.category] || product.category}</small>
                      <h3 className="merch-card-name">{product.name}</h3>
                      <span className="merch-card-price">${product.price}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  )
}
