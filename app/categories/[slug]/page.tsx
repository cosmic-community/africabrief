// app/categories/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCategory, getArticlesByCategory, getMetafieldValue } from '@/lib/cosmic'
import ArticleCard from '@/components/ArticleCard'

export const revalidate = 60

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    notFound()
  }

  const articles = await getArticlesByCategory(category.id)
  const emoji = getMetafieldValue(category.metadata?.emoji)
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/categories"
        className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-brand-600 transition-colors mb-6"
      >
        ← All categories
      </Link>

      <div className="flex items-center gap-4">
        <span className="text-5xl">{emoji || '🏷️'}</span>
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">{name}</h1>
          {description && <p className="mt-1 text-gray-500">{description}</p>}
        </div>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-5xl">📭</span>
          <h2 className="mt-4 text-xl font-bold text-ink">No articles in this category yet</h2>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}