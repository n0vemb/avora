import { SimpleHero } from '@/components/hero/simple-hero'
import { FeaturesSection } from '@/components/features/features-section'
import { CollectionsSection } from '@/components/collection/collections-section'
import { AboutSection } from '@/components/about/about-section'
import { FeaturedProductsSection } from '@/components/product/featured-products-section'
import { JournalSection } from '@/components/article/article-section'
import { CTASection } from '@/components/cta/cta-section'
import { getHomePageData } from '@/features/strapi/fetchers'

const FALLBACK_DATA = {
  hero: {
    sub: 'WHEEL AS IDENTITY',
    heading: 'FORGED<br/>FORWARD',
    subheading: 'Premium forged wheels engineered to fit every ride. Same precision as factory, endless possibilities in color and design. Make your vehicle uniquely yours.',
    primaryCta: { label: 'Explore Collection', href: '/wheels' },
    secondaryCta: { label: 'View Gallery', href: '/gallery' },
    images: [{ src: 'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?w=1200', alt: 'AVORA Forged Wheel', width: 1200, height: 1200 }],
    backgroundImage: undefined as { src: string; alt: string; width: number; height: number } | undefined,
    height: undefined as number | undefined,
  },
  features: [],
  collections: {
    heading: 'Five Signature Series',
    subheading: 'Discover five distinctive forged wheel collections, each crafted with its own personality, performance philosophy and design language.',
    collections: [
      { slug: 'bloom', name: 'Bloom', tagline: 'Signature', accentColor: '#FFB8C1',
        coverImage: { src: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900', alt: 'AVORA Bloom Collection', width: 900, height: 900 }, href: '/wheels/bloom' },
      { slug: 'calm', name: 'Calm', tagline: 'Minimal', accentColor: '#E8E8E8',
        coverImage: { src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900', alt: 'AVORA Calm Collection', width: 900, height: 900 }, href: '/wheels/calm' },
      { slug: 'volt', name: 'Volt', tagline: 'Sport', accentColor: '#4ADE80',
        coverImage: { src: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?w=900', alt: 'AVORA Volt Collection', width: 900, height: 900 }, href: '/wheels/volt' },
      { slug: 'terra', name: 'Terra', tagline: 'Offroad', accentColor: '#D8B68C',
        coverImage: { src: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=900', alt: 'AVORA Terra Collection', width: 900, height: 900 }, href: '/wheels/terra' },
      { slug: 'luxe', name: 'Luxe', tagline: 'Luxury', accentColor: '#C0C0C0',
        coverImage: { src: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=900', alt: 'AVORA Luxe Collection', width: 900, height: 900 }, href: '/wheels/luxe' },
    ],
  },
  about: {
    heading: 'Engineered For Your Ride.<br/>Designed For Your Style.',
    subheading: 'ABOUT AVORA',
    description: 'AVORA crafts premium forged wheels that match factory specifications perfectly — then takes customization to the next level. Choose from endless color finishes and unique designs to make your vehicle stand out.',
    buttonText: 'Our Story',
    image: { src: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1400', alt: 'AVORA About', width: 1400, height: 900 },
  },
  featuredProducts: {
    heading: 'Crafted To Perform',
    subheading: 'Precision engineered for maximum performance.',
    products: [
      { slug: 'af-01', name: 'AF-01', collection: { slug: 'bloom', name: 'Forged Series', accentColor: '#FFB8C1' },
        diameterRange: '18" – 22"', thumbnail: { src: 'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?w=900', alt: 'AVORA AF-01', width: 900, height: 900 }, href: '/wheels/bloom/af-01' },
      { slug: 'af-05', name: 'AF-05', collection: { slug: 'volt', name: 'Performance', accentColor: '#4ADE80' },
        diameterRange: '19" – 22"', thumbnail: { src: 'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?w=900', alt: 'AVORA AF-05', width: 900, height: 900 }, href: '/wheels/volt/af-05' },
      { slug: 'af-08', name: 'AF-08', collection: { slug: 'luxe', name: 'Luxury', accentColor: '#C0C0C0' },
        diameterRange: '19" – 22"', thumbnail: { src: 'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?w=900', alt: 'AVORA AF-08', width: 900, height: 900 }, href: '/wheels/luxe/af-08' },
      { slug: 'af-10', name: 'AF-10', collection: { slug: 'bloom', name: 'Signature', accentColor: '#FFB8C1' },
        diameterRange: '18" – 24"', thumbnail: { src: 'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?w=900', alt: 'AVORA AF-10', width: 900, height: 900 }, href: '/wheels/bloom/af-10' },
    ],
    ctaLabel: 'View All',
    ctaHref: '/wheels',
  },
  journal: {
    heading: 'Stories Behind The Drive',
    subheading: 'JOURNAL',
    articles: [
      { slug: 'art-of-forged-wheels', title: 'The Art Of Forged Wheels', category: 'Design', categoryLabel: 'DESIGN',
        coverImage: { src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200', alt: 'The Art Of Forged Wheels', width: 1200, height: 800 }, readTime: 5, href: '/journal/design/art-of-forged-wheels' },
      { slug: 'driven-by-confidence', title: 'Driven By Confidence', category: 'Lifestyle', categoryLabel: 'LIFESTYLE',
        coverImage: { src: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200', alt: 'Driven By Confidence', width: 1200, height: 800 }, readTime: 4, href: '/journal/lifestyle/driven-by-confidence' },
      { slug: 'strength-meets-elegance', title: 'Strength Meets Elegance', category: 'Engineering', categoryLabel: 'ENGINEERING',
        coverImage: { src: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200', alt: 'Strength Meets Elegance', width: 1200, height: 800 }, readTime: 6, href: '/journal/engineering/strength-meets-elegance' },
    ],
    ctaLabel: 'View All Articles',
    ctaHref: '/journal',
  },
  finalCta: {
    heading: 'Ready To Make It Yours?',
    description: undefined as string | undefined,
    ctas: [
      { label: 'Start Your Project', description: 'Factory-perfect fit with unlimited color and design options.', href: '/contact', variant: 'primary' as const },
      { label: 'Contact Us', description: 'Get personalized styling recommendations.', href: '/contact', variant: 'secondary' as const },
    ],
  },
}

async function getData() {
  try {
    const data = await getHomePageData()
    return data
  } catch (error) {
    console.warn('Strapi API unavailable, using fallback data:', error)
    return FALLBACK_DATA
  }
}

export default async function HomePage() {
  const data = await getData()

  return (
    <>
      <SimpleHero 
        sub={data.hero?.sub || FALLBACK_DATA.hero.sub}
        heading={data.hero?.heading || FALLBACK_DATA.hero.heading} 
        description={data.hero?.subheading || FALLBACK_DATA.hero.subheading} 
        backgroundImage={data.hero?.backgroundImage}
        images={data.hero?.images}
        primaryCta={data.hero?.primaryCta}
        secondaryCta={data.hero?.secondaryCta}
        height={data.hero?.height}
      />
      <FeaturesSection features={data.features.length > 0 ? data.features : undefined} />
      <CollectionsSection heading={data.collections.heading} subheading={data.collections.subheading} collections={data.collections.collections} />
      <AboutSection {...data.about} />
      <FeaturedProductsSection heading={data.featuredProducts.heading} subheading={data.featuredProducts.subheading} products={data.featuredProducts.products} ctaLabel={data.featuredProducts.ctaLabel} ctaHref={data.featuredProducts.ctaHref} />
      <JournalSection heading={data.journal?.heading || FALLBACK_DATA.journal.heading} subheading={data.journal?.subheading || FALLBACK_DATA.journal.subheading} articles={data.journal?.articles || FALLBACK_DATA.journal.articles} />
      <CTASection heading={data.finalCta.heading} description={data.finalCta.description} ctas={data.finalCta.ctas} />
    </>
  )
}
