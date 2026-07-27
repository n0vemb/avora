import { SectionHeader } from '@/components/layout/section-header'

export interface SpecItem {
  label: string
  value: string
}

export interface ProductSpecsProps {
  specs: SpecItem[]
  heading?: string
  subheading?: string
}

export function ProductSpecs({ specs, heading = 'Technical Specifications', subheading = 'Every detail engineered for performance and precision.' }: ProductSpecsProps) {
  if (!specs || specs.length === 0) return null

  const leftSpecs = specs.slice(0, Math.ceil(specs.length / 2))
  const rightSpecs = specs.slice(Math.ceil(specs.length / 2))

  return (
    <section className="bg-[var(--bg-surface)] py-20 md:py-28">
      <div className="container">
        <SectionHeader heading={heading} subheading={subheading} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-0">
            {leftSpecs.map((spec, index) => (
              <div key={index} className="flex justify-between py-3 border-b border-[var(--border-default)]">
                <span className="text-[var(--text-muted)] font-medium">{spec.label}</span>
                <span className="text-[var(--text-primary)] font-semibold">{spec.value}</span>
              </div>
            ))}
          </div>
          <div className="space-y-0">
            {rightSpecs.map((spec, index) => (
              <div key={index} className="flex justify-between py-3 border-b border-[var(--border-default)]">
                <span className="text-[var(--text-muted)] font-medium">{spec.label}</span>
                <span className="text-[var(--text-primary)] font-semibold">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
