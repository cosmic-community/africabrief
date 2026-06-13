export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-ink text-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📰</span>
            <span className="text-lg font-bold text-white">
              Africa<span className="text-brand-500">Brief</span>
            </span>
          </div>
          <p className="text-sm text-gray-400 text-center">
            AI-curated African news, rewritten in AP Style. Shared to WhatsApp communities.
          </p>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-700 text-center text-xs text-gray-500">
          © {year} AfricaBrief. All rights reserved.
        </div>
      </div>
    </footer>
  )
}