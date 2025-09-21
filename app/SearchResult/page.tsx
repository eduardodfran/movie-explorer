'use client'

import { useState } from 'react'
import Search from '@/components/Search'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import router, { useRouter } from 'next/router'

interface Movie {
  id: number
  title: string
}

export default function SearchResultPage() {
  const [results, setResults] = useState<Movie[]>([])
  const [query, setQuery] = useState('')
  const searchParams = useSearchParams()
  const queryParam = searchParams.get('query') || ''
  const [isLoading, setIsLoading] = useState<Boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/search?query=${encodeURIComponent(queryParam)}`
        )
        if (!res.ok) throw new Error(await res.text())
        const data = await res.json()
        setResults(data.data.results || [])
      } catch (err) {
        console.error('search error', err)
      } finally {
        setIsLoading(false)
        router.push('/SearchResultPage')

      }
    }

    fetchData().catch(console.error)
  }, [queryParam])

  const handleSearch = async () => {
    console.log('handleSearch invoked, query=', query) // browser console
    try {
      const res = await fetch(
        `http://localhost:3001/search?query=${encodeURIComponent(query)}`
      )
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setResults(data.data.results || [])
    } catch (err) {
      console.error('search error', err)
    }
  }

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl">Search Results</h1>
      <Search query={query} setQuery={setQuery} onSearch={handleSearch} />
      <div className="mt-4 w-full max-w-2xl">
        <h1 className="text-2xl">Results for: {queryParam}</h1>
        {isLoading ? (
          <p>Loading</p>
        ) : (
          <ul>
            {results.map((movie) => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
