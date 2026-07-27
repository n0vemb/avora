import { Container } from '@/components/layout/container'
import { SectionHeader } from '@/components/layout/section-header'

export interface ProductGalleryProps {
  images: Array<{ src: string; alt: string; width: number; height: number }>
}

export function ProductGallery({ images }: ProductGalleryProps) {
  return (
    <div className="product-gallery">
      <Container>
        <h2>Product Gallery</h2>
        <p>Gallery items: {images.length}</p>
        {/* Placeholder implementation */}
      </Container>
    </div>
  )
}
