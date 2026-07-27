import { MediaData, SeoData } from './common'

export interface SpecRow {
  id: number
  label: string
  value: string
}

export interface Finish {
  id: number
  name: string
  colorCode: string
  previewImage?: MediaData
  images?: MediaData[]
  price?: number
}

export interface FaqItem {
  id: number
  question: string
  answer: string
}

export interface ProductDetail {
  id: number
  slug: string
  name: string
  sku: string
  collection: Collection
  tagline?: string
  description?: string
  specifications: SpecRow[]
  finishes: Finish[]
  gallery: MediaData[]
  videos?: MediaData[]
  fitment?: Vehicle[]
  downloads?: Download[]
  faq: FaqItem[]
  seo: SeoData
  featured: boolean
  status: 'draft' | 'published' | 'archived'
  launchDate?: string
}

export interface ProductCard {
  slug: string
  name: string
  collection: { slug: string; name: string; accentColor?: string }
  tagline?: string
  thumbnail: MediaData
  diameterRange: string
}

export interface ProductCardData {
  slug: string
  name: string
  collection?: { slug: string; name: string; accentColor: string }
  diameterRange: string
  thumbnail: MediaData
  href: string
}

export interface FeaturedProductsSectionProps {
  heading: string
  subheading: string
  products: ProductCardData[]
  ctaLabel: string
  ctaHref: string
}

export interface Download {
  id: number
  name: string
  url: string
  size?: string
}

export interface StrapiProductAttributes {
  slug: string
  name: string
  sku: string
  collection: { data: { attributes: StrapiCollectionAttributes } }
  tagline?: string
  description?: string
  specifications: SpecRow[]
  finishes: Finish[]
  gallery: { data: StrapiImage[] }
  videos?: { data: StrapiImage[] }
  fitment?: { data: { attributes: StrapiVehicleAttributes }[] }
  downloads?: Download[]
  faq: FaqItem[]
  seo: SeoData
  featured: boolean
  status: 'draft' | 'published' | 'archived'
  launchDate?: string
}

import type { StrapiImage } from './strapi'
import type { Collection, StrapiCollectionAttributes } from './collection'
import type { Vehicle, StrapiVehicleAttributes } from './vehicle'