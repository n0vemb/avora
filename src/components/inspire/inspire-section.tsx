'use client'

import { motion } from 'framer-motion'
import { EASING, DURATION } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { Container } from '@/components/layout/container'
import { OptimizedImage } from '@/components/media/optimized-image'

interface InspireItem {
  slug: string
  image: { src: string; alt: string; width: number; height: number }
  title: string
  description: string
}

interface InspireSectionProps {
  heading: string
  items: InspireItem[]
}

export function InspireSection({ heading, items }: InspireSectionProps) {
  const prefersReducedMotion = useReducedMotion()

  const content = (
    <section className="bg-white py-24">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-black tracking-[0.02em] text-black [font-family:var(--font-display),sans-serif]">
            {heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <div key={index} className="group relative overflow-hidden">
              <div className="relative aspect-[16/10]">
                <OptimizedImage
                  src={item.image.src}
                  alt={item.image.alt}
                  width={item.image.width}
                  height={item.image.height}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-xl font-bold text-white [font-family:var(--font-display),sans-serif]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-300 [font-family:var(--font-body),sans-serif]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )

  if (prefersReducedMotion) return content

  return (
    <section className="bg-white py-24">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: DURATION.luxury, ease: EASING.luxury } },
          }}
          className="text-center mb-16"
        >
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-black tracking-[0.02em] text-black [font-family:var(--font-display),sans-serif]">
            {heading}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: DURATION.luxury, ease: EASING.luxury, delay: index * 0.1 } },
              }}
              className="group relative overflow-hidden"
            >
              <div className="relative aspect-[16/10]">
                <OptimizedImage
                  src={item.image.src}
                  alt={item.image.alt}
                  width={item.image.width}
                  height={item.image.height}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-xl font-bold text-white [font-family:var(--font-display),sans-serif]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-300 [font-family:var(--font-body),sans-serif]">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}