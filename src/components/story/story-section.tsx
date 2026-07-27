'use client'

import { motion } from 'framer-motion'
import { EASING, DURATION } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { Container } from '@/components/layout/container'
import { OptimizedImage } from '@/components/media/optimized-image'

interface StorySectionProps {
  heading: string
  subheading: string
  description: string
  buttonText: string
  image: { src: string; alt: string; width: number; height: number }
}

export function StorySection({ heading, subheading, description, buttonText, image }: StorySectionProps) {
  const prefersReducedMotion = useReducedMotion()

  const content = (
    <section className="relative bg-black py-24 overflow-hidden">
      <div className="absolute inset-0">
        <OptimizedImage
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/60" />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex w-full lg:w-1/2 flex-col">
            <span className="text-sm font-bold tracking-[0.3em] text-pink-400 uppercase">{subheading}</span>
            <h2 className="mt-4 text-[clamp(2.5rem,5vw,4rem)] font-black leading-[0.95] tracking-[0.02em] text-white [font-family:var(--font-display),sans-serif]">
              {heading}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-300 [font-family:var(--font-body),sans-serif] max-w-lg">
              {description}
            </p>
            <button className="mt-8 inline-flex h-14 items-center justify-center rounded-none px-10 text-sm font-bold tracking-wider uppercase bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300">
              {buttonText}
            </button>
          </div>

          <div className="relative flex w-full lg:w-1/2 items-center justify-center">
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-pink-400 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
              <button className="relative flex items-center justify-center w-24 h-24 rounded-full bg-pink-400 hover:bg-pink-500 transition-colors duration-300">
                <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )

  if (prefersReducedMotion) return content

  return (
    <section className="relative bg-black py-24 overflow-hidden">
      <div className="absolute inset-0">
        <OptimizedImage
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/60" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="flex flex-col lg:flex-row items-center gap-12"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -40 },
              visible: { opacity: 1, x: 0, transition: { duration: DURATION.luxury, ease: EASING.luxury } },
            }}
            className="flex w-full lg:w-1/2 flex-col"
          >
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: DURATION.luxury, ease: EASING.luxury } },
              }}
              className="text-sm font-bold tracking-[0.3em] text-pink-400 uppercase"
            >
              {subheading}
            </motion.span>
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: DURATION.cinematic, ease: EASING.luxury } },
              }}
              className="mt-4 text-[clamp(2.5rem,5vw,4rem)] font-black leading-[0.95] tracking-[0.02em] text-white [font-family:var(--font-display),sans-serif]"
            >
              {heading}
            </motion.h2>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: DURATION.luxury, ease: EASING.luxury } },
              }}
              className="mt-6 text-lg leading-relaxed text-gray-300 [font-family:var(--font-body),sans-serif] max-w-lg"
            >
              {description}
            </motion.p>
            <motion.button
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: DURATION.luxury, ease: EASING.luxury } },
              }}
              className="mt-8 inline-flex h-14 items-center justify-center rounded-none px-10 text-sm font-bold tracking-wider uppercase bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              {buttonText}
            </motion.button>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: DURATION.luxury, ease: EASING.luxury, delay: 0.3 } },
            }}
            className="relative flex w-full lg:w-1/2 items-center justify-center"
          >
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-pink-400 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
              <button className="relative flex items-center justify-center w-24 h-24 rounded-full bg-pink-400 hover:bg-pink-500 transition-colors duration-300">
                <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}