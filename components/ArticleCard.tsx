import Link from 'next/link'
import type { NewsArticle } from '@/types'
import { getMetafieldValue, formatDate } from '@/lib/cosmic'
import CategoryBadge from '@/components/CategoryBadge'

interface ArticleCardProps {
  article: NewsArticle
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const headline = getMetafieldValue(article.metadata?.headline) || article.title
  const sourceName = getMetafieldValue(article.metadata?.source_name)
  const publishedDate = formatDate(article.metadata?.published_date)
  const featuredImage = article.metadata?.featured_image
  const category = article.metadata?.category
  const apVerified = article.metadata?.ap_style_verified === true

  return (
    <article className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-brand-200 transition-all duration-200 flex flex-col">
      <Link href={`/news/${article.slug}`} className="block">
        {featuredImage && featuredImage.imgix_url ? (
          <div className="aspect-[16/9] overflow-hidden bg-gray-100">
            <img
              src={`${featuredImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={headline}
              width={400}
              height={225}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="aspect-[16/9] bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
            <span className="text-4xl">📰</span>
          </div>
        )}
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {category && typeof category === 'object' && <CategoryBadge category={category} />}
          {apVerified && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
              ✓ AP Style
            </span>
          )}
        </div>

        <Link href={`/news/${article.slug}`}>
          <h2 className="text-lg font-bold text-ink leading-snug group-hover:text-brand-600 transition-colors line-clamp-3">
            {headline}
          </h2>
        </Link>

        <div className="mt-auto pt-4 flex items-center justify-between text-xs text-gray-500">
          {sourceName && <span className="font-medium truncate">{sourceName}</span>}
          {publishedDate && <span>{publishedDate}</span>}
        </div>
      </div>
    </article>
  )
}