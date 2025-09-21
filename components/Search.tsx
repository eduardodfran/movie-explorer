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
    <input
      id="search-input"
      type="text"
      placeholder="Enter a movie title..."
      className="p-2 rounded-4xl border border-gray-300 h-15 w-150 mt-7 text-center placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
      value={query}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  )
}

export default Search
