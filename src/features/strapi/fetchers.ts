import { strapiFetch } from './client'
import type {
  StrapiCollectionResponse,
  StrapiSingleResponse,
} from '@/types/strapi'
import type {
  CollectionCardData,
  CollectionsSectionProps,
} from '@/types/collection'
import type {
  ProductCardData,
  FeaturedProductsSectionProps,
} from '@/types/product'
import type {
  GalleryCardData,
  GallerySectionProps,
} from '@/types/gallery'
import type {
  ArticleCardData,
  JournalSectionProps,
} from '@/types/article'
import type {
  WhyReason,
  ManufacturingStep,
  BrandStatementProps,
  HeroProps,
  CTASectionProps,
  WhyAvoraSectionProps,
  ManufacturingSectionProps,
} from '@/types/homepage'

function convertStrapiImage(image: { url: string; alternativeText?: string; width: number; height: number }): { src: string; alt: string; width: number; height: number } {
  const src = image.url.startsWith('/uploads/')
    ? `/api${image.url}`
    : image.url
  return {
    src,
    alt: image.alternativeText || '',
    width: image.width,
    height: image.height,
  }
}

export interface GlobalSettingsHero {
  sub: string
  heading: string
  subheading: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  images: { src: string; alt: string; width: number; height: number }[]
  backgroundImage?: { src: string; alt: string; width: number; height: number }
  height?: number
}

export async function getGlobalSettings(): Promise<{
  hero: GlobalSettingsHero
  brandStatement: BrandStatementProps
  features: { icon: string; title: string; description: string }[]
  aboutSection: { heading: string; subheading: string; description: string; buttonText: string; image: { src: string; alt: string; width: number; height: number } } | null
  whyAvora: WhyAvoraSectionProps
  finalCta: CTASectionProps
}> {
  const response = await strapiFetch<{
    data: {
      heroSection: {
        sub: string
        heading: string
        subheading: string
        primaryCtaLabel: string
        primaryCtaLink: string
        secondaryCtaLabel: string
        secondaryCtaLink: string
        heroImages: { url: string; alternativeText?: string; width: number; height: number }[] | null
        heroImageMobile: { url: string; alternativeText?: string; width: number; height: number } | null
        heroBackgroundImage: { url: string; alternativeText?: string; width: number; height: number } | null
        heroHeight: number
      }
      brandStatement: {
        quote: string
        body: string
      }
      features: {
        icon: string
        title: string
        description: string
        sortOrder: number
      }[]
      aboutSection: {
        heading: string
        subheading: string
        description: string
        buttonText: string
        image: { url: string; alternativeText?: string; width: number; height: number } | null
        video: { url: string } | null
      } | null
      whyAvoraReasons: {
        id: number
        icon: string
        title: string
        description: string
        sortOrder: number
      }[]
      finalCtas: {
        heading: string
        ctas: {
          label: string
          description: string
          href: string
          variant: 'primary' | 'secondary'
        }[]
      }
    } | null
  }>('/global-settings', { next: { revalidate: 0 } })

  const data = response.data

  if (!data) {
    return {
      hero: {
        sub: 'WHEEL AS IDENTITY',
        heading: 'FORGED<br/>FORWARD',
        subheading: 'Premium forged wheels engineered to fit every ride. Same precision as factory, endless possibilities in color and design. Make your vehicle uniquely yours.',
        primaryCta: { label: 'Explore Collection', href: '/wheels' },
        secondaryCta: { label: 'View Gallery', href: '/gallery' },
        images: [{ src: '/hero-placeholder.jpg', alt: 'AVORA Forged Wheel', width: 2560, height: 1440 }],
        backgroundImage: undefined,
        height: undefined,
      },
      brandStatement: {
        quote: '"We believe a wheel is not a component. It is a declaration."',
        body: 'AVORA forged wheels are built for those who see their vehicle as an extension of their identity.',
      },
      features: [],
      aboutSection: null,
      whyAvora: {
        heading: 'Why AVORA',
        subheading: 'Six reasons why enthusiasts choose us.',
        reasons: [],
      },
      finalCta: {
        heading: 'Ready to Elevate Your Vehicle Build?',
        description: undefined,
        ctas: [
          { label: 'Explore All Wheels', description: 'Browse our full forged wheel catalog.', href: '/wheels', variant: 'primary' },
          { label: 'Request a Quote', description: 'Get a custom quote for your specifications.', href: '/contact', variant: 'secondary' },
        ],
      },
    }
  }

  return {
    hero: {
      sub: data.heroSection.sub || '',
      heading: data.heroSection.heading || '',
      subheading: data.heroSection.subheading || '',
      primaryCta: {
        label: data.heroSection.primaryCtaLabel || '',
        href: data.heroSection.primaryCtaLink || '#',
      },
      secondaryCta: {
        label: data.heroSection.secondaryCtaLabel || '',
        href: data.heroSection.secondaryCtaLink || '#',
      },
      images: (data.heroSection.heroImages || []).map(img => convertStrapiImage(img)),
      backgroundImage: data.heroSection.heroBackgroundImage
        ? convertStrapiImage(data.heroSection.heroBackgroundImage)
        : undefined,
      height: data.heroSection.heroHeight || undefined,
    },
    brandStatement: data.brandStatement ? {
      quote: data.brandStatement.quote,
      body: data.brandStatement.body,
    } : {
      quote: '"We believe a wheel is not a component. It is a declaration."',
      body: 'AVORA forged wheels are built for those who see their vehicle as an extension of their identity.',
    },
    features: (data.features || []).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)).map((f) => ({
      icon: f.icon || '',
      title: f.title,
      description: f.description,
    })),
    aboutSection: data.aboutSection ? {
      heading: data.aboutSection.heading,
      subheading: data.aboutSection.subheading,
      description: data.aboutSection.description,
      buttonText: data.aboutSection.buttonText,
      image: data.aboutSection.image
        ? convertStrapiImage(data.aboutSection.image)
        : { src: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1400', alt: 'AVORA About', width: 1400, height: 900 },
    } : null,
    whyAvora: {
      heading: 'Why AVORA',
      subheading: 'Six reasons why enthusiasts choose us.',
      reasons: (data.whyAvoraReasons || [])
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((reason) => ({
          id: reason.id,
          number: String(reason.sortOrder).padStart(2, '0'),
          title: reason.title,
          description: reason.description,
          iconName: reason.icon,
        })),
    },
    finalCta: {
      heading: data.finalCtas?.heading || 'Ready to Elevate Your Vehicle Build?',
      description: (data.finalCtas as any)?.description || undefined,
      ctas: (data.finalCtas?.ctas || []).map((cta) => ({
        label: cta.label,
        description: cta.description,
        href: cta.href,
        variant: cta.variant,
      })),
    },
  }
}

export interface PageHeroData {
  pageSlug: string
  pageTitle: string
  heroSub: string
  heroHeading: string
  heroDescription: string
  heroBackgroundImage?: { src: string; alt: string; width: number; height: number }
  heroHeight?: number
}

export async function getPageHero(pageSlug: string): Promise<PageHeroData | null> {
  const response = await strapiFetch<{
    data: {
      id: number
      pageSlug: string
      pageTitle: string
      heroSub: string
      heroHeading: string
      heroDescription: string
      heroBackgroundImage: { url: string; alternativeText?: string; width: number; height: number } | null
      heroHeight: number | null
    }[]
  }>(`/page-heroes?filters[pageSlug][$eq]=${pageSlug}`)

  const data = response.data?.[0]

  if (!data) {
    return null
  }

  return {
    pageSlug: data.pageSlug,
    pageTitle: data.pageTitle,
    heroSub: data.heroSub,
    heroHeading: data.heroHeading,
    heroDescription: data.heroDescription,
    heroBackgroundImage: data.heroBackgroundImage
      ? convertStrapiImage(data.heroBackgroundImage)
      : undefined,
    heroHeight: data.heroHeight || undefined,
  }
}

export async function getCollections(): Promise<CollectionsSectionProps> {
  const response = await strapiFetch<{
    data: {
      id: number
      slug: string
      name: string
      tagline: string
      accentColor: string
      coverImage: { url: string; alternativeText?: string; width: number; height: number } | null
      sortOrder: number
    }[]
    meta: {}
  }>('/collections?populate=coverImage&sort=sortOrder:asc')

  const collections: CollectionCardData[] = response.data.map((item) => ({
    slug: item.slug,
    name: item.name,
    tagline: item.tagline,
    accentColor: item.accentColor,
    coverImage: item.coverImage ? convertStrapiImage(item.coverImage) : { src: '/hero-placeholder.jpg', alt: item.name, width: 800, height: 1067 },
    href: `/wheels/${item.slug}`,
  }))

  return {
    heading: 'Five Signature Series',
    subheading: 'Discover five distinctive forged wheel collections, each crafted with its own personality, performance philosophy and design language.',
    collections,
  }
}

export async function getNavCollections(): Promise<{
  slug: string
  name: string
  tagline: string
  accentColor: string
}[]> {
  const response = await strapiFetch<{
    data: {
      id: number
      slug: string
      name: string
      tagline: string
      accentColor: string
      sortOrder: number
    }[]
    meta: {}
  }>('/collections?sort=sortOrder:asc')

  return response.data.map((item) => ({
    slug: item.slug,
    name: item.name,
    tagline: item.tagline,
    accentColor: item.accentColor,
  }))
}

export async function getFeaturedProducts(): Promise<FeaturedProductsSectionProps> {
  const response = await strapiFetch<{
    data: {
      id: number
      slug: string
      name: string
      tagline?: string
      collection: { slug: string; name: string; accentColor: string } | null
      specifications: { label: string; value: string }[]
      gallery: { url: string; alternativeText?: string; width: number; height: number }[] | null
      featured: boolean
    }[]
    meta: {}
  }>('/products?filters[featured][$eq]=true&populate=collection,gallery&sort=createdAt:desc')

  const products: ProductCardData[] = response.data.map((item) => {
    const diameterSpec = (item.specifications || []).find(
      (spec) => spec.label.toLowerCase() === 'diameter'
    )
    const thumbnail = item.gallery?.[0]

    return {
      slug: item.slug,
      name: item.name,
      collection: item.collection ? {
        slug: item.collection.slug,
        name: item.collection.name,
        accentColor: item.collection.accentColor,
      } : { slug: '', name: '', accentColor: '#ffffff' },
      diameterRange: diameterSpec?.value || '',
      thumbnail: thumbnail ? convertStrapiImage(thumbnail) : { src: '/hero-placeholder.jpg', alt: item.name, width: 1200, height: 1200 },
      href: `/wheels/${item.collection?.slug || ''}/${item.slug}`,
    }
  })

  return {
    heading: 'Crafted To Perform',
    subheading: 'Precision engineered for maximum performance.',
    products,
    ctaLabel: 'View All',
    ctaHref: '/wheels',
  }
}

export async function getGalleryItems(limit = 8): Promise<GallerySectionProps> {
  const response = await strapiFetch<{
    data: {
      id: number
      slug: string
      vehicle: { data: { brand: string; model: string; generation?: string; yearFrom: number } } | null
      wheelModel: { data: { name: string; collection: { data: { name: string; slug: string } } } } | null
      wheelFinish: string
      wheelSize: string
      images: { url: string; alternativeText?: string; width: number; height: number }[] | null
      featured: boolean
    }[]
    meta: {}
  }>(`/gallery-items?pagination[limit]=${limit}&populate=vehicle,wheelModel,images&sort=createdAt:desc`)

  const items: GalleryCardData[] = response.data.map((item) => {
    const image = item.images?.[0]
    const vehicleAttrs = item.vehicle?.data
    const wheelAttrs = item.wheelModel?.data

    return {
      slug: item.slug,
      image: image ? convertStrapiImage(image) : { src: '/hero-placeholder.jpg', alt: '', width: 1600, height: 1200 },
      vehicleYear: vehicleAttrs?.yearFrom || 2024,
      vehicleBrand: vehicleAttrs?.brand || '',
      vehicleModel: vehicleAttrs?.generation
        ? `${vehicleAttrs.model} ${vehicleAttrs.generation}`
        : vehicleAttrs?.model || '',
      wheelName: wheelAttrs?.collection?.data ? `${wheelAttrs.collection.data.name} ${wheelAttrs.name}` : wheelAttrs?.name || '',
      wheelFinish: item.wheelFinish,
      wheelSize: item.wheelSize,
      href: `/gallery/${item.slug}`,
    }
  })

  return {
    heading: 'AVORA in the Wild',
    subheading: "See our wheels on the world's finest cars.",
    items,
    ctaLabel: 'View All Builds →',
    ctaHref: '/gallery',
  }
}

export async function getFeaturedArticles(limit = 3): Promise<JournalSectionProps> {
  const response = await strapiFetch<{
    data: {
      id: number
      slug: string
      title: string
      category: string
      coverImage: { url: string; alternativeText?: string; width: number; height: number } | null
      readTime: number
      publishDate: string
      featured: boolean
    }[]
    meta: {}
  }>(`/articles?filters[featured][$eq]=true&pagination[limit]=${limit}&populate=coverImage&sort=publishDate:desc`)

  const categoryLabels: Record<string, string> = {
    'buying-guides': 'BUYING GUIDES',
    'fitment-guides': 'FITMENT GUIDES',
    'wheel-technology': 'WHEEL TECHNOLOGY',
    'vehicle-guides': 'VEHICLE GUIDES',
    'industry-news': 'INDUSTRY NEWS',
    'product-releases': 'PRODUCT RELEASES',
    'brand-stories': 'BRAND STORIES',
    'events': 'EVENTS',
  }

  const articles: ArticleCardData[] = response.data.map((item) => {
    const image = item.coverImage

    return {
      slug: item.slug,
      title: item.title,
      category: item.category as any,
      categoryLabel: categoryLabels[item.category] || item.category.toUpperCase(),
      coverImage: image ? convertStrapiImage(image) : { src: '/hero-placeholder.jpg', alt: item.title, width: 1200, height: 675 },
      readTime: item.readTime,
      href: `/journal/${item.category}/${item.slug}`,
    }
  })

  return {
    heading: 'Stories Behind The Drive',
    subheading: 'JOURNAL',
    articles,
    ctaLabel: 'View All Articles',
    ctaHref: '/journal',
  }
}

export async function getManufacturingSteps(): Promise<ManufacturingSectionProps> {
  const response = await strapiFetch<{
    data: {
      manufacturingSteps: {
        id: number
        number: string
        title: string
        description: string
        image: { url: string; alternativeText?: string; width: number; height: number } | null
        sortOrder: number
      }[]
    } | null
  }>('/global-settings?populate=manufacturingSteps')

  const steps: ManufacturingStep[] = (response.data?.manufacturingSteps || [])
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((step) => ({
      id: step.id,
      number: step.number,
      title: step.title,
      description: step.description,
      image: step.image ? convertStrapiImage(step.image) : { src: '/hero-placeholder.jpg', alt: step.title, width: 1600, height: 900 },
    }))

  return {
    heading: 'Engineered Without Compromise.',
    subheading: 'From raw billet to finished wheel — six acts of precision.',
    steps,
    ctaLabel: 'Our Story →',
    ctaHref: '/about/manufacturing',
  }
}

export async function getHomePageData(): Promise<{
  hero: GlobalSettingsHero
  collections: CollectionsSectionProps
  features: { icon: string; title: string; description: string }[]
  about: { heading: string; subheading: string; description: string; buttonText: string; image: { src: string; alt: string; width: number; height: number } }
  featuredProducts: FeaturedProductsSectionProps
  journal: JournalSectionProps
  finalCta: CTASectionProps
}> {
  const [
    globalSettings,
    collections,
    featuredProducts,
    articles,
  ] = await Promise.all([
    getGlobalSettings(),
    getCollections(),
    getFeaturedProducts(),
    getFeaturedArticles(3),
  ])

  const fallbackAbout = {
    heading: 'Designed By Passion.<br/>Forged For Individuality.',
    subheading: 'ABOUT AVORA',
    description: 'AVORA creates premium forged wheels that blend engineering, luxury aesthetics and personalized craftsmanship. Every wheel is made-to-order and tailored to your vehicle.',
    buttonText: 'Learn More',
    image: { src: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1400', alt: 'AVORA About', width: 1400, height: 900 },
  }

  return {
    hero: globalSettings.hero,
    collections,
    features: globalSettings.features || [],
    about: globalSettings.aboutSection || fallbackAbout,
    featuredProducts,
    journal: articles,
    finalCta: globalSettings.finalCta,
  }
}

export async function getWheelsPageData(): Promise<{
  hero: HeroProps
  collections: CollectionsSectionProps
  featuredProducts: FeaturedProductsSectionProps
  finalCta: CTASectionProps
}> {
  const [collections, featuredProducts, pageHero] = await Promise.all([
    getCollections(),
    getFeaturedProducts(),
    getPageHero('wheels').catch(() => null),
  ])

  return {
    hero: {
      heading: pageHero?.heroHeading || 'FIVE COLLECTIONS.',
      subheading: pageHero?.heroDescription || 'Every AVORA collection is a distinct expression of forged wheel craftsmanship. From elegant luxury to raw performance — discover your perfect fit.',
      primaryCta: { label: 'Explore Wheels', href: '/wheels' },
      secondaryCta: { label: 'View Gallery', href: '/gallery' },
      image: { src: '/wheels-hero.jpg', alt: 'AVORA Wheels Collections', width: 2560, height: 1440 },
      backgroundImage: pageHero?.heroBackgroundImage,
      height: pageHero?.heroHeight,
    },
    collections: {
      ...collections,
      heading: 'Explore Our Collections',
      subheading: 'Five distinct visual identities. One obsession.',
    },
    featuredProducts: {
      ...featuredProducts,
      heading: 'Featured Across Series',
      subheading: 'From five distinct collections — discover our most sought-after forged designs.',
    },
    finalCta: {
      heading: 'Ready to Find Your Collection?',
      ctas: [
        { label: 'Explore All Wheels', description: 'Browse our five collections.', href: '/wheels', variant: 'primary' },
        { label: 'Request a Custom Quote', description: 'Get personalized assistance.', href: '/contact', variant: 'secondary' },
      ],
    },
  }
}

export async function getAllGalleryItems(): Promise<GalleryCardData[]> {
  const response = await strapiFetch<{
    data: {
      id: number
      slug: string
      vehicle: { data: { brand: string; model: string; generation?: string; yearFrom: number } } | null
      wheelModel: { data: { name: string; collection: { data: { name: string; slug: string } } } } | null
      wheelFinish: string
      wheelSize: string
      images: { url: string; alternativeText?: string; width: number; height: number }[] | null
      featured: boolean
    }[]
    meta: {}
  }>('/gallery-items?populate=vehicle,wheelModel,images&sort=createdAt:desc')

  return response.data.map((item) => {
    const image = item.images?.[0]
    const vehicleAttrs = item.vehicle?.data
    const wheelAttrs = item.wheelModel?.data

    return {
      slug: item.slug,
      image: image ? convertStrapiImage(image) : { src: '/hero-placeholder.jpg', alt: '', width: 1600, height: 1200 },
      vehicleYear: vehicleAttrs?.yearFrom || 2024,
      vehicleBrand: vehicleAttrs?.brand || '',
      vehicleModel: vehicleAttrs?.generation
        ? `${vehicleAttrs.model} ${vehicleAttrs.generation}`
        : vehicleAttrs?.model || '',
      wheelName: wheelAttrs?.collection?.data ? `${wheelAttrs.collection.data.name} ${wheelAttrs.name}` : wheelAttrs?.name || '',
      wheelFinish: item.wheelFinish,
      wheelSize: item.wheelSize,
      collection: wheelAttrs?.collection?.data?.slug || '',
      href: `/wheels/${wheelAttrs?.collection?.data?.slug || ''}/${item.slug}`,
    }
  })
}

export interface CollectionProduct extends ProductCardData {
  finishes: { name: string; colorCode?: string; price?: number }[]
  specifications: { label: string; value: string }[]
}

export async function getCollectionBySlug(slug: string): Promise<{
  collection: {
    slug: string
    name: string
    tagline: string
    accentColor: string
    description: string
    coverImage: { src: string; alt: string; width: number; height: number }
    heroImage: { src: string; alt: string; width: number; height: number }
  }
  products: CollectionProduct[]
} | null> {
  const [collectionResponse, productsResponse] = await Promise.all([
    strapiFetch<{
      data: {
        id: number
        slug: string
        name: string
        tagline: string
        accentColor: string
        description: string | null
        coverImage: { url: string; alternativeText?: string; width: number; height: number } | null
        heroImage: { url: string; alternativeText?: string; width: number; height: number } | null
      }[]
    }>(`/collections?filters[slug][$eq]=${slug}`),
    strapiFetch<{
      data: {
        id: number
        slug: string
        name: string
        tagline?: string
        specifications: { label: string; value: string }[]
        finishes: { name: string; colorCode?: string; price?: number }[]
        gallery: { url: string; alternativeText?: string; width: number; height: number }[] | null
        collection: { slug: string; name: string; accentColor: string } | null
      }[]
    }>(`/products?populate=gallery,specifications,finishes,collection`),
  ])

  const collectionData = collectionResponse.data?.[0]

  if (!collectionData) {
    return null
  }

  const productsInCollection = productsResponse.data.filter(
    (product) => product.collection?.slug === slug
  )

  const products: CollectionProduct[] = productsInCollection.map((item) => {
    const diameterSpec = (item.specifications || []).find(
      (spec) => spec.label.toLowerCase() === 'diameter'
    )
    const thumbnail = item.gallery?.[0]

    return {
      slug: item.slug,
      name: item.name,
      collection: {
        slug: collectionData.slug,
        name: collectionData.name,
        accentColor: collectionData.accentColor,
      },
      diameterRange: diameterSpec?.value || '',
      thumbnail: thumbnail ? convertStrapiImage(thumbnail) : { src: '/hero-placeholder.jpg', alt: item.name, width: 1200, height: 1200 },
      href: `/wheels/${collectionData.slug}/${item.slug}`,
      finishes: item.finishes || [],
      specifications: item.specifications || [],
    }
  })

  return {
    collection: {
      slug: collectionData.slug,
      name: collectionData.name,
      tagline: collectionData.tagline,
      accentColor: collectionData.accentColor,
      description: collectionData.description || '',
      coverImage: collectionData.coverImage ? convertStrapiImage(collectionData.coverImage) : { src: '/hero-placeholder.jpg', alt: collectionData.name, width: 800, height: 1067 },
      heroImage: collectionData.heroImage ? convertStrapiImage(collectionData.heroImage) : { src: '/hero-placeholder.jpg', alt: collectionData.name, width: 1600, height: 900 },
    },
    products,
  }
}

export async function getProductBySlug(collectionSlug: string, productSlug: string): Promise<{
  product: {
    slug: string
    name: string
    tagline: string
    description: string
    sku: string
    basePrice: number
    features: string[]
    sizes: { diameter: string; width: string; offset: string; price: number; available: boolean }[]
    specifications: { label: string; value: string }[]
    finishes: { name: string; price: number; colorCode?: string; previewImage?: { src: string; alt: string; width: number; height: number } | null; images?: { src: string; alt: string; width: number; height: number }[] }[]
    gallery: { src: string; alt: string; width: number; height: number }[]
    videos: { src: string; thumbnail?: string }[]
    fitment: { brand: string; model: string; year: number | string }[]
    downloads: { name: string; url: string }[]
    faq: { question: string; answer: string }[]
    seo: { metaTitle: string; metaDescription: string }
  }
  collection: { slug: string; name: string; accentColor: string }
} | null> {
  const response = await strapiFetch<{
    data: {
      id: number
      slug: string
      name: string
      tagline: string
      description: string
      sku: string
      basePrice?: number
      features?: string[]
      sizes?: { diameter: string; width: string; offset: string; price: number; available: boolean }[]
      specifications: { label: string; value: string }[]
      finishes: { name: string; price?: number; colorCode?: string; previewImage?: { url: string; alternativeText?: string; width: number; height: number } | null; images?: { url: string; alternativeText?: string; width: number; height: number }[] }[]
      gallery: { url: string; alternativeText?: string; width: number; height: number }[] | null
      videos: { url: string; alternativeText?: string; width: number; height: number; formats?: { thumbnail?: { url: string } } }[] | null
      fitment: { brand: string; model: string; yearFrom?: number; year?: number }[] | null
      downloads: { name: string; url: string }[]
      faq: { question: string; answer: string }[]
      seo: { metaTitle: string; metaDescription: string }
      collection: { slug: string; name: string; accentColor: string } | null
    }[]
  }>(`/products?filters[slug][$eq]=${productSlug}&populate=collection,gallery,videos,fitment,downloads,faq,seo,specifications,finishes,finishes.previewImage,finishes.images`)

  const data = response.data?.[0]

  if (!data) {
    return null
  }

  return {
    product: {
      slug: data.slug,
      name: data.name,
      tagline: data.tagline,
      description: data.description,
      sku: data.sku,
      basePrice: data.basePrice || 1899,
      features: data.features || [],
      sizes: data.sizes || [
        { diameter: '19"', width: '8.5"', offset: 'ET35', price: 0, available: true },
        { diameter: '20"', width: '9"', offset: 'ET35', price: 200, available: true },
        { diameter: '22"', width: '10"', offset: 'ET30', price: 500, available: true },
      ],
      specifications: data.specifications || [],
      finishes: (data.finishes || []).map(f => {
        const images = (f.images || []).map(convertStrapiImage)
        const previewImage = f.previewImage ? convertStrapiImage(f.previewImage) : null
        return {
          name: f.name,
          price: f.price || 0,
          colorCode: f.colorCode,
          previewImage,
          images: images.length > 0 ? images : (previewImage ? [previewImage] : []),
        }
      }),
      gallery: (data.gallery || []).map(convertStrapiImage),
      videos: (data.videos || []).map(img => ({ src: `${process.env.NEXT_PUBLIC_MEDIA_URL || 'http://localhost:1337'}${img.url}`, thumbnail: img.formats?.thumbnail?.url ? `${process.env.NEXT_PUBLIC_MEDIA_URL || 'http://localhost:1337'}${img.formats.thumbnail.url}` : undefined })),
      fitment: (data.fitment || []).map(f => ({ brand: f.brand, model: f.model, year: f.year || f.yearFrom || 'N/A' })),
      downloads: data.downloads || [],
      faq: data.faq || [],
      seo: data.seo || { metaTitle: '', metaDescription: '' },
    },
    collection: data.collection ? {
      slug: data.collection.slug,
      name: data.collection.name,
      accentColor: data.collection.accentColor,
    } : { slug: collectionSlug, name: '', accentColor: '#ffffff' },
  }
}

export async function getAllArticles(category?: string): Promise<ArticleCardData[]> {
  const categoryLabels: Record<string, string> = {
    'buying-guides': 'BUYING GUIDES',
    'fitment-guides': 'FITMENT GUIDES',
    'wheel-technology': 'WHEEL TECHNOLOGY',
    'vehicle-guides': 'VEHICLE GUIDES',
    'industry-news': 'INDUSTRY NEWS',
    'product-releases': 'PRODUCT RELEASES',
    'brand-stories': 'BRAND STORIES',
    'events': 'EVENTS',
  }

  const filter = category && category !== 'all'
    ? `&filters[category][$eq]=${category}`
    : ''

  const response = await strapiFetch<{
    data: {
      id: number
      slug: string
      title: string
      category: string
      coverImage: { url: string; alternativeText?: string; width: number; height: number } | null
      readTime: number
      publishDate: string
      featured: boolean
    }[]
    meta: {}
  }>(`/articles?populate=coverImage&sort=publishDate:desc${filter}`)

  return response.data.map((item) => {
    const image = item.coverImage

    return {
      slug: item.slug,
      title: item.title,
      category: item.category as any,
      categoryLabel: categoryLabels[item.category] || item.category.toUpperCase(),
      coverImage: image ? convertStrapiImage(image) : { src: '/hero-placeholder.jpg', alt: item.title, width: 1200, height: 675 },
      readTime: item.readTime,
      href: `/journal/${item.category}/${item.slug}`,
    }
  })
}

export interface MerchProduct {
  slug: string
  name: string
  category: 'apparel' | 'hardware' | 'accessories'
  price: number
  description: string
  image: { src: string; alt: string; width: number; height: number }
  sizes: string[]
  featured: boolean
}

export async function getMerchProducts(): Promise<MerchProduct[]> {
  const response = await strapiFetch<{
    data: {
      id: number
      slug: string
      name: string
      category: 'apparel' | 'hardware' | 'accessories'
      price: number
      description: string
      image: { url: string; alternativeText?: string; width: number; height: number } | null
      sizes: string | null
      featured: boolean
      sortOrder: number
    }[]
    meta: {}
  }>('/merch-products?populate=image&sort=sortOrder:asc')

  return response.data.map((item) => ({
    slug: item.slug,
    name: item.name,
    category: item.category,
    price: item.price,
    description: item.description || '',
    image: item.image
      ? convertStrapiImage(item.image)
      : { src: '/hero-placeholder.jpg', alt: item.name, width: 800, height: 800 },
    sizes: item.sizes ? item.sizes.split(',').map((s) => s.trim()) : [],
    featured: item.featured,
  }))
}

export async function getManufacturingPageData(): Promise<{
  hero: HeroProps
  brandStatement: BrandStatementProps
  detailSteps: ManufacturingSectionProps
  faqs: { id: number; question: string; answer: string }[]
  finalCta: CTASectionProps
}> {
  const [globalSettings, manufacturing] = await Promise.all([
    getGlobalSettings(),
    getManufacturingSteps(),
  ])

  return {
    hero: {
      heading: 'ENGINEERED WITHOUT COMPROMISE.',
      subheading: 'Every AVORA wheel begins as a solid block of aerospace-grade aluminum and ends as a precision instrument of performance. Six acts of engineering, zero shortcuts.',
      primaryCta: { label: 'Explore Wheels', href: '/wheels' },
      secondaryCta: { label: 'Request a Quote', href: '/contact' },
      image: { src: '/hero-placeholder.jpg', alt: 'AVORA Manufacturing — CNC Machining a Forged Wheel', width: 2560, height: 1440 },
    },
    brandStatement: {
      quote: '"A wheel is the point where engineering meets the road. We obsess over that point."',
      body: 'Our manufacturing process blends aerospace-grade materials with obsessive attention to detail. From the first CAD sketch to the final quality seal, every AVORA wheel passes through six meticulously controlled stages — each designed to eliminate compromise and maximize performance.',
    },
    detailSteps: {
      heading: 'Six Acts of Precision.',
      subheading: 'From raw billet to finished wheel — the AVORA manufacturing journey.',
      steps: manufacturing.steps,
    },
    faqs: [
      { id: 1, question: 'How long does production take?', answer: 'Production typically takes 15–20 business days from order confirmation. Custom finishes may add 3–5 days. You\'ll receive real-time progress updates throughout.' },
      { id: 2, question: 'What material are AVORA wheels made from?', answer: 'All AVORA wheels are forged from 6061-T6 aerospace-grade aluminum alloy — the same material used in aircraft structural components. This provides an optimal strength-to-weight ratio.' },
      { id: 3, question: 'Can I customize the offset (ET)?', answer: 'Yes. Every AVORA wheel is made to order. Offset is customized to your vehicle\'s specifications at no additional cost, ensuring perfect fitment and stance.' },
      { id: 4, question: 'Can I customize the finish?', answer: 'Yes. Beyond our 8 standard finishes, we offer 200+ finish options including custom RAL color matching. Each finish is applied in a climate-controlled environment for maximum durability.' },
      { id: 5, question: 'What is the warranty?', answer: 'All AVORA forged wheels carry a lifetime structural warranty and a 2-year finish warranty against manufacturing defects. We stand behind every wheel we produce.' },
      { id: 6, question: 'Do you ship internationally?', answer: 'Yes. We ship to 30+ countries worldwide. Each wheel is secured in a custom wood crate with full tracking from factory to doorstep. International shipping typically takes 20–40 days.' },
      { id: 7, question: 'Can I order a single wheel?', answer: 'Yes. We produce single wheels for spare or replacement purposes, as well as full sets and staggered configurations for performance applications.' },
      { id: 8, question: 'What testing do the wheels undergo?', answer: 'Every wheel is dynamic balance tested at 2,000 RPM, X-ray inspected for internal structural integrity, and dimensionally verified against design specifications. Non-conforming wheels are rejected — never reworked.' },
    ],
    finalCta: globalSettings.finalCta,
  }
}

export interface SocialLink {
  label: string
  href: string
  icon?: string
}

export interface SiteConfig {
  socialLinks: SocialLink[]
  footerDescription: string
  footerCopyright: string
}

export async function getSiteConfig(): Promise<SiteConfig> {
  const response = await strapiFetch<{
    data: {
      socialLinks: { label: string; href: string; icon?: string; sortOrder: number }[] | null
      footerDescription: string | null
      footerCopyright: string | null
    } | null
  }>('/site-config?populate=socialLinks')

  const data = response.data
  if (!data) {
    return {
      socialLinks: [
        { label: 'Instagram', href: 'https://instagram.com' },
        { label: 'Facebook', href: 'https://facebook.com' },
        { label: 'Pinterest', href: 'https://pinterest.com' },
        { label: 'YouTube', href: 'https://youtube.com' },
      ],
      footerDescription: 'Premium forged wheels for drivers who value craftsmanship, performance and individuality.',
      footerCopyright: 'AVORA. All Rights Reserved.',
    }
  }

  return {
    socialLinks: (data.socialLinks || [])
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((link) => ({ label: link.label, href: link.href, icon: link.icon })),
    footerDescription: data.footerDescription || 'Premium forged wheels for drivers who value craftsmanship, performance and individuality.',
    footerCopyright: data.footerCopyright || 'AVORA. All Rights Reserved.',
  }
}

export interface FaqItem {
  question: string
  answer: string
}

export interface SupportPageData {
  faqHeading: string
  faqSubheading: string
  faqItems: FaqItem[]
  shippingHeading: string
  shippingContent: string
  warrantyHeading: string
  warrantyContent: string
}

export async function getSupportPage(): Promise<SupportPageData> {
  const response = await strapiFetch<{
    data: {
      faqHeading: string | null
      faqSubheading: string | null
      faqItems: { question: string; answer: string; sortOrder: number }[] | null
      shippingHeading: string | null
      shippingContent: string | null
      warrantyHeading: string | null
      warrantyContent: string | null
    } | null
  }>('/support-page?populate=faqItems')

  const data = response.data
  if (!data) {
    return {
      faqHeading: 'Frequently Asked Questions',
      faqSubheading: 'Everything you need to know about AVORA forged wheels.',
      faqItems: [
        { question: 'How long does production take?', answer: 'Production typically takes 15-20 business days from order confirmation. Custom finishes may add 3-5 days.' },
        { question: 'What material are AVORA wheels made from?', answer: 'All AVORA wheels are forged from 6061-T6 aerospace-grade aluminum alloy for optimal strength-to-weight ratio.' },
        { question: 'Can I customize the finish?', answer: 'Yes. Beyond our standard finishes, we offer 200+ finish options including custom RAL color matching.' },
        { question: 'What is the warranty?', answer: 'All AVORA forged wheels carry a lifetime structural warranty and a 2-year finish warranty against manufacturing defects.' },
        { question: 'Do you ship internationally?', answer: 'Yes. We ship to 30+ countries worldwide with full tracking from factory to doorstep.' },
        { question: 'Can I order a single wheel?', answer: 'Yes. We produce single wheels for spare or replacement purposes, as well as full sets and staggered configurations.' },
      ],
      shippingHeading: 'Shipping Information',
      shippingContent: 'Every AVORA wheel is secured in a custom wood crate with full tracking from factory to doorstep.\n\nDomestic shipping (United States): 5-10 business days.\nInternational shipping: 20-40 business days depending on destination.\n\nAll shipments are fully insured. You will receive a tracking number once your order ships.',
      warrantyHeading: 'Warranty',
      warrantyContent: 'All AVORA forged wheels carry a lifetime structural warranty and a 2-year finish warranty against manufacturing defects.\n\nStructural Warranty: Covers any structural failure or defect in materials and workmanship for the lifetime of the wheel.\n\nFinish Warranty: Covers peeling, fading, or discoloration of the finish for 2 years from the date of purchase.\n\nTo file a warranty claim, please contact our support team with your order number and photos of the issue.',
    }
  }

  return {
    faqHeading: data.faqHeading || 'Frequently Asked Questions',
    faqSubheading: data.faqSubheading || 'Everything you need to know about AVORA forged wheels.',
    faqItems: (data.faqItems || [])
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((item) => ({ question: item.question, answer: item.answer })),
    shippingHeading: data.shippingHeading || 'Shipping Information',
    shippingContent: data.shippingContent || '',
    warrantyHeading: data.warrantyHeading || 'Warranty',
    warrantyContent: data.warrantyContent || '',
  }
}