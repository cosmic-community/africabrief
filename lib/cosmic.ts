import { createBucketClient } from '@cosmicjs/sdk'
import type { NewsArticle, NewsCategory, WhatsAppBroadcast } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Safely render any metadata value as a string
export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

// Format a date string for display
export function formatDate(dateString?: string): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Fetch all news articles, newest first
export async function getArticles(): Promise<NewsArticle[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'news-articles' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    const articles = response.objects as NewsArticle[]
    return articles.sort((a, b) => {
      const dateA = new Date(a.metadata?.published_date || a.created_at || '').getTime()
      const dateB = new Date(b.metadata?.published_date || b.created_at || '').getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch news articles')
  }
}

// Fetch a single article by slug
export async function getArticle(slug: string): Promise<NewsArticle | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'news-articles', slug })
      .depth(1)

    const article = response.object as NewsArticle
    if (!article) return null
    return article
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch news article')
  }
}

// Fetch all categories
export async function getCategories(): Promise<NewsCategory[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'news-categories' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.objects as NewsCategory[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch categories')
  }
}

// Fetch a single category by slug
export async function getCategory(slug: string): Promise<NewsCategory | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'news-categories', slug })
      .depth(1)

    const category = response.object as NewsCategory
    if (!category) return null
    return category
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch category')
  }
}

// Fetch articles for a given category id
export async function getArticlesByCategory(categoryId: string): Promise<NewsArticle[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'news-articles', 'metadata.category': categoryId })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    const articles = response.objects as NewsArticle[]
    return articles.sort((a, b) => {
      const dateA = new Date(a.metadata?.published_date || a.created_at || '').getTime()
      const dateB = new Date(b.metadata?.published_date || b.created_at || '').getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch articles by category')
  }
}

// Fetch all broadcasts, newest first
export async function getBroadcasts(): Promise<WhatsAppBroadcast[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'whatsapp-broadcasts' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    const broadcasts = response.objects as WhatsAppBroadcast[]
    return broadcasts.sort((a, b) => {
      const dateA = new Date(a.metadata?.sent_at || a.created_at || '').getTime()
      const dateB = new Date(b.metadata?.sent_at || b.created_at || '').getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch broadcasts')
  }
}

// Fetch a single broadcast by slug
export async function getBroadcast(slug: string): Promise<WhatsAppBroadcast | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'whatsapp-broadcasts', slug })
      .depth(2)

    const broadcast = response.object as WhatsAppBroadcast
    if (!broadcast) return null
    return broadcast
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch broadcast')
  }
}