import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">📰</span>
            <span className="text-xl font-extrabold tracking-tight text-ink">
              Africa<span className="text-brand-600">Brief</span>
            </span>
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/"
              className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors rounded-md hover:bg-gray-50"
            >
              News
            </Link>
            <Link
              href="/categories"
              className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors rounded-md hover:bg-gray-50"
            >
              Categories
            </Link>
            <Link
              href="/broadcasts"
              className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-whatsapp-dark transition-colors rounded-md hover:bg-gray-50"
            >
              Broadcasts
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}