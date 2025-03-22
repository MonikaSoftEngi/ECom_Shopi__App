import React, { useState, useEffect } from "react";

const SearchBar = ({ setSearch }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => setSearch(query.toLowerCase()), 300);
    return () => clearTimeout(delay);
  }, [query, setSearch]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ minWidth: 400, padding: 10 }}
      />
    </div>
  );
};

export default SearchBar;
