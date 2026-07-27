import { JournalClient } from '@/components/article/journal-client'
import { getAllArticles, getPageHero, type PageHeroData } from '@/features/strapi/fetchers'
import type { ArticleCardData } from '@/types/article'

const FALLBACK_DATA: ArticleCardData[] = [
  {
    slug: 'best-forged-wheels-bmw-m3-2025',
    title: 'Best Forged Wheels for BMW M3 2025',
    category: 'buying-guides',
    categoryLabel: 'BUYING GUIDES',
    coverImage: { src: '/hero-placeholder.jpg', alt: 'Best Forged Wheels for BMW M3 2025', width: 1200, height: 675 },
    readTime: 6,
    href: '/journal/buying-guides/best-forged-wheels-bmw-m3-2025',
  },
  {
    slug: 'complete-fitment-guide-tesla-model-y',
    title: 'Complete Fitment Guide for Tesla Model Y',
    category: 'fitment-guides',
    categoryLabel: 'FITMENT GUIDES',
    coverImage: { src: '/hero-placeholder.jpg', alt: 'Complete Fitment Guide for Tesla Model Y', width: 1200, height: 675 },
    readTime: 8,
    href: '/journal/fitment-guides/complete-fitment-guide-tesla-model-y',
  },
  {
    slug: 'monoblock-vs-2-piece-forged-wheels',
    title: 'Monoblock vs 2-Piece Forged Wheels',
    category: 'wheel-technology',
    categoryLabel: 'WHEEL TECHNOLOGY',
    coverImage: { src: '/hero-placeholder.jpg', alt: 'Monoblock vs 2-Piece Forged Wheels', width: 1200, height: 675 },
    readTime: 5,
    href: '/journal/wheel-technology/monoblock-vs-2-piece-forged-wheels',
  },
  {
    slug: 'porsche-911-992-wheel-guide',
    title: 'Ultimate Wheel Guide for Porsche 911 992',
    category: 'vehicle-guides',
    categoryLabel: 'VEHICLE GUIDES',
    coverImage: { src: '/hero-placeholder.jpg', alt: 'Ultimate Wheel Guide for Porsche 911 992', width: 1200, height: 675 },
    readTime: 7,
    href: '/journal/vehicle-guides/porsche-911-992-wheel-guide',
  },
  {
    slug: 'forged-wheel-industry-trends-2025',
    title: 'Forged Wheel Industry Trends 2025',
    category: 'industry-news',
    categoryLabel: 'INDUSTRY NEWS',
    coverImage: { src: '/hero-placeholder.jpg', alt: 'Forged Wheel Industry Trends 2025', width: 1200, height: 675 },
    readTime: 4,
    href: '/journal/industry-news/forged-wheel-industry-trends-2025',
  },
  {
    slug: 'avora-volt-af-10-launch',
    title: 'Introducing the VOLT AF-10 — Our Flagship Performance Wheel',
    category: 'product-releases',
    categoryLabel: 'PRODUCT RELEASES',
    coverImage: { src: '/hero-placeholder.jpg', alt: 'AVORA VOLT AF-10 Launch', width: 1200, height: 675 },
    readTime: 3,
    href: '/journal/product-releases/avora-volt-af-10-launch',
  },
  {
    slug: 'the-avora-story',
    title: 'The AVORA Story — From Garage to Global Brand',
    category: 'brand-stories',
    categoryLabel: 'BRAND STORIES',
    coverImage: { src: '/hero-placeholder.jpg', alt: 'The AVORA Story', width: 1200, height: 675 },
    readTime: 9,
    href: '/journal/brand-stories/the-avora-story',
  },
  {
    slug: 'sema-show-2025-recap',
    title: 'SEMA Show 2025 Recap — Highlights from the Show Floor',
    category: 'events',
    categoryLabel: 'EVENTS',
    coverImage: { src: '/hero-placeholder.jpg', alt: 'SEMA Show 2025 Recap', width: 1200, height: 675 },
    readTime: 5,
    href: '/journal/events/sema-show-2025-recap',
  },
  {
    slug: 'how-to-choose-wheel-offset',
    title: 'How to Choose the Right Wheel Offset (ET)',
    category: 'fitment-guides',
    categoryLabel: 'FITMENT GUIDES',
    coverImage: { src: '/hero-placeholder.jpg', alt: 'How to Choose Wheel Offset', width: 1200, height: 675 },
    readTime: 6,
    href: '/journal/fitment-guides/how-to-choose-wheel-offset',
  },
  {
    slug: 'aerospace-aluminum-6061-t6-explained',
    title: 'Why 6061-T6 Aluminum Is the Gold Standard for Forged Wheels',
    category: 'wheel-technology',
    categoryLabel: 'WHEEL TECHNOLOGY',
    coverImage: { src: '/hero-placeholder.jpg', alt: '6061-T6 Aerospace Aluminum Explained', width: 1200, height: 675 },
    readTime: 7,
    href: '/journal/wheel-technology/aerospace-aluminum-6061-t6-explained',
  },
  {
    slug: 'audi-rs6-avant-wheel-upgrade-guide',
    title: 'Audi RS6 Avant — The Ultimate Wheel Upgrade Guide',
    category: 'vehicle-guides',
    categoryLabel: 'VEHICLE GUIDES',
    coverImage: { src: '/hero-placeholder.jpg', alt: 'Audi RS6 Avant Wheel Upgrade Guide', width: 1200, height: 675 },
    readTime: 8,
    href: '/journal/vehicle-guides/audi-rs6-avant-wheel-upgrade-guide',
  },
  {
    slug: 'custom-ral-color-finishes',
    title: 'Custom RAL Color Finishes — Make Your Wheels Truly Yours',
    category: 'buying-guides',
    categoryLabel: 'BUYING GUIDES',
    coverImage: { src: '/hero-placeholder.jpg', alt: 'Custom RAL Color Finishes', width: 1200, height: 675 },
    readTime: 5,
    href: '/journal/buying-guides/custom-ral-color-finishes',
  },
]

const FALLBACK_HERO: PageHeroData = {
  pageSlug: 'journal',
  pageTitle: 'AVORA Journal',
  heroSub: 'INSPIRED',
  heroHeading: 'THE JOURNAL.',
  heroDescription: 'Expert buying guides, technical deep-dives, fitment advice, and brand stories — written for enthusiasts who demand more from their wheels.',
}

async function getData() {
  const [articles, pageHero] = await Promise.all([
    getAllArticles().catch(() => FALLBACK_DATA),
    getPageHero('journal').catch(() => null),
  ])
  return { articles, pageHero: pageHero || FALLBACK_HERO }
}

export default async function JournalPage() {
  const { articles: allArticles, pageHero } = await getData()

  return <JournalClient articles={allArticles} pageHero={pageHero} />
}
