import React from 'react';


interface LabeledValue {
  query: string;
  setQuery: (value: string) => void;    
  event?: React.FormEvent<HTMLFormElement>;
}

const Search: React.FC<LabeledValue> = ({ query, setQuery }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    return (
        <input
            id='search-input'
            type="text"
            placeholder="Search..."
            className="p-2 rounded-4xl border border-gray-300 h-15 w-150 mt-7 text-center"
            value={query}
            onChange={handleChange}
        />
    );
}

export default Search;