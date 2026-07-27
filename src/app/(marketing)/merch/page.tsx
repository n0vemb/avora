import { Container } from '@/components/layout/container'
import { MerchShop } from '@/components/merch/merch-shop'
import { getMerchProducts, getPageHero, type MerchProduct, type PageHeroData } from '@/features/strapi/fetchers'
import { SimpleHero } from '@/components/hero/simple-hero'

const FALLBACK_PRODUCTS: MerchProduct[] = [
  {
    slug: 'avora-tee-black',
    name: 'AVORA Logo Tee',
    category: 'apparel',
    price: 68,
    description: 'Premium cotton tee with AVORA logo.',
    image: { src: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800', alt: 'AVORA Logo Tee', width: 800, height: 1000 },
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    featured: true,
  },
  {
    slug: 'color-bolts-red',
    name: 'Color Bolt Kit',
    category: 'hardware',
    price: 149,
    description: 'Premium color bolt kit for wheels.',
    image: { src: 'https://images.unsplash.com/photo-1605153866510-4f248f65d697?w=800', alt: 'Color Bolt Kit', width: 800, height: 800 },
    sizes: ['OS'],
    featured: false,
  },
  {
    slug: 'avora-sticker-pack',
    name: 'Sticker Pack',
    category: 'accessories',
    price: 25,
    description: 'AVORA sticker pack.',
    image: { src: 'https://images.unsplash.com/photo-1580261306802-5e55b4498be8?w=800', alt: 'Sticker Pack', width: 800, height: 800 },
    sizes: ['OS'],
    featured: false,
  },
  {
    slug: 'avora-tee-white',
    name: 'AVORA Script Tee',
    category: 'apparel',
    price: 68,
    description: 'Script logo tee.',
    image: { src: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800', alt: 'AVORA Script Tee', width: 800, height: 1000 },
    sizes: ['S', 'M', 'L', 'XL'],
    featured: false,
  },
  {
    slug: 'lug-nut-set',
    name: 'AVORA Lug Nuts',
    category: 'hardware',
    price: 89,
    description: 'Premium lug nut set.',
    image: { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', alt: 'AVORA Lug Nuts', width: 800, height: 800 },
    sizes: ['OS'],
    featured: false,
  },
  {
    slug: 'avora-hat',
    name: 'AVORA Snapback',
    category: 'apparel',
    price: 48,
    description: 'AVORA snapback hat.',
    image: { src: 'https://images.unsplash.com/photo-1534215754734-18e55d959948?w=800', alt: 'AVORA Snapback', width: 800, height: 800 },
    sizes: ['OS'],
    featured: true,
  },
  {
    slug: 'avora-hoodie',
    name: 'AVORA Hoodie',
    category: 'apparel',
    price: 128,
    description: 'Premium hoodie.',
    image: { src: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800', alt: 'AVORA Hoodie', width: 800, height: 1000 },
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    featured: true,
  },
  {
    slug: 'center-cap-set',
    name: 'Center Cap Set',
    category: 'hardware',
    price: 59,
    description: 'Center cap set for wheels.',
    image: { src: 'https://images.unsplash.com/photo-1517082986976-1766acf64076?w=800', alt: 'Center Cap Set', width: 800, height: 800 },
    sizes: ['OS'],
    featured: false,
  },
]

const FALLBACK_HERO: PageHeroData = {
  pageSlug: 'merch',
  pageTitle: 'AVORA Merch',
  heroSub: 'LIFESTYLE',
  heroHeading: 'AVORA<br/>MERCH',
  heroDescription: 'Complete your look with AVORA lifestyle products. From apparel to accessories, every item is designed with the same attention to detail as our wheels.',
}

async function getData() {
  const [products, pageHero] = await Promise.all([
    getMerchProducts().catch(() => []),
    getPageHero('merch').catch(() => null),
  ])
  return { products, pageHero: pageHero || FALLBACK_HERO }
}

export default async function MerchPage() {
  const { products, pageHero } = await getData()

  return (
    <div className="min-h-screen">
      <SimpleHero
        sub={pageHero.heroSub}
        heading={pageHero.heroHeading}
        description={pageHero.heroDescription}
        backgroundImage={pageHero.heroBackgroundImage}
        height={pageHero.heroHeight}
      />

      <MerchShop products={products} fallbackProducts={FALLBACK_PRODUCTS} />
    </div>
  )
}
