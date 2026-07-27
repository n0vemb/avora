import { Container } from '@/components/layout/container'
import { ArticleGrid } from '@/components/article/article-card'
import type { JournalSectionProps } from '@/types/article'

export function JournalSection({ heading, subheading, articles }: JournalSectionProps) {
  return (
    <section className="journal">
      <Container>
        <div className="collections-title">
          <div className="hero-sub">{subheading}</div>
          <h2>{heading}</h2>
        </div>
        <ArticleGrid articles={articles} />
      </Container>
    </section>
  )
}
