interface LabeledValue {
  handleSearch: () => void
}

export default function SearchButton({ handleSearch }: LabeledValue) {
  return (
    <button
      onClick={handleSearch}
      className="p-2 rounded-4xl bg-red-500 border border-gray-300 h-15 w-50 mt-7 text-center hover:cursor-pointer hover:bg-red-600 transition-colors duration-300"
    >
      Search
    </button>
  )
}
