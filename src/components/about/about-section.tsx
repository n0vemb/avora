import Link from 'next/link'
import { Container } from '@/components/layout/container'
import Image from 'next/image'

interface AboutSectionProps {
  heading: string
  subheading: string
  description: string
  buttonText: string
  image?: { src: string; alt: string; width: number; height: number }
  video?: { src: string }
}

export function AboutSection({ heading, subheading, description, buttonText, image, video }: AboutSectionProps) {
  return (
    <section className="about relative overflow-hidden">
      {(image || video) && (
        <div className="about-media absolute inset-0 z-0">
          {video && (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              poster={image?.src}
            >
              <source src={video.src} type="video/mp4" />
            </video>
          )}
          {image && !video && (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="about-media-overlay absolute inset-0 z-10"></div>
        </div>
      )}

      <Container className="about-content relative z-20 hero-grid">
        <div>
          <div className="hero-sub">{subheading}</div>
          <h2 dangerouslySetInnerHTML={{ __html: heading }}></h2>
          <p dangerouslySetInnerHTML={{ __html: description }}></p>
          <Link href="/about" className="btn btn-light">
            {buttonText}
          </Link>
        </div>
        <div></div>
      </Container>
    </section>
  )
}
