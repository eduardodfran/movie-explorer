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
  const router = useRouter()

  const handleSearch = async () => {
    // Implement search logic here
    console.log('Searching for:', query)
    router.push(`/SearchResult?query=${encodeURIComponent(query)}`)
  }
  return (
    <main className="flex flex-col justify-center items-center h-screen gap-8">
      <h1 className={`text-8xl ${bitcount.className}`}>Movie Explorer</h1>
      <p className="text-4xl text-center">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero rerum
        commodi eum maxime ea iure excepturi. Voluptatem atque rem aliquid.
      </p>
      <Search query={query} setQuery={setQuery} />
      <SearchButton handleSearch={handleSearch} />
    </main>
  )
}
