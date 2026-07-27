import Link from 'next/link'
import { Container } from '@/components/layout/container'

interface FinalCta {
  label: string
  description: string
  href: string
  variant: 'primary' | 'secondary'
}

interface CTASectionProps {
  heading: string
  description?: string
  ctas: FinalCta[]
}

export function CTASection({ heading, description, ctas }: CTASectionProps) {
  return (
    <section className="cta">
      <Container>
        <h2 dangerouslySetInnerHTML={{ __html: heading }}></h2>
        <p dangerouslySetInnerHTML={{ __html: description || 'Custom forged wheels engineered specifically for your vehicle. Talk with our specialists and receive your personalized design proposal.' }}></p>
        <Link href={ctas[0]?.href || '/contact'} className="btn btn-light">
          {ctas[0]?.label || 'Start Your Project'}
        </Link>
      </Container>
    </section>
  )
}
