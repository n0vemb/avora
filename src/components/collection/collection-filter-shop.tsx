'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { CollectionProduct } from '@/features/strapi/fetchers'

interface CollectionFilterShopProps {
  products: CollectionProduct[]
  accentColor: string
  collectionName: string
}

export function CollectionFilterShop({ products, accentColor, collectionName }: CollectionFilterShopProps) {
  const [selectedDiameter, setSelectedDiameter] = useState<string>('all')
  const [selectedFinishes, setSelectedFinishes] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<string>('default')

  const allDiameters = useMemo(() => {
    const sizes = new Set<string>()
    for (const product of products) {
      const diameterSpec = product.specifications.find(
        (s) => s.label.toLowerCase() === 'diameter'
      )
      if (diameterSpec?.value) {
        const range = diameterSpec.value
        const matches = range.match(/\d+/g)
        if (matches) {
          matches.forEach((m) => sizes.add(m + '"'))
        }
      }
    }
    return Array.from(sizes).sort((a, b) => parseInt(a) - parseInt(b))
  }, [products])

  const allFinishes = useMemo(() => {
    const finishMap = new Map<string, { name: string; colorCode?: string }>()
    for (const product of products) {
      for (const finish of product.finishes) {
        if (!finishMap.has(finish.name)) {
          finishMap.set(finish.name, { name: finish.name, colorCode: finish.colorCode })
        }
      }
    }
    return Array.from(finishMap.values())
  }, [products])

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (selectedDiameter !== 'all') {
      const sizeNum = parseInt(selectedDiameter)
      result = result.filter((p) => {
        const diameterSpec = p.specifications.find(
          (s) => s.label.toLowerCase() === 'diameter'
        )
        if (!diameterSpec?.value) return false
        const matches = diameterSpec.value.match(/\d+/g)
        if (!matches) return false
        const nums = matches.map(Number)
        return sizeNum >= nums[0] && sizeNum <= nums[nums.length - 1]
      })
    }

    if (selectedFinishes.length > 0) {
      result = result.filter((p) =>
        p.finishes.some((f) => selectedFinishes.includes(f.name))
      )
    }

    if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === 'name-desc') {
      result.sort((a, b) => b.name.localeCompare(a.name))
    }

    return result
  }, [products, selectedDiameter, selectedFinishes, sortBy])

  const toggleFinish = (name: string) => {
    setSelectedFinishes((prev) =>
      prev.includes(name) ? prev.filter((f) => f !== name) : [...prev, name]
    )
  }

  const isFilterActive = selectedDiameter !== 'all' || selectedFinishes.length > 0

  const clearFilters = () => {
    setSelectedDiameter('all')
    setSelectedFinishes([])
  }

  return (
    <section style={{ padding: '80px 0 120px 0' }}>
      <div className="container">
        <div className="merch-layout">
          <aside className="merch-sidebar">
            <div className="merch-sidebar-header">
              <h3 className="merch-sidebar-title">Filters</h3>
              {isFilterActive && (
                <button className="merch-clear-all" onClick={clearFilters}>
                  Clear All
                </button>
              )}
            </div>

            <div className="filter-group">
              <div className="filter-header">
                <h4 className="filter-title">Diameter</h4>
              </div>
              <nav className="filter-nav">
                <button
                  className={`filter-item ${selectedDiameter === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedDiameter('all')}
                >
                  <span>All Sizes</span>
                  <span className="filter-count">{products.length}</span>
                </button>
                {allDiameters.map((size) => {
                  const count = products.filter((p) => {
                    const diameterSpec = p.specifications.find(
                      (s) => s.label.toLowerCase() === 'diameter'
                    )
                    if (!diameterSpec?.value) return false
                    const matches = diameterSpec.value.match(/\d+/g)
                    if (!matches) return false
                    const nums = matches.map(Number)
                    const sizeNum = parseInt(size)
                    return sizeNum >= nums[0] && sizeNum <= nums[nums.length - 1]
                  }).length
                  return (
                    <button
                      key={size}
                      className={`filter-item ${selectedDiameter === size ? 'active' : ''}`}
                      onClick={() => setSelectedDiameter(size)}
                    >
                      <span>{size}</span>
                      <span className="filter-count">{count}</span>
                    </button>
                  )
                })}
              </nav>
            </div>

            {allFinishes.length > 0 && (
              <div className="filter-group">
                <div className="filter-header">
                  <h4 className="filter-title">Finish</h4>
                  {selectedFinishes.length > 0 && (
                    <span className="filter-value">{selectedFinishes.length} selected</span>
                  )}
                </div>
                <div className="size-grid" style={{ gridTemplateColumns: `repeat(${Math.min(allFinishes.length, 4)}, 1fr)` }}>
                  {allFinishes.map((finish) => (
                    <button
                      key={finish.name}
                      className={`size-chip ${selectedFinishes.includes(finish.name) ? 'active' : ''}`}
                      onClick={() => toggleFinish(finish.name)}
                      title={finish.name}
                      style={{
                        fontSize: '10px',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {finish.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </aside>

          <main className="merch-main">
            <div className="merch-toolbar">
              <div className="merch-count">
                <span className="merch-count-label">
                  {collectionName} Wheels
                </span>
                <span className="merch-count-num">({filteredProducts.length})</span>
              </div>
              <div className="merch-sort">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="default">Sort: Default</option>
                  <option value="name">Name: A-Z</option>
                  <option value="name-desc">Name: Z-A</option>
                </select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '80px 0',
                  color: '#999',
                }}
              >
                <p style={{ fontSize: '16px', marginBottom: '16px' }}>
                  No wheels match your filters.
                </p>
                <button
                  onClick={clearFilters}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#111',
                    fontWeight: 600,
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <Link key={product.slug} href={product.href} className="product">
                    <div className="product-image">
                      <img src={product.thumbnail.src} alt={product.thumbnail.alt} />
                    </div>
                    <div className="product-content">
                      <div className="product-category" style={{ color: accentColor }}>
                        {collectionName}
                      </div>
                      <h3 className="product-title">{product.name}</h3>
                      <div className="product-price">{product.diameterRange}</div>
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
