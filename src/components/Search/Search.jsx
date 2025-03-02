import React, { useState, useEffect } from "react";
import { Search, Grid, List, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import featuredProducts from "../utils/data";
import ProductCard from "../Product/ProductCard";
import Product from "../Modals/Product";
import { Button } from "../ui/button";

const ProductSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    categories: [],
    inStock: false,
    onSale: false,
    rating: 0,
  });
  const [sortBy, setSortBy] = useState("relevance");

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

    let filtered = featuredProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );

    if (filters.minPrice) {
      filtered = filtered.filter(
        (product) => product.price >= parseFloat(filters.minPrice) * 100
      );
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(
        (product) => product.price <= parseFloat(filters.maxPrice) * 100
      );
    }

    if (filters.categories.length > 0) {
      filtered = filtered.filter((product) =>
        filters.categories.includes(product.category)
      );
    }

    if (filters.inStock) {
      filtered = filtered.filter(
        (product) => product.stockStatus === "In Stock"
      );
    }

    if (filters.onSale) {
      filtered = filtered.filter((product) => product.discount);
    }

    if (filters.rating > 0) {
      filtered = filtered.filter((product) => product.rating >= filters.rating);
    }

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered = filtered
          .filter((product) => product.isNew)
          .concat(filtered.filter((product) => !product.isNew));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);

    return () => clearTimeout(handler);
  }, [query, searchParams, filters, sortBy]);

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const isMobile = window.innerWidth < 1024;

  const handleAddToCart = (product) => {
    console.log(`Added to cart: ${product.title}`);
    showToast(`${product.title} added to cart`);
  };

  const [toast, setToast] = useState({ visible: false, message: "" });

  const showToast = (message) => {
    setToast({ visible: true, message });
    setTimeout(() => {
      setToast({ visible: false, message: "" });
    }, 3000);
  };

  const openModal = (product) => {
    setSelectedItem(product);
    setIsModalOpen(true);
    document.body.classList.add("overflow-hidden");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove("overflow-hidden");
  };

  const categories = [...new Set(featuredProducts.map((p) => p.category))];
  return (
    <div className="container mx-auto px-4 py-8">
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

      {showFilters && (
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
      )}

      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-gray-700">
            {filteredProducts.length} products found
          </span>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={() => setViewMode("grid")}
            className={`${viewMode === "grid" ? "bg-blue-600 text-white" : ""}`}
            aria-label="Grid view"
          >
            <Grid size={16} className="mr-1" /> Grid
          </Button>
          {!isMobile && (
            <Button
              onClick={() => setViewMode("list")}
              className={`${
                viewMode === "list" ? "bg-blue-600 text-white" : ""
              }`}
              aria-label="List view"
            >
              <List size={16} className="mr-1" /> List
            </Button>
          )}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-auto text-gray-400 mb-4"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <h2 className="text-xl font-medium">No products found</h2>
          <p className="text-gray-500 mt-2">
            Try a different search term or adjust your filters
          </p>
          <button
            onClick={() => {
              setQuery("");
              setFilters({
                minPrice: "",
                maxPrice: "",
                categories: [],
                inStock: false,
                onSale: false,
                rating: 0,
              });
            }}
            className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reset Search
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              openModal={openModal}
              toggleWishlist={toggleWishlist}
              wishlist={wishlist}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <ProductListItem
              key={product.id}
              product={product}
              openModal={openModal}
              toggleWishlist={toggleWishlist}
              wishlist={wishlist}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}

      <Product
        isOpen={isModalOpen}
        onClose={closeModal}
        product={selectedItem}
        onAddToCart={handleAddToCart}
      />

      {toast.visible && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fadeIn">
          {toast.message}
        </div>
      )}
    </div>
  );
};

const ProductListItem = ({
  product,
  openModal,
  toggleWishlist,
  wishlist,
  handleAddToCart,
}) => {
  return (
    <div className="border rounded-lg p-4 grid grid-cols-1 md:grid-cols-12 gap-4 hover:shadow-md transition-shadow ">
      <div className="relative md:col-span-3">
        <div className="aspect-square overflow-hidden rounded-md group">
          <img
            src={product.image || "/api/placeholder/200/200"}
            alt={product.title}
            className="w-full h-full object-cover rounded cursor-pointer group-hover:scale-105 transition-transform duration-300"
            onClick={() => openModal(product)}
          />
        </div>
        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-2 right-2 p-1.5 rounded-full shadow-md transition-colors"
          aria-label={
            wishlist.includes(product.id)
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={wishlist.includes(product.id) ? "red" : "none"}
            stroke={wishlist.includes(product.id) ? "red" : "currentColor"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
        {product.discount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-md">
            {product.discount}
          </span>
        )}
      </div>

      <div className="md:col-span-6 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap gap-1 mb-2">
            {product.isNew && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full font-medium">
                New
              </span>
            )}
            {product.isBestSeller && (
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full font-medium">
                Best Seller
              </span>
            )}
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full font-medium">
              {product.category}
            </span>
          </div>

          <h3
            className="font-semibold text-lg mb-1 cursor-pointer hover:text-blue-600 transition-colors"
            onClick={() => openModal(product)}
          >
            {product.title}
          </h3>

          <div className="flex items-center mb-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={
                    i < Math.floor(product.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                >
                  ★
                </span>
              ))}
            </div>
            <span className="ml-2 text-xs text-gray-600">
              ({product.reviews} reviews)
            </span>
          </div>

          <p className="text-gray-600 text-sm line-clamp-2 mb-2">
            {product.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center mt-2 text-sm text-gray-500">
          <span
            className={`mr-4 ${
              product.stockStatus === "In Stock"
                ? "text-green-600"
                : "text-orange-600"
            }`}
          >
            • {product.stockStatus}
          </span>
          <span className="mr-4">• {product.shipping}</span>
        </div>
      </div>

      <div className="md:col-span-3 flex flex-col justify-between border-t pt-4 md:border-t-0 md:pt-0 md:border-l md:pl-4">
        <div>
          <div className="flex items-baseline">
            <span className="font-bold text-xl text-gray-900 dark:text-gray-300">
              ${(product.price / 100).toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="ml-2 text-gray-500 line-through text-sm">
                ${(product.originalPrice / 100).toFixed(2)}
              </span>
            )}
            {product.originalPrice && (
              <span className="ml-2 text-green-600 text-sm font-medium">
                {Math.round((1 - product.price / product.originalPrice) * 100)}%
                off
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <button
            onClick={() => handleAddToCart(product)}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            Add to Cart
          </button>

          <button
            onClick={() => openModal(product)}
            className="border border-gray-300 py-2 px-4 rounded-lg transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
