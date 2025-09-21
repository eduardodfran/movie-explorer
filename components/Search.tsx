import React from 'react'

interface LabeledValue {
  query: string
  setQuery: (value: string) => void
  event?: React.FormEvent<HTMLFormElement>
  onSearch?: () => void
}

const Search: React.FC<LabeledValue> = ({ query, setQuery, onSearch }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && onSearch) {
      event.preventDefault()
      onSearch()
    }
  }

  return (
    <div className="relative">
      <input
        id="search-input"
        type="text"
        placeholder="Enter a movie title... (e.g., The Dark Knight)"
        className="search-input w-full p-4 rounded-2xl text-slate-100 text-center placeholder-slate-400 focus:outline-none text-lg font-medium"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <div className="absolute inset-0 rounded-2xl shimmer pointer-events-none opacity-30"></div>
    </div>
  )
}

export default Search
