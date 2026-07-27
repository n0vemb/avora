import { PageLayout } from '@/components/layout/page-layout'
import { SimpleHero } from '@/components/hero/simple-hero'
import { InquiryFormSection } from '@/components/ui/inquiry-form'
import { Container } from '@/components/layout/container'
import { SectionHeader } from '@/components/layout/section-header'
import { getGlobalSettings, getPageHero, type PageHeroData } from '@/features/strapi/fetchers'

const FALLBACK_DATA = {
  hero: {
    heading: 'GET IN TOUCH.',
    subheading: 'Whether you need a custom quote, fitment advice, or have questions about our products — our team is here to help.',
    primaryCta: { label: 'Request a Quote', href: '#inquiry-form' },
    secondaryCta: { label: 'View Wheels', href: '/wheels' },
    image: { src: '/hero-placeholder.jpg', alt: 'AVORA Customer Support — Get in Touch', width: 2560, height: 1440 },
  },
  contactInfo: {
    email: 'hello@avorawheels.com',
    phone: '+66 2 123 4567',
    whatsapp: '+66 81 234 5678',
    address: '88/88 Soi Sukhumvit 24, Klongtoey, Bangkok 10110, Thailand',
    hours: 'Mon – Fri: 9:00 AM – 6:00 PM (GMT+7)',
  },
  diameterOptions: ['18"', '19"', '20"', '21"', '22"', '23"', '24"'],
  widthOptions: ['8"', '8.5"', '9"', '9.5"', '10"', '10.5"', '11"', '12"'],
  finishOptions: ['Gloss Black', 'Gloss Silver', 'Brushed Silver', 'Matte Black', 'Satin Black', 'Gloss White', 'Custom RAL Color'],
}

const FALLBACK_HERO: PageHeroData = {
  pageSlug: 'contact',
  pageTitle: 'Contact AVORA',
  heroSub: 'GET IN TOUCH',
  heroHeading: 'GET IN TOUCH.',
  heroDescription: 'Whether you need a custom quote, fitment advice, or have questions about our products — our team is here to help.',
}

async function getData() {
  const [globalSettings, pageHero] = await Promise.all([
    getGlobalSettings().catch(() => null),
    getPageHero('contact').catch(() => null),
  ])
  return { ...FALLBACK_DATA, globalSettings, pageHero: pageHero || FALLBACK_HERO }
}

export default async function ContactPage() {
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

      <section className="bg-[var(--bg-surface)] py-20 md:py-28">
        <Container>
          <SectionHeader
            heading="Contact Information"
            subheading="Reach out to us via email, phone, or visit our showroom."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--bg-card)] mb-4">
                <svg className="w-6 h-6 text-[var(--border-strong)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Email</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                <a href={`mailto:${data.contactInfo.email}`} className="hover:text-[var(--border-strong)] transition-colors">
                  {data.contactInfo.email}
                </a>
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--bg-card)] mb-4">
                <svg className="w-6 h-6 text-[var(--border-strong)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Phone</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                <a href={`tel:${data.contactInfo.phone}`} className="hover:text-[var(--border-strong)] transition-colors">
                  {data.contactInfo.phone}
                </a>
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--bg-card)] mb-4">
                <svg className="w-6 h-6 text-[var(--border-strong)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">WhatsApp</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                <a href={`https://wa.me/${data.contactInfo.whatsapp.replace(/\s/g, '')}`} className="hover:text-[var(--border-strong)] transition-colors">
                  {data.contactInfo.whatsapp}
                </a>
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--bg-card)] mb-4">
                <svg className="w-6 h-6 text-[var(--border-strong)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Showroom</h3>
              <p className="text-sm text-[var(--text-secondary)]">{data.contactInfo.address}</p>
              <p className="text-xs text-[var(--text-muted)] mt-2">{data.contactInfo.hours}</p>
            </div>
          </div>
        </Container>
      </section>

      <InquiryFormSection
        id="inquiry-form"
        title="Request a Custom Quote"
        subtitle="Tell us about your vehicle and preferences, and we'll create a personalized recommendation."
        diameterOptions={data.diameterOptions}
        widthOptions={data.widthOptions}
        finishOptions={data.finishOptions}
      />

      <section className="bg-[var(--bg-surface)] py-20 md:py-28">
        <Container>
          <SectionHeader
            heading="Frequently Asked Questions"
            subheading="Quick answers to common questions."
          />
          <div className="max-w-3xl mx-auto space-y-4">
            <details className="group">
              <summary className="flex cursor-pointer items-center justify-between rounded-lg bg-[var(--bg-card)] px-6 py-4 text-left">
                <span className="font-medium text-[var(--text-primary)]">How long does production take?</span>
                <span className="text-[var(--text-muted)] group-open:rotate-180 transition-transform">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <p className="mt-2 rounded-lg bg-[var(--bg-card)] px-6 pb-4 text-sm text-[var(--text-secondary)]">
                Production typically takes 15–20 business days from order confirmation. Custom finishes may add 3–5 days.
              </p>
            </details>

            <details className="group">
              <summary className="flex cursor-pointer items-center justify-between rounded-lg bg-[var(--bg-card)] px-6 py-4 text-left">
                <span className="font-medium text-[var(--text-primary)]">Do you offer international shipping?</span>
                <span className="text-[var(--text-muted)] group-open:rotate-180 transition-transform">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <p className="mt-2 rounded-lg bg-[var(--bg-card)] px-6 pb-4 text-sm text-[var(--text-secondary)]">
                Yes. We ship to 30+ countries worldwide. Each wheel is secured in a custom wood crate with full tracking.
              </p>
            </details>

            <details className="group">
              <summary className="flex cursor-pointer items-center justify-between rounded-lg bg-[var(--bg-card)] px-6 py-4 text-left">
                <span className="font-medium text-[var(--text-primary)]">What is your warranty policy?</span>
                <span className="text-[var(--text-muted)] group-open:rotate-180 transition-transform">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <p className="mt-2 rounded-lg bg-[var(--bg-card)] px-6 pb-4 text-sm text-[var(--text-secondary)]">
                All AVORA forged wheels carry a lifetime structural warranty and a 2-year finish warranty against manufacturing defects.
              </p>
            </details>

            <details className="group">
              <summary className="flex cursor-pointer items-center justify-between rounded-lg bg-[var(--bg-card)] px-6 py-4 text-left">
                <span className="font-medium text-[var(--text-primary)]">Can I order a single wheel?</span>
                <span className="text-[var(--text-muted)] group-open:rotate-180 transition-transform">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <p className="mt-2 rounded-lg bg-[var(--bg-card)] px-6 pb-4 text-sm text-[var(--text-secondary)]">
                Yes. We produce single wheels for spare or replacement purposes, as well as full sets and staggered configurations.
              </p>
            </details>
          </div>
        </Container>
      </section>
    </PageLayout>
  )
}
