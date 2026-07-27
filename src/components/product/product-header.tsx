import Link from 'next/link'

export interface ProductHeaderProps {
  breadcrumbs: { label: string; href: string }[]
  name: string
  tagline: string
  description: string
}

export function ProductHeader({ breadcrumbs, name, tagline, description }: ProductHeaderProps) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {breadcrumbs.map((crumb, index) => (
          <span key={index} className="flex items-center gap-2">
            {index > 0 && <span className="text-[var(--text-muted)]">/</span>}
            <Link
              href={crumb.href}
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              {crumb.label}
            </Link>
          </span>
        ))}
        <span className="text-[var(--text-muted)]">/</span>
        <span className="text-sm text-[var(--text-primary)] font-medium">{name}</span>
      </div>

      <h1
        className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4"
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
      >
        {name}
      </h1>

      <p
        className="text-xl text-[var(--text-secondary)] mb-6"
        style={{ fontFamily: 'var(--font-body), sans-serif' }}
      >
        {tagline}
      </p>

      <p
        className="text-[var(--text-secondary)] mb-6"
        style={{ fontFamily: 'var(--font-body), sans-serif' }}
      >
        {description}
      </p>
    </div>
  )
}
