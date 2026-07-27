import { PageLayout } from '@/components/layout/page-layout'
import { Container } from '@/components/layout/container'
import { CTASection } from '@/components/cta/cta-section'
import { CollectionFilterShop } from '@/components/collection/collection-filter-shop'
import Link from 'next/link'
import { getCollectionBySlug, type CollectionProduct } from '@/features/strapi/fetchers'

interface FallbackProduct {
  slug: string
  name: string
  diameterRange: string
  thumbnail: { src: string; alt: string; width: number; height: number }
  href: string
  collection?: { slug: string; name: string; accentColor: string }
  finishes: { name: string; colorCode?: string; price?: number }[]
  specifications: { label: string; value: string }[]
}

interface FallbackCollection {
  name: string
  tagline: string
  accentColor: string
  description: string
  heroImage: { src: string; alt: string; width: number; height: number }
  products: FallbackProduct[]
}

const DEFAULT_FINISHES = [
  { name: 'Gloss Black', colorCode: '#111111' },
  { name: 'Matte Black', colorCode: '#222222' },
  { name: 'Silver', colorCode: '#c0c0c0' },
  { name: 'Bronze', colorCode: '#cd7f32' },
  { name: 'Gunmetal', colorCode: '#4a4a4a' },
]

const makeSpecs = (diameter: string) => [
  { label: 'Diameter', value: diameter },
  { label: 'Width', value: '8.5" – 11"' },
  { label: 'Offset', value: 'Custom' },
  { label: 'PCD', value: '4×100 – 6×139.7' },
  { label: 'Construction', value: 'Forged 6061-T6' },
]

const FALLBACK_COLLECTIONS: Record<string, FallbackCollection> = {
  bloom: {
    name: 'BLOOM',
    tagline: 'Soft Luxury',
    accentColor: '#FFB8C1',
    description:
      'BLOOM is where elegance meets emotion. Soft tones, sculpted spokes, and a refined aesthetic engineered for drivers who treat their vehicle as a canvas of self-expression. Each wheel is forged to balance delicate beauty with the strength required for daily driving.',
    heroImage: { src: '/bloom/bloom-1.png', alt: 'AVORA Bloom Collection', width: 1200, height: 1200 },
    products: [
      { slug: 'bf-01', name: 'BF-01', diameterRange: '18" – 22"', thumbnail: { src: '/bloom/bloom-2.png', alt: 'AVORA BF-01', width: 1200, height: 1200 }, href: '/wheels/bloom/bf-01', finishes: [{ name: 'Rose Gold', colorCode: '#b76e79' }, { name: 'Pearl White', colorCode: '#f5f5f5' }, ...DEFAULT_FINISHES], specifications: makeSpecs('18" – 22"') },
      { slug: 'bf-02', name: 'BF-02', diameterRange: '19" – 22"', thumbnail: { src: '/hero-placeholder.jpg', alt: 'AVORA BF-02', width: 1200, height: 1200 }, href: '/wheels/bloom/bf-02', finishes: DEFAULT_FINISHES, specifications: makeSpecs('19" – 22"') },
      { slug: 'bf-03', name: 'BF-03', diameterRange: '20" – 24"', thumbnail: { src: '/hero-placeholder.jpg', alt: 'AVORA BF-03', width: 1200, height: 1200 }, href: '/wheels/bloom/bf-03', finishes: DEFAULT_FINISHES, specifications: makeSpecs('20" – 24"') },
    ],
  },
  volt: {
    name: 'VOLT',
    tagline: 'Performance Series',
    accentColor: '#CCFF00',
    description:
      'VOLT is engineered for adrenaline. Aggressive spoke geometry, lightweight forged construction, and a high-voltage identity that announces itself before the engine does. Built for drivers who measure a wheel by how it transfers power to the road.',
    heroImage: { src: '/hero-placeholder.jpg', alt: 'AVORA Volt Collection', width: 1200, height: 1200 },
    products: [
      { slug: 'af-10', name: 'AF-10', diameterRange: '18" – 24"', thumbnail: { src: '/hero-placeholder.jpg', alt: 'AVORA AF-10', width: 1200, height: 1200 }, href: '/wheels/volt/af-10', finishes: [{ name: 'Neon Green', colorCode: '#ccff00' }, ...DEFAULT_FINISHES], specifications: makeSpecs('18" – 24"') },
      { slug: 'af-13', name: 'AF-13', diameterRange: '19" – 22"', thumbnail: { src: '/hero-placeholder.jpg', alt: 'AVORA AF-13', width: 1200, height: 1200 }, href: '/wheels/volt/af-13', finishes: DEFAULT_FINISHES, specifications: makeSpecs('19" – 22"') },
      { slug: 'af-15', name: 'AF-15', diameterRange: '20" – 24"', thumbnail: { src: '/hero-placeholder.jpg', alt: 'AVORA AF-15', width: 1200, height: 1200 }, href: '/wheels/volt/af-15', finishes: DEFAULT_FINISHES, specifications: makeSpecs('20" – 24"') },
    ],
  },
  cyber: {
    name: 'CYBER',
    tagline: 'Future Technology',
    accentColor: '#00FFFF',
    description:
      'CYBER looks ten years ahead. Machined facets, translucent finishes, and a digital-native aesthetic designed for the electric era. Every detail is precision-cut from forged aluminum to deliver a wheel that feels like it was rendered rather than built.',
    heroImage: { src: '/hero-placeholder.jpg', alt: 'AVORA Cyber Collection', width: 1200, height: 1200 },
    products: [
      { slug: 'cf-05', name: 'CF-05', diameterRange: '19" – 24"', thumbnail: { src: '/hero-placeholder.jpg', alt: 'AVORA CF-05', width: 1200, height: 1200 }, href: '/wheels/cyber/cf-05', finishes: [{ name: 'Cyan', colorCode: '#00ffff' }, ...DEFAULT_FINISHES], specifications: makeSpecs('19" – 24"') },
      { slug: 'cf-07', name: 'CF-07', diameterRange: '20" – 23"', thumbnail: { src: '/hero-placeholder.jpg', alt: 'AVORA CF-07', width: 1200, height: 1200 }, href: '/wheels/cyber/cf-07', finishes: DEFAULT_FINISHES, specifications: makeSpecs('20" – 23"') },
    ],
  },
  terra: {
    name: 'TERRA',
    tagline: 'Off-Road Adventure',
    accentColor: '#D8B68C',
    description:
      'TERRA is built for the unpaved path. Reinforced spoke architecture, earth-tone finishes, and over-engineered load ratings for vehicles that leave the asphalt behind. Forged strength that absorbs punishment and keeps rolling.',
    heroImage: { src: '/hero-placeholder.jpg', alt: 'AVORA Terra Collection', width: 1200, height: 1200 },
    products: [
      { slug: 'tf-02', name: 'TF-02', diameterRange: '18" – 24"', thumbnail: { src: '/hero-placeholder.jpg', alt: 'AVORA TF-02', width: 1200, height: 1200 }, href: '/wheels/terra/tf-02', finishes: [{ name: 'Sand', colorCode: '#d8b68c' }, { name: 'Desert Bronze', colorCode: '#b8860b' }, ...DEFAULT_FINISHES], specifications: makeSpecs('18" – 24"') },
      { slug: 'tf-04', name: 'TF-04', diameterRange: '17" – 22"', thumbnail: { src: '/hero-placeholder.jpg', alt: 'AVORA TF-04', width: 1200, height: 1200 }, href: '/wheels/terra/tf-04', finishes: DEFAULT_FINISHES, specifications: makeSpecs('17" – 22"') },
    ],
  },
  luxe: {
    name: 'LUXE',
    tagline: 'Timeless Prestige',
    accentColor: '#D9D9D9',
    description:
      'LUXE is the absence of noise. Classic multi-spoke silhouettes, polished finishes, and a restraint that reads as confidence. For drivers who understand that true luxury is not about being noticed — it is about being remembered.',
    heroImage: { src: '/hero-placeholder.jpg', alt: 'AVORA Luxe Collection', width: 1200, height: 1200 },
    products: [
      { slug: 'lf-03', name: 'LF-03', diameterRange: '19" – 22"', thumbnail: { src: '/hero-placeholder.jpg', alt: 'AVORA LF-03', width: 1200, height: 1200 }, href: '/wheels/luxe/lf-03', finishes: [{ name: 'Polished Silver', colorCode: '#e8e8e8' }, ...DEFAULT_FINISHES], specifications: makeSpecs('19" – 22"') },
      { slug: 'lf-05', name: 'LF-05', diameterRange: '20" – 24"', thumbnail: { src: '/hero-placeholder.jpg', alt: 'AVORA LF-05', width: 1200, height: 1200 }, href: '/wheels/luxe/lf-05', finishes: DEFAULT_FINISHES, specifications: makeSpecs('20" – 24"') },
    ],
  },
}

export async function generateStaticParams() {
  return Object.keys(FALLBACK_COLLECTIONS).map((collection) => ({
    collection,
  }))
}

async function getData(collectionSlug: string) {
  try {
    const data = await getCollectionBySlug(collectionSlug)
    if (data) {
      return {
        collection: {
          name: data.collection.name,
          tagline: data.collection.tagline,
          accentColor: data.collection.accentColor,
          description: data.collection.description,
          heroImage: data.collection.heroImage,
          coverImage: data.collection.coverImage,
        },
        products: data.products as CollectionProduct[],
      }
    }
  } catch (error) {
    console.warn('Strapi API unavailable, using fallback data:', error)
  }

  const fallback = FALLBACK_COLLECTIONS[collectionSlug]
  return fallback
    ? {
        collection: {
          name: fallback.name,
          tagline: fallback.tagline,
          accentColor: fallback.accentColor,
          description: fallback.description,
          heroImage: fallback.heroImage,
          coverImage: { src: '/hero-placeholder.jpg', alt: fallback.name, width: 1200, height: 800 },
        },
        products: fallback.products.map((p) => ({
          ...p,
          collection: { slug: collectionSlug, name: fallback.name, accentColor: fallback.accentColor },
        })) as CollectionProduct[],
      }
    : null
}

export default async function CollectionPage({ params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params
  const data = await getData(collection)

  if (!data) {
    return (
      <PageLayout>
        <Container>
          <div className="py-20 text-center">
            <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-4">Collection Not Found</h1>
            <Link href="/wheels" className="text-[var(--border-strong)] hover:underline">
              Back to All Collections
            </Link>
          </div>
        </Container>
      </PageLayout>
    )
  }

  const accentStyle = { ['--accent' as string]: data.collection.accentColor } as React.CSSProperties

  return (
    <PageLayout>
      <div style={accentStyle}>
        <div className="collection-accent-strip" />

        <section className="hero collection-hero">
          <Container className="hero-grid">
            <div>
              <div className="hero-sub">{data.collection.tagline.toUpperCase()}</div>
              <h1>{data.collection.name}</h1>
              <p>{data.collection.description}</p>
              <div className="hero-buttons">
                <a href="#products" className="btn btn-dark">
                  Explore Products
                </a>
                <Link href="/contact" className="btn btn-light">
                  Request a Quote
                </Link>
              </div>
            </div>
            <div className="hero-right">
              <div className="hero-bg"></div>
              <img
                className="hero-wheel"
                src={data.collection.heroImage.src}
                alt={data.collection.heroImage.alt}
              />
            </div>
          </Container>
        </section>

        <section className="series-philosophy">
          <Container>
            <h2>Series Philosophy</h2>
            <hr className="accent-divider" />
            <p className="philosophy-body">{data.collection.description}</p>
          </Container>
        </section>

        <div id="products">
          <CollectionFilterShop
            products={data.products}
            accentColor={data.collection.accentColor}
            collectionName={data.collection.name}
          />
        </div>

        <CTASection
          heading={`Ready for ${data.collection.name}?`}
          ctas={[
            { label: 'Request a Quote', description: `Get a personalized quote for ${data.collection.name} wheels.`, href: '/contact', variant: 'primary' },
            { label: 'View All Collections', description: 'Explore all five AVORA collections.', href: '/wheels', variant: 'secondary' },
          ]}
        />
      </div>
    </PageLayout>
  )
}
