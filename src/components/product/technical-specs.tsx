import { Container } from '@/components/layout/container'
import { SectionHeader } from '@/components/layout/section-header'
import { SectionCTA } from '@/components/layout/section-cta'
import { ProductGrid } from '@/components/product/product-grid'

export interface TechnicalSpecsSectionProps {
  specs: {
    construction: string
    material: string
    diameterRange: string
    widthRange: string
    pcd: string
    centerBore: string
    offset: string
    loadRating: string
    weight: string
    finishCount: string
  }
}

export function TechnicalSpecsSection({ specs }: TechnicalSpecsSectionProps) {
  return (
    <section className="bg-[var(--bg-base)] py-16 md:py-24 xl:py-32">
      <Container>
        <SectionHeader
          heading="Technical Specifications"
          subheading="Discover every detail of the AVORA AF-10 wheel design, materials, and engineering specifications."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-[var(--border-default)]">
              <span className="text-[var(--text-muted)] font-medium">Construction</span>
              <span className="text-[var(--text-primary)] font-semibold">{specs.construction}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-[var(--border-default)]">
              <span className="text-[var(--text-muted)] font-medium">Material</span>
              <span className="text-[var(--text-primary)] font-semibold">{specs.material}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-[var(--border-default)]">
              <span className="text-[var(--text-muted)] font-medium">Diameter Range</span>
              <span className="text-[var(--text-primary)] font-semibold">{specs.diameterRange}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-[var(--border-default)]">
              <span className="text-[var(--text-muted)] font-medium">Width Range</span>
              <span className="text-[var(--text-primary)] font-semibold">{specs.widthRange}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-[var(--border-default)]">
              <span className="text-[var(--text-muted)] font-medium">PCD</span>
              <span className="text-[var(--text-primary)] font-semibold">{specs.pcd}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-[var(--border-default)]">
              <span className="text-[var(--text-muted)] font-medium">Center Bore</span>
              <span className="text-[var(--text-primary)] font-semibold">{specs.centerBore}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-[var(--border-default)]">
              <span className="text-[var(--text-muted)] font-medium">Offset</span>
              <span className="text-[var(--text-primary)] font-semibold">{specs.offset}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-[var(--border-default)]">
              <span className="text-[var(--text-muted)] font-medium">Load Rating</span>
              <span className="text-[var(--text-primary)] font-semibold">{specs.loadRating}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-[var(--border-default)]">
              <span className="text-[var(--text-muted)] font-medium">Weight</span>
              <span className="text-[var(--text-primary)] font-semibold">{specs.weight}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-[var(--border-default)]">
              <span className="text-[var(--text-muted)] font-medium">Finish Count</span>
              <span className="text-[var(--text-primary)] font-semibold">{specs.finishCount}</span>
            </div>
            <div className="pt-4">
              <SectionCTA label="Download Spec Sheet (PDF) ↓" href="#" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
