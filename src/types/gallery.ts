import { MediaData } from './common'

export interface GalleryItem {
  slug: string
  vehicle: Vehicle
  wheelModel: ProductCard
  wheelFinish: string
  wheelSize: string
  images: MediaData[]
  videos?: MediaData[]
  buildNotes?: string
  tags: string[]
  featured: boolean
  seo: SeoData
}

export interface GalleryCardData {
  slug: string
  image: MediaData
  vehicleYear: number
  vehicleBrand: string
  vehicleModel: string
  wheelName: string
  wheelFinish: string
  wheelSize: string
  href?: string
}

export interface GallerySectionProps {
  heading: string
  subheading: string
  items: GalleryCardData[]
  ctaLabel: string
  ctaHref: string
}

export interface StrapiGalleryItemAttributes {
  slug: string
  vehicle: { data: { attributes: StrapiVehicleAttributes } }
  wheelModel: { data: { attributes: { name: string; collection: { data: { attributes: { name: string } } } } } }
  wheelFinish: string
  wheelSize: string
  images: { data: StrapiImage[] }
  videos?: { data: StrapiImage[] }
  buildNotes?: string
  tags: string[]
  featured: boolean
  seo: SeoData
}

import type { StrapiImage } from './strapi'
import type { Vehicle, StrapiVehicleAttributes } from './vehicle'
import type { ProductCard } from './product'
import type { SeoData } from './common'