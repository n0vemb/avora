import Link from 'next/link'
import { Container } from '@/components/layout/container'
import Image from 'next/image'
import type { HeroProps } from '@/types/homepage'

export function HeroSection({ heading, subheading, primaryCta, secondaryCta, image, backgroundImage }: HeroProps) {
  return (
    <section className="hero relative overflow-hidden">
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage.src}
            alt={backgroundImage.alt}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      <Container className="hero-grid relative z-10">
        <div>
          <div className="hero-sub">WHEEL AS IDENTITY</div>
          <h1 dangerouslySetInnerHTML={{ __html: heading }} />
          <p>{subheading}</p>
          <div className="hero-buttons">
            <Link href={primaryCta.href} className="btn btn-dark">
              {primaryCta.label}
            </Link>
            <Link href={secondaryCta.href} className="btn btn-light">
              {secondaryCta.label}
            </Link>
          </div>
          <div className="hero-pages">
            <span className="active">01</span>
            <span>02</span>
            <span>03</span>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-bg"></div>
          <img
            className="hero-wheel"
            src={image.src}
            alt={image.alt}
          />
        </div>
      </Container>
    </section>
  )
}
