'use client'

import { useState, useEffect } from 'react'
import { Container } from '@/components/layout/container'
import Image from 'next/image'

interface SimpleHeroProps {
  sub?: string
  heading: string
  description: string
  backgroundImage?: { src: string; alt: string; width: number; height: number }
  height?: number
  images?: { src: string; alt: string; width: number; height: number }[]
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

export function SimpleHero({ 
  sub = '', 
  heading, 
  description, 
  backgroundImage, 
  height,
  images = [],
  primaryCta,
  secondaryCta
}: SimpleHeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section className="hero relative overflow-hidden" style={height ? { height: `${height}px`, paddingTop: '90px', paddingBottom: '10px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center' } : { paddingTop: '90px', paddingBottom: '100px' }}>
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
      
      {images.length > 0 && (
        <div className="hero-carousel absolute inset-0 z-0 overflow-hidden">
          {images.map((img, index) => (
            <div
              key={index}
              className={`hero-carousel-slide absolute inset-0 transition-opacity duration-700 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      )}

      <Container className="hero-grid relative z-10">
        <div>
          {sub && <div className="hero-sub">{sub}</div>}
          <h1 dangerouslySetInnerHTML={{ __html: heading }} />
          <p dangerouslySetInnerHTML={{ __html: description }}></p>
          <div className="hero-buttons">
            {primaryCta && (
              <a href={primaryCta.href} className="btn btn-dark">
                {primaryCta.label}
              </a>
            )}
            {secondaryCta && (
              <a href={secondaryCta.href} className="btn btn-light">
                {secondaryCta.label}
              </a>
            )}
          </div>
        </div>
      </Container>

      {images.length > 1 && (
        <div className="hero-dots absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
