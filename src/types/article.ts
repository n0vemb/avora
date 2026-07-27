import { MediaData, SeoData } from './common'

export type ArticleCategory =
  | 'buying-guides'
  | 'fitment-guides'
  | 'wheel-technology'
  | 'vehicle-guides'
  | 'industry-news'
  | 'product-releases'
  | 'brand-stories'
  | 'events'

export interface Article {
  slug: string
  title: string
  excerpt: string
  coverImage: MediaData
  category: ArticleCategory
  content: string
  tags: string[]
  authorName: string
  authorAvatar?: MediaData
  readTime: number
  publishDate: string
  featured: boolean
  seo: SeoData
}

export interface ArticleCardData {
  slug: string
  title: string
  category: ArticleCategory | string
  categoryLabel: string
  coverImage: MediaData
  readTime: number
  href: string
}

export interface JournalSectionProps {
  heading: string
  subheading: string
  articles: ArticleCardData[]
  ctaLabel?: string
  ctaHref?: string
}

export interface StrapiArticleAttributes {
  slug: string
  title: string
  excerpt: string
  coverImage: { data: StrapiImage }
  category: ArticleCategory
  content: string
  tags: string[]
  authorName: string
  authorAvatar?: { data: StrapiImage }
  readTime: number
  publishDate: string
  featured: boolean
  seo: SeoData
}

import type { StrapiImage } from './strapi'