import { PageLayout } from '@/components/layout/page-layout'
import { SimpleHero } from '@/components/hero/simple-hero'
import { BrandStatementSection } from '@/components/layout/brand-statement-section'
import { WhyAvoraSection } from '@/components/why-avora/why-avora-section'
import { Container } from '@/components/layout/container'
import { SectionHeader } from '@/components/layout/section-header'
import { CTASection } from '@/components/cta/cta-section'
import { getGlobalSettings, getPageHero, type PageHeroData } from '@/features/strapi/fetchers'

const FALLBACK_DATA = {
  hero: {
    heading: 'THE AVORA STORY.',
    subheading: 'Founded on the belief that wheels should be more than functional — they should be expressions of individuality. Every AVORA wheel is engineered to elevate your driving experience.',
    primaryCta: { label: 'Explore Wheels', href: '/wheels' },
    secondaryCta: { label: 'Learn About Manufacturing', href: '/about/manufacturing' },
    image: { src: '/hero-placeholder.jpg', alt: 'AVORA — Forged Wheels for the Discerning Enthusiast', width: 2560, height: 1440 },
  },
  brandStatement: {
    quote: '"Great wheels don\'t just fit your car — they fit your identity."',
    body: 'AVORA was born from a passion for automotive excellence and a refusal to accept compromise. We believe that the right set of wheels can transform a vehicle from ordinary to extraordinary — and we\'re here to help you find yours.',
  },
  whyAvora: {
    heading: 'Why AVORA?',
    subheading: 'Five reasons discerning enthusiasts choose AVORA forged wheels.',
    reasons: [
      { icon: 'award', title: 'Aerospace-Grade Materials', description: 'Every wheel starts as a solid block of 6061-T6 aerospace aluminum — the same material trusted by aircraft manufacturers worldwide.' },
      { icon: 'zap', title: '10,000-Ton Forging', description: 'Our proprietary forging process aligns the grain structure, creating wheels with superior strength-to-weight ratios compared to cast alternatives.' },
      { icon: 'target', title: 'Precision Engineering', description: 'Each wheel is CNC-machined with ±0.01mm tolerance and undergoes dynamic balance testing at 2,000 RPM.' },
      { icon: 'palette', title: 'Customization Without Limits', description: 'Choose from 8 standard finishes or 200+ custom RAL colors. Every wheel is made to order with your exact specifications.' },
      { icon: 'shield', title: 'Lifetime Warranty', description: 'All AVORA forged wheels carry a lifetime structural warranty and a 2-year finish warranty. We stand behind every wheel we produce.' },
    ],
  },
  values: {
    heading: 'Our Values',
    items: [
      { title: 'Obsession Over Compromise', description: 'We refuse to cut corners. Every detail matters, from material selection to final inspection.' },
      { title: 'Engineering Excellence', description: 'Our wheels are designed by engineers, not marketers. Performance and safety come first.' },
      { title: 'Customer-Centric', description: 'We work directly with you to ensure your wheels fit perfectly — both mechanically and aesthetically.' },
      { title: 'Sustainable Practices', description: 'We source materials responsibly and minimize waste throughout our manufacturing process.' },
    ],
  },
  team: {
    heading: 'Meet the Team',
    members: [
      { name: 'Alex Chen', role: 'Founder & CEO', bio: '15+ years in automotive engineering. Former Formula 1 composite engineer.' },
      { name: 'Sarah Wang', role: 'Head of Design', bio: 'Award-winning automotive designer with experience at Porsche and BMW.' },
      { name: 'Michael Torres', role: 'Director of Manufacturing', bio: '20+ years in aerospace manufacturing. Expert in precision forging.' },
      { name: 'Emily Zhang', role: 'Customer Experience', bio: 'Passionate automotive enthusiast dedicated to your satisfaction.' },
    ],
  },
  finalCta: {
    heading: 'Ready to Elevate Your Vehicle?',
    ctas: [
      { label: 'Explore All Wheels', description: 'Browse our five collections and find your perfect fit.', href: '/wheels', variant: 'primary' as const },
      { label: 'Request a Custom Quote', description: 'Tell us about your vehicle and we\'ll create a personalized recommendation.', href: '/contact', variant: 'secondary' as const },
    ],
  },
}

const FALLBACK_HERO: PageHeroData = {
  pageSlug: 'about',
  pageTitle: 'About AVORA',
  heroSub: 'OUR STORY',
  heroHeading: 'THE AVORA STORY.',
  heroDescription: 'Founded on the belief that wheels should be more than functional — they should be expressions of individuality. Every AVORA wheel is engineered to elevate your driving experience.',
}

async function getData() {
  const [globalSettings, pageHero] = await Promise.all([
    getGlobalSettings().catch(() => null),
    getPageHero('about').catch(() => null),
  ])
  return { ...FALLBACK_DATA, globalSettings, pageHero: pageHero || FALLBACK_HERO }
}

export default async function AboutPage() {
  const data = await getData()

  return (
    <PageLayout>
      <SimpleHero 
        sub={data.pageHero.heroSub}
        heading={data.pageHero.heroHeading} 
        description={data.pageHero.heroDescription} 
        backgroundImage={data.pageHero.heroBackgroundImage}
        height={data.pageHero.heroHeight}
      />

      <BrandStatementSection {...data.brandStatement} />

      <WhyAvoraSection {...data.whyAvora} />

      <section className="bg-[var(--bg-surface)] py-20 md:py-28">
        <Container>
          <SectionHeader heading={data.values.heading} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:grid-cols-4">
            {data.values.items.map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--bg-card)] mb-4">
                  <span className="text-lg font-bold text-[var(--border-strong)]">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[var(--bg-base)] py-20 md:py-28">
        <Container>
          <SectionHeader heading={data.team.heading} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.team.members.map((member, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-[var(--bg-card)] mb-4">
                  <span className="text-2xl font-bold text-[var(--text-muted)]">{member.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">{member.name}</h3>
                <p className="text-sm font-medium text-[var(--border-strong)] mb-2">{member.role}</p>
                <p className="text-sm text-[var(--text-secondary)]">{member.bio}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection {...data.finalCta} />
    </PageLayout>
  )
}
