'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Search from '@/components/Search'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface Movie {
  id: number
  title: string
  overview?: string
  release_date?: string
  poster_path?: string
}

export default function SearchResultPage() {
  const [results, setResults] = useState<Movie[]>([])
  const [query, setQuery] = useState('')
  const [showEmptyWarning, setShowEmptyWarning] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const queryParam = searchParams.get('query') || ''
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (queryParam) {
      setIsLoading(true)
      const fetchData = async () => {
        try {
          const res = await fetch(
            `http://localhost:3001/search?query=${encodeURIComponent(
              queryParam
            )}`
          )
          if (!res.ok) throw new Error(await res.text())
          const data = await res.json()
          setResults(data.data.results || [])
        } catch (err) {
          console.error('search error', err)
        } finally {
          setIsLoading(false)
        }
      }

      fetchData().catch(console.error)
    }
  }, [queryParam])

  const handleSearch = async () => {
    console.log('handleSearch invoked, query=', query)

    // Prevent search if query is empty or only whitespace
    if (!query.trim()) {
      setShowEmptyWarning(true)
      setTimeout(() => setShowEmptyWarning(false), 3000)
      return
    }

    setShowEmptyWarning(false)

    // Navigate to new search results
    router.push(`/SearchResult?query=${encodeURIComponent(query)}`)
  }

  return (
    <>
      <Header />
      <main className="flex flex-col justify-center items-center min-h-screen p-4 pt-20">
        <h1 className="text-4xl mb-4">Search Results</h1>
        <Search query={query} setQuery={setQuery} onSearch={handleSearch} />
        {showEmptyWarning && (
          <p className="text-red-400 text-center mt-2 animate-pulse">
            Please enter a movie title to search
          </p>
        )}
        <div className="mt-8 w-full">
          <h2 className="text-2xl mb-4 text-center">
            Results for: "{queryParam}"
          </h2>
          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : results.length > 0 ? (
            <div className="relative">
              {/* Movie Grid */}
              <div className="grid grid-cols-7 w-full">
                {results.map((movie, index) => (
                  <div
                    key={movie.id}
                    className={`
                    relative group cursor-pointer transition-all duration-300 
                    hover:scale-105 hover:z-10
                    ${index < 7 ? 'fade-top-row' : ''}
                  `}
                  >
                    {/* Movie Poster */}
                    <div className="w-full aspect-[2/3] overflow-hidden">
                      {movie.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                          <span className="text-gray-400 text-sm text-center p-2">
                            No Image
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Hover Overlay with Details */}
                    <div className="absolute inset-0 bg-black bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <h3 className="text-white text-lg font-bold mb-2 line-clamp-2">
                        {movie.title}
                      </h3>
                      {movie.release_date && (
                        <p className="text-gray-300 text-sm mb-2">
                          {new Date(movie.release_date).getFullYear()}
                        </p>
                      )}
                      {movie.overview && (
                        <p className="text-gray-300 text-sm line-clamp-4">
                          {movie.overview}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-400">
              No movies found for "{queryParam}"
            </p>
          )}
        </div>
      </main>
    </>
  )
}
