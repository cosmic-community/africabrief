import { getMetafieldValue } from '@/lib/cosmic'

interface StatusBadgeProps {
  status?: string
  variant?: 'curation' | 'delivery'
}

export default function StatusBadge({ status, variant = 'curation' }: StatusBadgeProps) {
  const value = getMetafieldValue(status)
  if (!value) return null

  const colorMap: Record<string, string> = {
    Draft: 'bg-gray-100 text-gray-700',
    Curated: 'bg-blue-100 text-blue-700',
    Published: 'bg-green-100 text-green-700',
    Broadcasted: 'bg-whatsapp/20 text-whatsapp-dark',
    Pending: 'bg-yellow-100 text-yellow-700',
    Sent: 'bg-green-100 text-green-700',
    Failed: 'bg-red-100 text-red-700',
  }

  const classes = colorMap[value] || 'bg-gray-100 text-gray-700'

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${classes}`}>
      {value}
    </span>
  )
}