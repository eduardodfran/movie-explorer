
import { useState } from "react";
import Search from "@/components/Search";



export default function SearchResultPage() {
    const [results, setResults] = useState([]);
    const [query, setQuery] = useState("");

    const handleSearch = async () => {
        

    }



  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl">Search Results</h1>
      <Search query={query} setQuery={setQuery} onSearch={handleSearch} />
    </main>
  );
}
