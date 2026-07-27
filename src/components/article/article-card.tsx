import Link from 'next/link'
import { OptimizedImage } from '@/components/media/optimized-image'
import type { ArticleCardData } from '@/types/article'

interface ArticleCardProps {
  article: ArticleCardData
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={article.href} className="article">
      <OptimizedImage
        src={article.coverImage.src}
        alt={article.coverImage.alt}
        width={article.coverImage.width}
        height={article.coverImage.height}
        className="w-full h-[320px] object-cover"
      />
      <div className="article-content">
        <small>{article.categoryLabel}</small>
        <h3>{article.title}</h3>
        <p>
          {article.category === 'Design' && 'Discover how forged aluminum becomes a statement of luxury and performance.'}
          {article.category === 'Lifestyle' && 'A collection inspired by modern women who love driving beautifully.'}
          {article.category === 'Engineering' && 'Precision manufacturing without compromising visual identity.'}
        </p>
        <span>Read More →</span>
      </div>
    </Link>
  )
}

interface ArticleGridProps {
  articles: ArticleCardData[]
}

export function ArticleGrid({ articles }: ArticleGridProps) {
  return (
    <div className="journal-grid">
      {articles.map((a) => (
        <ArticleCard key={a.slug} article={a} />
      ))}
    </div>
  )
}
