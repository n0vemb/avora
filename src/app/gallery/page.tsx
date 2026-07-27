import { GalleryClient } from '@/components/gallery/gallery-client'
import { getAllGalleryItems, getPageHero, type PageHeroData } from '@/features/strapi/fetchers'
import type { GalleryCardData } from '@/types/gallery'

interface GalleryItemWithCollection extends GalleryCardData {
  collection?: string
}

const FALLBACK_DATA: GalleryItemWithCollection[] = [
  {
    slug: 'bmw-m3-g80-volt-af10',
    image: { src: '/gallery/bmw-m3-g80-volt-af10.jpg', alt: 'BMW M3 on AVORA AF-10', width: 1600, height: 1200 },
    vehicleYear: 2024, vehicleBrand: 'BMW', vehicleModel: 'M3 G80',
    wheelName: 'AF-10', wheelFinish: 'Gloss Black', wheelSize: '20x10',
    collection: 'volt', href: '/wheels/volt/af-10'
  },
  {
    slug: 'audi-rs6-volt-af13',
    image: { src: '/gallery/audi-rs6-af13.jpg', alt: 'Audi RS6 on AVORA AF-13', width: 1600, height: 1200 },
    vehicleYear: 2024, vehicleBrand: 'Audi', vehicleModel: 'RS6 Avant',
    wheelName: 'AF-13', wheelFinish: 'Gloss Silver', wheelSize: '21x10.5',
    collection: 'volt', href: '/wheels/volt/af-13'
  },
  {
    slug: 'porsche-911-992-cyber-cf05',
    image: { src: '/gallery/porsche-911-cf05.jpg', alt: 'Porsche 911 on AVORA CYBER CF-05', width: 1600, height: 1200 },
    vehicleYear: 2025, vehicleBrand: 'Porsche', vehicleModel: '911 992',
    wheelName: 'CF-05', wheelFinish: 'Brushed Silver', wheelSize: '20x9',
    collection: 'cyber', href: '/wheels/cyber/cf-05'
  },
  {
    slug: 'tesla-model-s-luxe-lf03',
    image: { src: '/gallery/tesla-model-s-lf03.jpg', alt: 'Tesla Model S on AVORA LUXE LF-03', width: 1600, height: 1200 },
    vehicleYear: 2024, vehicleBrand: 'Tesla', vehicleModel: 'Model S',
    wheelName: 'LF-03', wheelFinish: 'Satin Black', wheelSize: '20x10',
    collection: 'luxe', href: '/wheels/luxe/lf-03'
  },
  {
    slug: 'bmw-5-series-bloom-bf01',
    image: { src: '/gallery/bmw-5-series-bf01.jpg', alt: 'BMW 5 Series on AVORA BLOOM BF-01', width: 1600, height: 1200 },
    vehicleYear: 2024, vehicleBrand: 'BMW', vehicleModel: '5 Series',
    wheelName: 'BF-01', wheelFinish: 'Gloss White', wheelSize: '19x8',
    collection: 'bloom', href: '/wheels/bloom/bf-01'
  },
  {
    slug: 'mercedes-gle-terra-tf02',
    image: { src: '/gallery/mercedes-gle-tf02.jpg', alt: 'Mercedes GLE on AVORA TERRA TF-02', width: 1600, height: 1200 },
    vehicleYear: 2024, vehicleBrand: 'Mercedes', vehicleModel: 'GLE',
    wheelName: 'TF-02', wheelFinish: 'Matte Desert Sand', wheelSize: '21x9.5',
    collection: 'terra', href: '/wheels/terra/tf-02'
  },
]

const FALLBACK_HERO: PageHeroData = {
  pageSlug: 'gallery',
  pageTitle: 'AVORA Gallery',
  heroSub: 'INSPIRATION',
  heroHeading: 'AVORA<br/>IN THE WILD',
  heroDescription: 'See our wheels on the world\'s finest cars. Premium forged wheels engineered for performance and individuality.',
}

async function getData() {
  const [items, pageHero] = await Promise.all([
    getAllGalleryItems().catch(() => FALLBACK_DATA),
    getPageHero('gallery').catch(() => null),
  ])
  return { items: items as GalleryItemWithCollection[], pageHero: pageHero || FALLBACK_HERO }
}

export default async function GalleryPage() {
  const { items: allBuilds, pageHero } = await getData()

  const collections = [
    { slug: 'all', name: 'All Builds', count: allBuilds.length },
    ...Array.from(new Set(allBuilds.map(item => item.collection).filter(Boolean) as string[])).map(col => ({
      slug: col,
      name: col.toUpperCase(),
      count: allBuilds.filter(item => item.collection === col).length,
    })),
  ]

  const years = [
    { label: 'All Years', value: '' },
    ...Array.from(new Set(allBuilds.map(item => item.vehicleYear))).sort((a, b) => b - a).map(year => ({
      label: String(year),
      value: String(year),
    })),
  ]

  const brands = [
    { label: 'All Brands', value: '' },
    ...Array.from(new Set(allBuilds.map(item => item.vehicleBrand))).sort().map(brand => ({
      label: brand,
      value: brand,
    })),
  ]

  return <GalleryClient allBuilds={allBuilds} collections={collections} years={years} brands={brands} pageHero={pageHero} />
}
