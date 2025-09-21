'use client'

import Search from '@/components/Search'
import SearchButton from '@/components/SearchButton'
import { Bitcount, Bitcount_Grid_Double } from 'next/font/google'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const bitcount = Bitcount({
  variable: '--font-bitcount',
  subsets: ['latin'],
})

const bitcount_grid_double = Bitcount_Grid_Double({
  variable: '--font-bitcount-grid-double',
  subsets: ['latin'],
})

export default function Home() {
  const [query, setQuery] = useState('')
  const [showEmptyWarning, setShowEmptyWarning] = useState(false)
  const router = useRouter()

  const handleSearch = async () => {
    // Prevent search if query is empty or only whitespace
    if (!query.trim()) {
      setShowEmptyWarning(true)
      setTimeout(() => setShowEmptyWarning(false), 3000) // Hide after 3 seconds
      return
    }

    setShowEmptyWarning(false)
    console.log('Searching for:', query)
    router.push(`/SearchResult?query=${encodeURIComponent(query)}`)
  }
  return (
    <main className="flex flex-col justify-center items-center h-screen gap-8 overflow-hidden">
      <h1
        className={`text-8xl ${bitcount.className} animate-fadeInUp`}
        style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}
      >
        Movie Explorer
      </h1>
      <p
        className="text-4xl text-center mx-100 max-w-4xl animate-fadeInUp"
        style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}
      >
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero rerum
        commodi eum maxime ea iure excepturi. Voluptatem atque rem aliquid.
      </p>
      <div
        className="animate-fadeInUp"
        style={{ animationDelay: '0.6s', animationFillMode: 'backwards' }}
      >
        <Search query={query} setQuery={setQuery} onSearch={handleSearch} />
        {showEmptyWarning && (
          <p className="text-red-400 text-center mt-2 animate-pulse">
            Please enter a movie title to search
          </p>
        )}
      </div>
      <div
        className="animate-fadeInUp"
        style={{ animationDelay: '0.8s', animationFillMode: 'backwards' }}
      >
        <SearchButton handleSearch={handleSearch} />
      </div>
    </main>
  )
}
