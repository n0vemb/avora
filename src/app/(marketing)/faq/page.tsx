import { Container } from '@/components/layout/container'
import { getSupportPage } from '@/features/strapi/fetchers'

export default async function FaqPage() {
  const data = await getSupportPage()

  return (
    <div className="min-h-screen">
      <section className="hero" style={{ background: '#f7f7f7' }}>
        <Container className="hero-grid">
          <div>
            <div className="hero-sub">SUPPORT</div>
            <h1>{data.faqHeading}</h1>
            <p>{data.faqSubheading}</p>
          </div>
        </Container>
      </section>

      <section style={{ padding: '80px 0' }}>
        <Container>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="faq-list">
              {data.faqItems.map((item, index) => (
                <details key={index} className="faq-item">
                  <summary className="faq-question">
                    <span>{item.question}</span>
                    <span className="faq-icon">+</span>
                  </summary>
                  <div className="faq-answer">{item.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
