import React, { useState, useEffect } from "react";
import { Grid, List } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../Product/ProductCard";
import ProductList from "../Product/ProductList";
import Product from "../Modals/Product";
import { Button } from "../ui/button";
import ProductSearchInput from "../Product/ProductSearchInput";
import ProductFilters from "../Product/ProductFilters";
import { useDispatch, useSelector } from "react-redux";
import { selectProductsItems } from "../utils/RandomGen";

const ProductSearch = () => {
  const [searchParams] = useSearchParams();
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

  const featuredProducts = useSelector(selectProductsItems);

  useEffect(() => {
    const initialQuery = searchParams.get("q");
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [searchParams]);

  useEffect(() => {
    let filtered = featuredProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase().trim().replace(/\s+/g, ""))
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
      <ProductSearchInput
        setShowFilters={setShowFilters}
        showFilters={showFilters}
        query={query}
        setQuery={setQuery}
      />

      <ProductFilters
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        filters={filters}
        setFilters={setFilters}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={categories}
        setQuery={setQuery}
      />

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
            <ProductList
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

export default ProductSearch;
