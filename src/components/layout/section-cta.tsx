import Link from 'next/link'

interface SectionCTAProps {
  label: string
  href: string
}

export function SectionCTA({ label, href }: SectionCTAProps) {
  return (
    <div className="mt-12 text-center md:mt-16">
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-base font-medium text-[var(--text-secondary)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--text-primary)] [font-family:var(--font-body),sans-serif]"
      >
        {label}
      </Link>
    </div>
  )
}
