'use client'

import { useState } from 'react'
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
    <main className="flex flex-col justify-center items-center min-h-screen p-4">
      <h1 className="text-4xl mb-4">Search Results</h1>
      <Search query={query} setQuery={setQuery} onSearch={handleSearch} />
      {showEmptyWarning && (
        <p className="text-red-400 text-center mt-2 animate-pulse">
          Please enter a movie title to search
        </p>
      )}
      <div className="mt-8 w-full max-w-4xl">
        <h2 className="text-2xl mb-4">Results for: "{queryParam}"</h2>
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((movie) => (
              <div
                key={movie.id}
                className="border border-gray-300 rounded-lg p-4"
              >
                {movie.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-64 object-cover rounded mb-2"
                  />
                )}
                <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
                {movie.release_date && (
                  <p className="text-sm text-gray-400 mb-2">
                    {new Date(movie.release_date).getFullYear()}
                  </p>
                )}
                {movie.overview && (
                  <p className="text-sm text-gray-300 line-clamp-3">
                    {movie.overview}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">
            No movies found for "{queryParam}"
          </p>
        )}
      </div>
    </main>
  )
}
