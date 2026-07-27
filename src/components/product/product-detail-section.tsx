import { SectionHeader } from '@/components/layout/section-header'

export interface ProductDetailSectionProps {
  description: string
  features?: string[]
}

export function ProductDetailSection({ description, features }: ProductDetailSectionProps) {
  return (
    <section className="bg-[var(--bg-base)] py-20 md:py-28">
      <div className="container">
        <SectionHeader
          heading="About This Wheel"
          subheading="Learn more about the design, engineering, and craftsmanship behind this product."
        />

        <div className="max-w-3xl mx-auto">
          <p
            className="text-[var(--text-secondary)] leading-relaxed mb-8"
            style={{ fontFamily: 'var(--font-body), sans-serif' }}
          >
            {description}
          </p>

          {features && features.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Key Features</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[var(--border-strong)] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[var(--text-secondary)]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
