import { useState } from 'react'
import Search from '@/components/Search'

export default function SearchResultPage() {
  const [results, setResults] = useState([])
  const [query, setQuery] = useState('')

  const handleSearch = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/search?query=${encodeURIComponent(query)}`
      )
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setResults(data.results || [])
    } catch (error) {
      console.error('Error fetching search results:', error)
    }
  }

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl">Search Results</h1>
      <Search query={query} setQuery={setQuery} onSearch={handleSearch} />
    </main>
  )
}
