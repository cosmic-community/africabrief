import Link from 'next/link'
import { getArticles, getCategories } from '@/lib/cosmic'
import ArticleCard from '@/components/ArticleCard'
import CategoryBadge from '@/components/CategoryBadge'

export const revalidate = 60

export default async function HomePage() {
  const [articles, categories] = await Promise.all([getArticles(), getCategories()])

  const featured = articles[0]
  const rest = articles.slice(1)

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-ink via-ink-soft to-brand-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-200 text-xs font-semibold mb-4">
              🤖 AI-Curated · ✍️ AP Style · 💬 WhatsApp-Ready
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
              The latest African news, distilled to{' '}
              <span className="text-brand-400">10 words.</span>
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              Our AI agent curates breaking stories, rewrites them in clean AP Style, and shares
              concise briefs straight to your WhatsApp community.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/broadcasts"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-whatsapp hover:bg-whatsapp-dark text-white font-semibold transition-colors"
              >
                💬 View Broadcasts
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category pills */}
        {categories.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mb-10">
            {categories.map((category) => (
              <CategoryBadge key={category.id} category={category} />
            ))}
          </div>
        )}

        {articles.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-5xl">📭</span>
            <h2 className="mt-4 text-xl font-bold text-ink">No news yet</h2>
            <p className="mt-2 text-gray-500">
              Once the AI agent curates articles, they will appear here.
            </p>
          </div>
        ) : (
          <>
            {/* Featured article */}
            {featured && (
              <section className="mb-12">
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
                  Top Story
                </h2>
                <FeaturedArticle article={featured} />
              </section>
            )}

            {/* Latest grid */}
            {rest.length > 0 && (
              <section>
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
                  Latest News
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  )
}

import type { NewsArticle } from '@/types'
import { getMetafieldValue, formatDate } from '@/lib/cosmic'

function FeaturedArticle({ article }: { article: NewsArticle }) {
  const headline = getMetafieldValue(article.metadata?.headline) || article.title
  const source = getMetafieldValue(article.metadata?.source_name)
  const date = formatDate(article.metadata?.published_date)
  const image = article.metadata?.featured_image
  const apVerified = article.metadata?.ap_style_verified === true

  return (
    <Link href={`/news/${article.slug}`} className="block group">
      <article className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all">
        {image && image.imgix_url ? (
          <div className="aspect-[16/10] lg:aspect-auto lg:h-full overflow-hidden bg-gray-100">
            <img
              src={`${image.imgix_url}?w=1200&h=750&fit=crop&auto=format,compress`}
              alt={headline}
              width={600}
              height={375}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="aspect-[16/10] lg:aspect-auto bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
            <span className="text-6xl">📰</span>
          </div>
        )}
        <div className="p-6 lg:p-8 flex flex-col justify-center">
          {apVerified && (
            <span className="inline-flex w-fit items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 mb-3">
              ✓ AP Style Verified
            </span>
          )}
          <h3 className="text-2xl sm:text-3xl font-extrabold text-ink leading-tight group-hover:text-brand-600 transition-colors">
            {headline}
          </h3>
          <div className="mt-5 flex items-center gap-3 text-sm text-gray-500">
            {source && <span className="font-semibold">{source}</span>}
            {source && date && <span>·</span>}
            {date && <span>{date}</span>}
          </div>
        </div>
      </article>
    </Link>
  )
}