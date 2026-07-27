import { PageLayout } from '@/components/layout/page-layout'
import { SimpleHero } from '@/components/hero/simple-hero'
import { CollectionsSection } from '@/components/collection/collections-section'
import { FeaturedProductsSection } from '@/components/product/featured-products-section'
import { CTASection } from '@/components/cta/cta-section'
import { getWheelsPageData } from '@/features/strapi/fetchers'

const FALLBACK_DATA = {
  hero: {
    heading: 'FIVE COLLECTIONS.',
    subheading: 'Every AVORA collection is a distinct expression of forged wheel craftsmanship. From elegant luxury to raw performance — discover your perfect fit.',
    primaryCta: { label: 'Explore Wheels', href: '/wheels' },
    secondaryCta: { label: 'View Gallery', href: '/gallery' },
    image: { src: '/wheels-hero.jpg', alt: 'AVORA Wheels Collections', width: 2560, height: 1440 },
    backgroundImage: undefined as { src: string; alt: string; width: number; height: number } | undefined,
    height: 500,
  },
  collections: {
    heading: 'Explore Our Collections',
    subheading: 'Five distinct visual identities. One obsession.',
    collections: [
      { slug: 'bloom', name: 'BLOOM', tagline: 'Soft Luxury', accentColor: '#FFB8C1',
        coverImage: { src: '/bloom/bloom-1.png', alt: 'AVORA Bloom Collection', width: 800, height: 1067 }, href: '/wheels/bloom' },
      { slug: 'volt', name: 'VOLT', tagline: 'Performance Series', accentColor: '#CCFF00',
        coverImage: { src: '/hero-placeholder.jpg', alt: 'AVORA Volt Collection', width: 800, height: 1067 }, href: '/wheels/volt' },
      { slug: 'cyber', name: 'CYBER', tagline: 'Future Technology', accentColor: '#00FFFF',
        coverImage: { src: '/hero-placeholder.jpg', alt: 'AVORA Cyber Collection', width: 800, height: 1067 }, href: '/wheels/cyber' },
      { slug: 'terra', name: 'TERRA', tagline: 'Off-Road Adventure', accentColor: '#D8B68C',
        coverImage: { src: '/hero-placeholder.jpg', alt: 'AVORA Terra Collection', width: 800, height: 1067 }, href: '/wheels/terra' },
      { slug: 'luxe', name: 'LUXE', tagline: 'Timeless Prestige', accentColor: '#D9D9D9',
        coverImage: { src: '/hero-placeholder.jpg', alt: 'AVORA Luxe Collection', width: 800, height: 1067 }, href: '/wheels/luxe' },
    ],
  },
  featuredProducts: {
    heading: 'Featured Across Series',
    subheading: 'From five distinct collections — discover our most sought-after forged designs.',
    products: [
      { slug: 'af-10', name: 'AF-10', collection: { slug: 'volt', name: 'VOLT', accentColor: '#CCFF00' },
        diameterRange: '18" – 24"', thumbnail: { src: '/hero-placeholder.jpg', alt: 'AVORA AF-10', width: 1200, height: 1200 }, href: '/wheels/volt/af-10' },
      { slug: 'bf-01', name: 'BF-01', collection: { slug: 'bloom', name: 'BLOOM', accentColor: '#FFB8C1' },
        diameterRange: '18" – 22"', thumbnail: { src: '/bloom/bloom-2.png', alt: 'AVORA BF-01', width: 1200, height: 1200 }, href: '/wheels/bloom/bf-01' },
      { slug: 'cf-05', name: 'CF-05', collection: { slug: 'cyber', name: 'CYBER', accentColor: '#00FFFF' },
        diameterRange: '19" – 24"', thumbnail: { src: '/hero-placeholder.jpg', alt: 'AVORA CF-05', width: 1200, height: 1200 }, href: '/wheels/cyber/cf-05' },
      { slug: 'lf-03', name: 'LF-03', collection: { slug: 'luxe', name: 'LUXE', accentColor: '#D9D9D9' },
        diameterRange: '19" – 22"', thumbnail: { src: '/hero-placeholder.jpg', alt: 'AVORA LF-03', width: 1200, height: 1200 }, href: '/wheels/luxe/lf-03' },
      { slug: 'tf-02', name: 'TF-02', collection: { slug: 'terra', name: 'TERRA', accentColor: '#D8B68C' },
        diameterRange: '18" – 24"', thumbnail: { src: '/hero-placeholder.jpg', alt: 'AVORA TF-02', width: 1200, height: 1200 }, href: '/wheels/terra/tf-02' },
    ],
    ctaLabel: 'View All Wheels →',
    ctaHref: '/wheels',
  },
  finalCta: {
    heading: 'Ready to Find Your Collection?',
    ctas: [
      { label: 'Explore All Wheels', description: 'Browse our five collections.', href: '/wheels', variant: 'primary' as const },
      { label: 'Request a Custom Quote', description: 'Get personalized assistance.', href: '/contact', variant: 'secondary' as const },
    ],
  },
}

async function getData() {
  try {
    const data = await getWheelsPageData()
    return data
  } catch (error) {
    console.warn('Strapi API unavailable, using fallback data:', error)
    return FALLBACK_DATA
  }
}

export default async function WheelsPage() {
  const data = await getData()

  return (
    <PageLayout>
      <SimpleHero 
        sub="FORGED WHEELS"
        heading={data.hero.heading} 
        description={data.hero.subheading} 
        backgroundImage={data.hero?.backgroundImage}
        height={data.hero?.height}
      />
      <CollectionsSection {...data.collections} />
      <FeaturedProductsSection {...data.featuredProducts} />
      <CTASection {...data.finalCta} />
    </PageLayout>
  )
}