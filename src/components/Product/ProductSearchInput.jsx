import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../ui/button";
import { SlidersHorizontal } from "lucide-react";

const ProductSearchInput = ({ setShowFilters, showFilters }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const initialQuery = searchParams.get("q");
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [searchParams]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query) {
        setSearchParams({ q: query });
      } else {
        setSearchParams({});
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [query, setSearchParams]);

  return (
    <div className="mb-6">
      <div className="relative flex items-center gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full p-3 pl-10 border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 transition-all"
          aria-label="Search products"
        />
        <div className="absolute left-3 text-gray-400">
          <Search size={20} />
        </div>
        <Button
          onClick={() => setShowFilters(!showFilters)}
          aria-label="Toggle filters"
        >
          <SlidersHorizontal size={20} />
        </Button>
      </div>
    </div>
  );
};

export default ProductSearchInput;