import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4 py-3">
        <Link
          href="/"
          className="text-2xl font-bold text-white hover:text-blue-400 transition-colors duration-200"
        >
          🎬 Movie Explorer
        </Link>
      </div>
    </header>
  )
}
