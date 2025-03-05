import React from "react";

const ProductFilters = ({ 
  showFilters, 
  setShowFilters, 
  filters, 
  setFilters, 
  sortBy, 
  setSortBy, 
  setQuery,
  categories 
}) => {
  if (!showFilters) return null;

  return (
    <div className="mb-6 p-4 rounded-lg border border-gray-200 animate-fadeIn">
      <h3 className="font-medium mb-3">Filters</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm mb-1">Price Range</label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Min"
              className="w-full p-2 border rounded bg-transparent"
              value={filters.minPrice}
              onChange={(e) =>
                setFilters({ ...filters, minPrice: e.target.value })
              }
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              className="w-full p-2 border rounded bg-transparent"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters({ ...filters, maxPrice: e.target.value })
              }
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Categories</label>
          <select
            className="w-full p-2 border rounded bg-transparent"
            multiple={false}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "") {
                setFilters({ ...filters, categories: [] });
              } else {
                setFilters({ ...filters, categories: [value] });
              }
            }}
          >
            <option value="" className="dark:bg-black">
              All Categories
            </option>
            {categories.map((category) => (
              <option
                key={category}
                value={category}
                className="dark:bg-black w-64"
              >
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Sort By</label>
          <select
            className="w-full p-2 border rounded bg-transparent"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="relevance" className="dark:bg-black">
              Relevance
            </option>
            <option value="price-low" className="dark:bg-black">
              Price: Low to High
            </option>
            <option value="price-high" className="dark:bg-black">
              Price: High to Low
            </option>
            <option value="rating" className="dark:bg-black">
              Highest Rated
            </option>
            <option value="newest" className="dark:bg-black">
              Newest First
            </option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) =>
              setFilters({ ...filters, inStock: e.target.checked })
            }
          />
          <span>In Stock Only</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={filters.onSale}
            onChange={(e) =>
              setFilters({ ...filters, onSale: e.target.checked })
            }
          />
          <span>On Sale</span>
        </label>

        <div className="flex items-center space-x-2">
          <span>Min Rating:</span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setFilters({ ...filters, rating: star })}
                className={`text-2xl ${
                  star <= filters.rating
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>
          {filters.rating > 0 && (
            <button
              onClick={() => setFilters({ ...filters, rating: 0 })}
              className="text-xs text-gray-500"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={() => {
            setFilters({
              minPrice: "",
              maxPrice: "",
              categories: [],
              inStock: false,
              onSale: false,
              rating: 0,
            });
            setSortBy("relevance");
            setQuery("");
          }}
          className="text-blue-600 mr-4"
        >
          Reset All
        </button>
        <button
          onClick={() => setShowFilters(false)}
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default ProductFilters;