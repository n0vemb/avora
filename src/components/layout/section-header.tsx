export function SectionHeader({ heading, subheading }: { heading: string; subheading?: string }) {
  return (
    <div className="mb-12 text-center md:mb-16 xl:mb-20">
      <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.1] text-[var(--text-primary)] [font-family:var(--font-display),sans-serif]">
        {heading}
      </h2>
      {subheading && (
        <p className="mt-4 text-[clamp(1rem,1.125vw,1.125rem)] leading-relaxed text-[var(--text-secondary)] [font-family:var(--font-body),sans-serif]">
          {subheading}
        </p>
      )}
    </div>
  )
}
