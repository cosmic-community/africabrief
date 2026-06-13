import Link from 'next/link'
import type { WhatsAppBroadcast } from '@/types'
import { getMetafieldValue, formatDate } from '@/lib/cosmic'
import StatusBadge from '@/components/StatusBadge'

interface BroadcastCardProps {
  broadcast: WhatsAppBroadcast
}

export default function BroadcastCard({ broadcast }: BroadcastCardProps) {
  const title = getMetafieldValue(broadcast.metadata?.broadcast_title) || broadcast.title
  const preview = getMetafieldValue(broadcast.metadata?.message_preview)
  const community = getMetafieldValue(broadcast.metadata?.community_name)
  const sentAt = formatDate(broadcast.metadata?.sent_at)
  const articles = broadcast.metadata?.articles_included
  const count = Array.isArray(articles) ? articles.length : 0

  return (
    <Link href={`/broadcasts/${broadcast.slug}`} className="block group">
      <article className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-whatsapp/40 transition-all duration-200">
        <div className="bg-whatsapp/10 px-5 py-3 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-lg">💬</span>
            {community && (
              <span className="text-sm font-semibold text-whatsapp-dark truncate">{community}</span>
            )}
          </div>
          <StatusBadge status={broadcast.metadata?.delivery_status} variant="delivery" />
        </div>

        <div className="p-5">
          <h2 className="text-lg font-bold text-ink leading-snug group-hover:text-whatsapp-dark transition-colors">
            {title}
          </h2>
          {preview && (
            <p className="mt-2 text-sm text-gray-600 line-clamp-2">{preview}</p>
          )}
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span className="font-medium">
              {count} {count === 1 ? 'article' : 'articles'}
            </span>
            {sentAt && <span>{sentAt}</span>}
          </div>
        </div>
      </article>
    </Link>
  )
}