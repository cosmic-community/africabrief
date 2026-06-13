import { getBroadcasts } from '@/lib/cosmic'
import BroadcastCard from '@/components/BroadcastCard'

export const revalidate = 60

export default async function BroadcastsPage() {
  const broadcasts = await getBroadcasts()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3">
        <span className="text-4xl">💬</span>
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
            WhatsApp Broadcasts
          </h1>
          <p className="mt-1 text-gray-500">News bundles shared to our communities.</p>
        </div>
      </div>

      {broadcasts.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-5xl">📭</span>
          <h2 className="mt-4 text-xl font-bold text-ink">No broadcasts yet</h2>
          <p className="mt-2 text-gray-500">
            Once the AI agent sends news to a WhatsApp community, it will appear here.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {broadcasts.map((broadcast) => (
            <BroadcastCard key={broadcast.id} broadcast={broadcast} />
          ))}
        </div>
      )}
    </div>
  )
}