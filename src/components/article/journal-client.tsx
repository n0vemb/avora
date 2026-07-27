"use client"

import { useState } from 'react'
import { PageLayout } from '@/components/layout/page-layout'
import { SimpleHero } from '@/components/hero/simple-hero'
import { ArticleGrid } from '@/components/article/article-card'
import { CTASection } from '@/components/cta/cta-section'
import { Container } from '@/components/layout/container'
import type { ArticleCardData } from '@/types/article'
import type { PageHeroData } from '@/features/strapi/fetchers'

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'buying-guides', label: 'Buying Guides' },
  { key: 'fitment-guides', label: 'Fitment Guides' },
  { key: 'wheel-technology', label: 'Wheel Technology' },
  { key: 'vehicle-guides', label: 'Vehicle Guides' },
  { key: 'industry-news', label: 'Industry News' },
  { key: 'product-releases', label: 'Product Releases' },
  { key: 'brand-stories', label: 'Brand Stories' },
  { key: 'events', label: 'Events' },
] as const

interface JournalClientProps {
  articles: ArticleCardData[]
  pageHero: PageHeroData
}

export function JournalClient({ articles, pageHero }: JournalClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const filtered = activeCategory === 'all'
    ? articles
    : articles.filter((a) => a.category === activeCategory)

  return (
    <PageLayout>
      <SimpleHero 
        sub={pageHero.heroSub}
        heading={pageHero.heroHeading}
        description={pageHero.heroDescription}
        backgroundImage={pageHero.heroBackgroundImage}
        height={pageHero.heroHeight}
      />

      <section className="bg-[var(--bg-base)] py-16 md:py-24 xl:py-32">
        <Container>
          <div className="mb-12 flex flex-wrap justify-center gap-2 md:mb-16 xl:mb-20">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.key
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-[var(--duration-fast)] [font-family:var(--font-body),sans-serif] ${
                    isActive
                      ? 'bg-[var(--text-primary)] text-[var(--text-inverse)]'
                      : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-default)] hover:border-[var(--border-strong)]'
                  }`}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>

          {filtered.length > 0 ? (
            <ArticleGrid articles={filtered} />
          ) : (
            <p className="text-center text-[var(--text-muted)] [font-family:var(--font-body),sans-serif]">
              No articles in this category yet. Check back soon.
            </p>
          )}
        </Container>
      </section>

      <CTASection
        heading="Ready to Build Your Wheels?"
        ctas={[
          { label: 'Explore All Wheels', description: 'Browse our full catalog of forged wheel collections.', href: '/wheels', variant: 'primary' },
          { label: 'Request a Custom Quote', description: 'Tell us about your vehicle and we\'ll create a personalized quote.', href: '/contact', variant: 'secondary' },
        ]}
      />
    </PageLayout>
  )
}
