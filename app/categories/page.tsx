import Link from 'next/link'
import { getCategories } from '@/lib/cosmic'
import { getMetafieldValue } from '@/lib/cosmic'

export const revalidate = 60

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">Categories</h1>
      <p className="mt-2 text-gray-500">Browse curated African news by topic.</p>

      {categories.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-5xl">🏷️</span>
          <h2 className="mt-4 text-xl font-bold text-ink">No categories yet</h2>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((category) => {
            const emoji = getMetafieldValue(category.metadata?.emoji)
            const name = getMetafieldValue(category.metadata?.name) || category.title
            const description = getMetafieldValue(category.metadata?.description)
            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-brand-200 transition-all"
              >
                <div className="text-4xl mb-3">{emoji || '🏷️'}</div>
                <h2 className="text-lg font-bold text-ink group-hover:text-brand-600 transition-colors">
                  {name}
                </h2>
                {description && (
                  <p className="mt-2 text-sm text-gray-500 line-clamp-3">{description}</p>
                )}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}