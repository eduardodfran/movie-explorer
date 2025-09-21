interface LabeledValue {
  handleSearch: () => void
}

export default function SearchButton({ handleSearch }: LabeledValue) {
  return (
    <button
      onClick={handleSearch}
      className="search-button px-8 py-4 rounded-2xl text-white font-semibold text-lg hover:cursor-pointer transition-all duration-300 flex items-center gap-3 group"
    >
      <span className="text-xl group-hover:scale-110 transition-transform">
        🎬
      </span>
      Search Movies
      <span className="text-xl group-hover:scale-110 transition-transform">
        🔍
      </span>
    </button>
  )
}
