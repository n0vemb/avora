import { Container } from '@/components/layout/container'
import { getSupportPage } from '@/features/strapi/fetchers'

export default async function ShippingPage() {
  const data = await getSupportPage()

  return (
    <div className="min-h-screen">
      <section className="hero" style={{ background: '#f7f7f7' }}>
        <Container className="hero-grid">
          <div>
            <div className="hero-sub">SUPPORT</div>
            <h1>{data.shippingHeading}</h1>
            <p>Every AVORA wheel ships with full tracking and insurance.</p>
          </div>
        </Container>
      </section>

      <section style={{ padding: '80px 0' }}>
        <Container>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="support-content">
              {data.shippingContent.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
