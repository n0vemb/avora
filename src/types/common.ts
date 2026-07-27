export interface MediaData {
  src: string
  alt: string
  width: number
  height: number
}

export interface SeoData {
  metaTitle: string
  metaDescription: string
  keywords?: string
  ogImage?: MediaData
  canonicalUrl?: string
}

export interface CtaLink {
  label: string
  href: string
  variant?: 'primary' | 'secondary' | 'ghost'
}

export interface HeroImageData {
  src: string
  alt: string
  width: number
  height: number
  srcMobile?: string
}