import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <span className="text-6xl">🗞️</span>
      <h1 className="mt-6 text-3xl font-extrabold text-ink">Page Not Found</h1>
      <p className="mt-2 text-gray-500">
        The story you are looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold transition-colors"
      >
        ← Back to AfricaBrief
      </Link>
    </div>
  )
}