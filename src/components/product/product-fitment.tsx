import { SectionHeader } from '@/components/layout/section-header'

export interface Vehicle {
  brand: string
  model: string
  year: number | string
}

export interface ProductFitmentProps {
  vehicles: Vehicle[]
  productName: string
}

export function ProductFitment({ vehicles, productName }: ProductFitmentProps) {
  if (!vehicles || vehicles.length === 0) return null

  return (
    <section className="bg-[var(--bg-base)] py-20 md:py-28">
      <div className="container">
        <SectionHeader
          heading="Vehicle Fitment"
          subheading={`The ${productName} is designed to fit these vehicles. Contact us for custom fitment.`}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {vehicles.map((vehicle, index) => (
            <div
              key={index}
              className="bg-[var(--bg-surface)] rounded-lg p-4 text-center"
            >
              <div className="text-lg font-bold text-[var(--text-primary)]">
                {vehicle.brand}
              </div>
              <div className="text-sm text-[var(--text-secondary)]">
                {vehicle.model}
              </div>
              <div className="text-xs text-[var(--text-muted)]">{vehicle.year}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
