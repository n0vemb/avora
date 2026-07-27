import { PageLayout } from '@/components/layout/page-layout'
import { HeroSection } from '@/components/hero/hero-section'
import { BrandStatementSection } from '@/components/layout/brand-statement-section'
import { ManufacturingDetail } from '@/components/manufacturing/manufacturing-detail'
import { FAQSection } from '@/components/ui/faq-section'
import { CTASection } from '@/components/cta/cta-section'
import { getManufacturingPageData } from '@/features/strapi/fetchers'

const FALLBACK_DATA = {
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
    steps: [
      { id: 1, number: '01', title: 'Design & Engineering', description: 'Every wheel begins with your vision. Our engineers translate style preferences into precision CAD drawings — defining spoke angles, load paths, and weight distribution before a single cut is made. Finite Element Analysis (FEA) simulates real-world stress to optimize structural integrity.', image: { src: '/hero-placeholder.jpg', alt: 'AVORA Wheel CAD Design and Engineering', width: 1600, height: 1200 } },
      { id: 2, number: '02', title: '10,000-Ton Forging', description: 'A solid 6061-T6 aerospace aluminum billet is heated to precise temperature and forged under 10,000 tons of hydraulic pressure. This monoblock process aligns the grain structure, creating a wheel blank with superior strength-to-weight ratio compared to cast alternatives.', image: { src: '/hero-placeholder.jpg', alt: 'AVORA 10,000-Ton Forging Process', width: 1600, height: 1200 } },
      { id: 3, number: '03', title: '5-Axis CNC Machining', description: 'The forged blank is sculpted by 5-axis CNC machines with ±0.01mm tolerance. Spokes, mounting surfaces, and bolt patterns are precision-cut across 12 quality checkpoints. Custom offsets, PCD, and center bore are machined to your exact vehicle specifications.', image: { src: '/hero-placeholder.jpg', alt: 'AVORA 5-Axis CNC Machining', width: 1600, height: 1200 } },
      { id: 4, number: '04', title: 'Hand Finishing', description: 'Craftsmen hand-polish each wheel to remove machining marks and prepare the surface for coating. Your chosen finish — from gloss black to custom RAL colors — is applied in a climate-controlled spray booth for uniform coverage and long-lasting durability.', image: { src: '/hero-placeholder.jpg', alt: 'AVORA Hand Polishing and Finishing', width: 1600, height: 1200 } },
      { id: 5, number: '05', title: 'Quality Inspection', description: 'Every wheel undergoes dynamic balance testing at 2,000 RPM, X-ray structural analysis to detect internal flaws, and dimensional verification against design specs. Wheels that don\'t meet our standards are rejected — not reworked. Only certified wheels leave the factory.', image: { src: '/hero-placeholder.jpg', alt: 'AVORA Quality Inspection — Dynamic Balance and X-Ray', width: 1600, height: 1200 } },
      { id: 6, number: '06', title: 'Precision Packaging', description: 'Each wheel is individually wrapped and secured in a custom-milled wood crate with foam lining. Tracked from our factory door to yours across 30+ countries. Because precision engineering deserves precision logistics.', image: { src: '/hero-placeholder.jpg', alt: 'AVORA Custom Wood Crate Packaging', width: 1600, height: 1200 } },
    ],
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
  finalCta: {
    heading: 'Ready to Build Your Wheels?',
    ctas: [
      { label: 'Explore All Wheels', description: 'Browse our full catalog of forged wheel collections.', href: '/wheels', variant: 'primary' as const },
      { label: 'Request a Custom Quote', description: 'Tell us about your vehicle and we\'ll create a personalized quote.', href: '/contact', variant: 'secondary' as const },
    ],
  },
}

async function getData() {
  try {
    const data = await getManufacturingPageData()
    return data
  } catch (error) {
    console.warn('Strapi API unavailable, using fallback data:', error)
    return FALLBACK_DATA
  }
}

export default async function ManufacturingPage() {
  const data = await getData()

  return (
    <PageLayout>
      <HeroSection {...data.hero} />
      <BrandStatementSection {...data.brandStatement} />
      <ManufacturingDetail {...data.detailSteps} />
      <FAQSection faqs={data.faqs} />
      <CTASection {...data.finalCta} />
    </PageLayout>
  )
}