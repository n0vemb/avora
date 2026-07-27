import { OptimizedImage } from '@/components/media/optimized-image'

interface HeroImageProps {
  src: string
  alt: string
  width: number
  height: number
  srcMobile?: string
}

export function HeroImage({ src, alt, width, height, srcMobile }: HeroImageProps) {
  return (
    <div className="relative w-full max-w-[720px]">
      {/* Desktop: 16:9 or 1:1 */}
      <OptimizedImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1279px) 100vw, 50vw"
        className="hidden sm:block"
      />
      {/* Mobile: 4:5 vertical crop */}
      <OptimizedImage
        src={srcMobile ?? src}
        alt={alt}
        width={1080}
        height={1920}
        priority
        sizes="100vw"
        className="block sm:hidden"
      />
    </div>
  )
}
