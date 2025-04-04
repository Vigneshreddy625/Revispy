import React, { useState, useEffect } from "react";
import { Grid, List, X } from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ProductCard from "../Product/ProductCard";
import ProductList from "../Product/ProductList";
import Product from "../Modals/Product";
import { Button } from "../ui/button";
import ProductSearchInput from "../Product/ProductSearchInput";
import ProductFilters from "../Product/ProductFilters";
import { useSelector } from "react-redux";
import { selectProductsItems } from "../utils/RandomGen";

const CategoryPage = () => {
  const { categoryName } = useParams();
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

  const navigate = useNavigate();

  useEffect(() => {
    if (categoryName) {
      setQuery(categoryName);
    } else {
      const initialQuery = searchParams.get("categoryName");
      if (initialQuery) {
        setQuery(initialQuery);
      }
    }
  }, [categoryName, searchParams]);

  useEffect(() => {
    let filtered = featuredProducts;

    if (categoryName) {
      filtered = featuredProducts.filter(
        (product) =>
          product.category.toLowerCase() === categoryName.toLowerCase()
      );
    } else if (query) {
      filtered = featuredProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
      );
    }

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
  }, [categoryName, query, searchParams, filters, sortBy]);

  const isMobile = window.innerWidth < 1024;

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
    <div className="container relative mx-auto px-4 py-8">
        <div className="absolute top-8 right-4 cursor-pointer" onClick={() => navigate(-1)}><X/></div>

      {categoryName && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2 capitalize">{categoryName}</h1>
          <p className="">Browse our selection of {categoryName} products</p>
        </div>
      )}

      <ProductFilters
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        filters={filters}
        setFilters={setFilters}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={categories}
      />

      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="">
            {filteredProducts.length} products found
            {categoryName && ` in ${categoryName}`}
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
            {categoryName
              ? `We couldn't find any products in the ${categoryName} category`
              : "Try a different search term or adjust your filters"}
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
            Reset Filters
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              openModal={openModal}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <ProductList
              key={product._id}
              product={product}
              openModal={openModal}
            />
          ))}
        </div>
      )}

      <Product
        isOpen={isModalOpen}
        onClose={closeModal}
        product={selectedItem}
      />
    </div>
  );
};

export default CategoryPage;
