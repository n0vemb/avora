import { MediaData, SeoData } from './common'

export interface Collection {
  slug: string
  name: string
  tagline: string
  accentColor?: string
  description?: string
  heroImage: MediaData
  heroVideo?: MediaData
  coverImage: MediaData
  products: { id: number; slug: string; name: string }[]
  seo: SeoData
  sortOrder: number
}

export interface CollectionCardData {
  slug: string
  name: string
  tagline: string
  accentColor: string
  coverImage: MediaData
  href: string
}

export interface CollectionsSectionProps {
  heading: string
  subheading: string
  collections: CollectionCardData[]
}

export interface StrapiCollectionAttributes {
  slug: string
  name: string
  tagline: string
  accentColor?: string
  description?: string
  heroImage: { data: StrapiImage }
  heroVideo?: { data: StrapiImage }
  coverImage: { data: StrapiImage }
  products: { data: { id: number }[] }
  seo: SeoData
  sortOrder: number
}

import type { StrapiImage } from './strapi'