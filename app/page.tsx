'use client'

import Header from '@/components/Header'
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
    <>
      <Header />
      {/* Animated background */}
      <div className="fixed inset-0 -z-10 movie-gradient">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute top-1/2 left-1/3 w-48 h-48 bg-slate-600/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      <main className="relative flex flex-col justify-center items-center min-h-screen gap-12 overflow-hidden px-4">
        {/* Hero Section */}
        <div className="text-center max-w-6xl mx-auto pt-20">
          {/* Main Title */}
          <h1
            className={`text-6xl md:text-8xl font-bold bg-gradient-to-r from-slate-200 via-white to-slate-200 bg-clip-text text-transparent ${bitcount.className} animate-fadeInUp mb-6`}
            style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}
          >
            <span className="inline-block animate-float">🎬</span>
            <span className="mx-4">Movie Explorer</span>
            <span
              className="inline-block animate-float"
              style={{ animationDelay: '0.5s' }}
            >
              🍿
            </span>
          </h1>

          {/* Subtitle */}
          <div
            className="animate-fadeInUp mb-8"
            style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}
          >
            <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed mb-4">
              Discover your next favorite film from millions of movies
            </p>
            <div className="flex justify-center items-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                Real-time search
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                Latest releases
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                High-quality data
              </span>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div
          className="w-full max-w-2xl mx-auto animate-fadeInUp"
          style={{ animationDelay: '0.6s', animationFillMode: 'backwards' }}
        >
          <div className="glass rounded-3xl p-8 backdrop-blur-xl border border-slate-600/30 shadow-2xl">
            <div className="space-y-6">
              <Search
                query={query}
                setQuery={setQuery}
                onSearch={handleSearch}
              />

              {showEmptyWarning && (
                <div className="animate-fadeInUp">
                  <div className="bg-red-900/30 border border-red-500/50 rounded-2xl p-4 backdrop-blur-sm">
                    <p className="text-red-300 text-center flex items-center justify-center gap-2">
                      <span className="text-xl">⚠️</span>
                      Please enter a movie title to search
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-center">
                <SearchButton handleSearch={handleSearch} />
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fadeInUp"
          style={{ animationDelay: '0.8s', animationFillMode: 'backwards' }}
        >
          <div className="glass rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">
              Smart Search
            </h3>
            <p className="text-slate-300 text-sm">
              Advanced algorithms to find exactly what you're looking for
            </p>
          </div>

          <div
            className="glass rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">
              Ratings & Reviews
            </h3>
            <p className="text-slate-300 text-sm">
              Get comprehensive ratings and user reviews for every movie
            </p>
          </div>

          <div
            className="glass rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">
              Responsive Design
            </h3>
            <p className="text-slate-300 text-sm">
              Perfect experience across all your devices and screen sizes
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className="text-center animate-fadeInUp pb-10"
          style={{ animationDelay: '1.0s', animationFillMode: 'backwards' }}
        >
          <p className="text-slate-300 mb-4">
            Ready to discover your next favorite movie?
          </p>
          <div className="flex justify-center items-center gap-2">
            <span className="text-amber-400 animate-pulse">✨</span>
            <span className="text-slate-100 font-medium">
              Start exploring now
            </span>
            <span className="text-amber-400 animate-pulse">✨</span>
          </div>
        </div>
      </main>
    </>
  )
}
