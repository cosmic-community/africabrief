// app/news/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArticle, getMetafieldValue, formatDate } from '@/lib/cosmic'
import CategoryBadge from '@/components/CategoryBadge'
import StatusBadge from '@/components/StatusBadge'

export const revalidate = 60

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    notFound()
  }

  const headline = getMetafieldValue(article.metadata?.headline) || article.title
  const body = getMetafieldValue(article.metadata?.body)
  const sourceName = getMetafieldValue(article.metadata?.source_name)
  const sourceUrl = getMetafieldValue(article.metadata?.source_url)
  const date = formatDate(article.metadata?.published_date)
  const image = article.metadata?.featured_image
  const category = article.metadata?.category
  const apVerified = article.metadata?.ap_style_verified === true

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-brand-600 transition-colors mb-6"
      >
        ← Back to news
      </Link>

      <div className="flex items-center gap-2 flex-wrap mb-4">
        {category && typeof category === 'object' && <CategoryBadge category={category} />}
        <StatusBadge status={article.metadata?.curation_status} />
        {apVerified && (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
            ✓ AP Style Verified
          </span>
        )}
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-ink leading-tight tracking-tight">
        {headline}
      </h1>

      <div className="mt-4 flex items-center gap-3 text-sm text-gray-500">
        {sourceName && <span className="font-semibold">{sourceName}</span>}
        {sourceName && date && <span>·</span>}
        {date && <span>{date}</span>}
      </div>

      {image && image.imgix_url && (
        <div className="mt-8 rounded-2xl overflow-hidden bg-gray-100">
          <img
            src={`${image.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
            alt={headline}
            width={800}
            height={450}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {body && (
        <div className="mt-8 prose prose-lg max-w-none prose-headings:text-ink prose-p:text-gray-700 prose-a:text-brand-600">
          {body.split('\n').filter(Boolean).map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      )}

      {sourceUrl && (
        <div className="mt-10 pt-6 border-t border-gray-200">
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold transition-colors"
          >
            Read original source ↗
          </a>
        </div>
      )}
    </article>
  )
}