import Link from 'next/link'
import type { NewsCategory } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface CategoryBadgeProps {
  category: NewsCategory
  linkable?: boolean
}

export default function CategoryBadge({ category, linkable = true }: CategoryBadgeProps) {
  const emoji = getMetafieldValue(category.metadata?.emoji)
  const name = getMetafieldValue(category.metadata?.name) || category.title

  const content = (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-100 text-brand-700 hover:bg-brand-200 transition-colors">
      {emoji && <span>{emoji}</span>}
      <span>{name}</span>
    </span>
  )

  if (!linkable) {
    return content
  }

  return <Link href={`/categories/${category.slug}`}>{content}</Link>
}