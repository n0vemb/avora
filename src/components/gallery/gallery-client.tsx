'use client'

import { useState, useMemo } from 'react'
import { PageLayout } from '@/components/layout/page-layout'
import { Container } from '@/components/layout/container'
import { GalleryGrid } from '@/components/gallery/gallery-grid'
import { SectionCTA } from '@/components/layout/section-cta'
import { SimpleHero } from '@/components/hero/simple-hero'
import type { GalleryCardData } from '@/types/gallery'
import type { PageHeroData } from '@/features/strapi/fetchers'

interface GalleryItemWithCollection extends GalleryCardData {
  collection?: string
}

interface GalleryClientProps {
  allBuilds: GalleryItemWithCollection[]
  collections: { slug: string; name: string; count: number }[]
  years: { label: string; value: string }[]
  brands: { label: string; value: string }[]
  pageHero: PageHeroData
}

const collectionLabels: Record<string, string> = {
  bloom: 'Bloom',
  calm: 'Calm',
  volt: 'Volt',
  terra: 'Terra',
  luxe: 'Luxe',
  cyber: 'Cyber',
}

export function GalleryClient({ allBuilds, collections, years, brands, pageHero }: GalleryClientProps) {
  const [selectedCollection, setSelectedCollection] = useState('all')
  const [selectedYear, setSelectedYear] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')

  const filteredItems = useMemo(() => {
    return allBuilds.filter(item => {
      const matchesCollection = selectedCollection === 'all' || item.collection === selectedCollection
      const matchesYear = !selectedYear || item.vehicleYear.toString() === selectedYear
      const matchesBrand = !selectedBrand || item.vehicleBrand === selectedBrand
      return matchesCollection && matchesYear && matchesBrand
    })
  }, [allBuilds, selectedCollection, selectedYear, selectedBrand])

  const isFilterActive = selectedCollection !== 'all' || !!selectedYear || !!selectedBrand

  const clearAll = () => {
    setSelectedCollection('all')
    setSelectedYear('')
    setSelectedBrand('')
  }

  return (
    <PageLayout>
      <SimpleHero
        sub={pageHero.heroSub}
        heading={pageHero.heroHeading}
        description={pageHero.heroDescription}
        backgroundImage={pageHero.heroBackgroundImage}
        height={pageHero.heroHeight}
      />

      <section style={{ padding: '80px 0' }}>
        <Container>
          <div className="merch-layout">
            <aside className="merch-sidebar">
              <div className="merch-sidebar-header">
                <h3 className="merch-sidebar-title">Filters</h3>
                {isFilterActive && (
                  <button className="merch-clear-all" onClick={clearAll}>
                    Clear All
                  </button>
                )}
              </div>

              <div className="filter-group">
                <div className="filter-header">
                  <h4 className="filter-title">Collection</h4>
                </div>
                <nav className="filter-nav">
                  {collections.map((collection) => (
                    <button
                      key={collection.slug}
                      className={`filter-item ${selectedCollection === collection.slug ? 'active' : ''}`}
                      onClick={() => setSelectedCollection(collection.slug)}
                    >
                      <span>{collection.name}</span>
                      <span className="filter-count">{collection.count}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="filter-group">
                <div className="filter-header">
                  <h4 className="filter-title">Year</h4>
                </div>
                <div className="size-grid">
                  {years.map((year) => (
                    <button
                      key={year.value || 'all'}
                      className={`size-chip ${selectedYear === year.value ? 'active' : ''}`}
                      onClick={() => setSelectedYear(selectedYear === year.value ? '' : year.value)}
                    >
                      {year.label === 'All Years' ? 'All' : year.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <div className="filter-header">
                  <h4 className="filter-title">Brand</h4>
                </div>
                <nav className="filter-nav">
                  {brands.map((brand) => (
                    <button
                      key={brand.value || 'all'}
                      className={`filter-item ${selectedBrand === brand.value ? 'active' : ''}`}
                      onClick={() => setSelectedBrand(selectedBrand === brand.value ? '' : brand.value)}
                    >
                      <span>{brand.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            <main className="merch-main">
              <div className="merch-toolbar">
                <div className="merch-count">
                  <span className="merch-count-label">
                    {selectedCollection === 'all'
                      ? 'All Builds'
                      : collectionLabels[selectedCollection] || selectedCollection}
                  </span>
                  <span className="merch-count-num">({filteredItems.length})</span>
                </div>
              </div>

              {filteredItems.length > 0 ? (
                <GalleryGrid items={filteredItems} limit={filteredItems.length} />
              ) : (
                <div className="merch-empty">
                  <p>No builds found. Try adjusting your filters.</p>
                </div>
              )}
            </main>
          </div>
        </Container>
      </section>

      <SectionCTA label="View All Wheels" href="/wheels" />
    </PageLayout>
  )
}
