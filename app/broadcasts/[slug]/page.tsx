// app/broadcasts/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBroadcast, getMetafieldValue, formatDate } from '@/lib/cosmic'
import StatusBadge from '@/components/StatusBadge'
import ArticleCard from '@/components/ArticleCard'
import type { NewsArticle } from '@/types'

export const revalidate = 60

export default async function BroadcastPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const broadcast = await getBroadcast(slug)

  if (!broadcast) {
    notFound()
  }

  const title = getMetafieldValue(broadcast.metadata?.broadcast_title) || broadcast.title
  const preview = getMetafieldValue(broadcast.metadata?.message_preview)
  const community = getMetafieldValue(broadcast.metadata?.community_name)
  const sentAt = formatDate(broadcast.metadata?.sent_at)
  const articlesRaw = broadcast.metadata?.articles_included
  const articles: NewsArticle[] = Array.isArray(articlesRaw) ? articlesRaw : []

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/broadcasts"
        className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-whatsapp-dark transition-colors mb-6"
      >
        ← All broadcasts
      </Link>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-whatsapp/10 px-6 py-4 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💬</span>
            {community && (
              <span className="text-sm font-semibold text-whatsapp-dark">{community}</span>
            )}
          </div>
          <StatusBadge status={broadcast.metadata?.delivery_status} variant="delivery" />
        </div>

        <div className="p-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink leading-tight">{title}</h1>
          {sentAt && <p className="mt-2 text-sm text-gray-500">Sent on {sentAt}</p>}

          {preview && (
            <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-100">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                Message Preview
              </p>
              <p className="text-gray-700 whitespace-pre-line">{preview}</p>
            </div>
          )}
        </div>
      </div>

      {articles.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-bold text-ink mb-4">
            Articles Included ({articles.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}