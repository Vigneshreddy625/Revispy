import React, { useState, useEffect } from "react";
import ProductCard from "../Product/ProductCard";
import { Button } from "../ui/button";
import {
  ChevronDown,
  Filter,
  Grid3X3,
  List,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "https://i.pinimg.com/736x/51/d3/88/51d38806d50482762c700eca5717a32f.jpg",
    featured: true,
  },
  {
    id: 2,
    name: "Fashion",
    image: "https://assets.vogue.com/photos/61e9c43c8aa98afba69ec2e8/master/w_2560%2Cc_limit/00_story.jpg",
    featured: true,
  },
  {
    id: 3,
    name: "Home & Furniture",
    image: "https://media.istockphoto.com/id/943910360/photo/posters-in-cozy-apartment-interior.jpg?s=612x612&w=0&k=20&c=QzNjsxCNMcFNxpn4E2ocPvSU8Ud2S3B_mHyo5L-HOLo=",
    featured: true,
  },
  {
    id: 4,
    name: "Beauty & Health",
    image: "https://img.freepik.com/premium-vector/beauty-health-illustration-with-natural-cosmetics-eco-products-skin-treatment-face_2175-13450.jpg",
    featured: true,
  },
  { id: 5, name: "Sports", image: "https://media.istockphoto.com/id/1188462138/photo/variety-of-sport-accessories-on-wooden-surface.jpg?s=612x612&w=0&k=20&c=y2l7DYNkxbVteZy-Kx_adCzm-soTRbiEypje4j8ENe0=", featured: true },
  { id: 6, name: "Toys & Games", image: "https://dailysale.com/cdn/shop/collections/toys-games-879935.jpg?v=1737087607" },
  { id: 7, name: "Books", image: "/images/books-banner.jpg" },
  { id: 8, name: "Jewelry", image: "/images/jewelry-banner.jpg" },
];

const subcategories = {
  Electronics: ["Smartphones", "Laptops", "Audio", "Cameras", "Accessories"],
  Fashion: [
    "Men's Clothing",
    "Women's Clothing",
    "Kids",
    "Footwear",
    "Accessories",
  ],
  "Home & Furniture": [
    "Living Room",
    "Bedroom",
    "Kitchen",
    "Bathroom",
    "Outdoor",
  ],
  "Beauty & Health": [
    "Skincare",
    "Makeup",
    "Hair Care",
    "Personal Care",
    "Wellness",
  ],
  Sports: [
    "Fitness Equipment",
    "Sportswear",
    "Outdoor",
    "Team Sports",
    "Water Sports",
  ],
  "Toys & Games": [
    "Action Figures",
    "Board Games",
    "Puzzles",
    "Educational",
    "Outdoor Toys",
  ],
  Books: ["Fiction", "Non-fiction", "Children's Books", "Textbooks", "E-books"],
  Jewelry: ["Necklaces", "Earrings", "Bracelets", "Rings", "Watches"],
};

const sampleProducts = [
  {
    id: 1,
    title: "Latest Smartphone Model X",
    image: "/images/phone.jpg",
    price: 29999,
    oldPrice: 32999,
    rating: 4.5,
    reviews: 120,
    isNew: true,
    category: "Electronics",
    subcategory: "Smartphones",
    stock: 15,
  },
  {
    id: 2,
    title: "Premium Running Shoes",
    image: "/images/shoes.jpg",
    price: 4999,
    oldPrice: 5499,
    rating: 4.2,
    reviews: 85,
    discount: "10% OFF",
    category: "Fashion",
    subcategory: "Footwear",
    stock: 25,
  },
  {
    id: 3,
    title: "Modern Sofa Set",
    image: "/images/sofa.jpg",
    price: 19999,
    rating: 4.7,
    reviews: 40,
    stockStatus: "Limited Stock",
    stockQuantity: 5,
    category: "Home & Furniture",
    subcategory: "Living Room",
    stock: 5,
  },
  {
    id: 4,
    title: "Wireless Earbuds Pro",
    image: "/images/earbuds.jpg",
    price: 7999,
    oldPrice: 9999,
    rating: 4.8,
    reviews: 230,
    isNew: true,
    category: "Electronics",
    subcategory: "Audio",
    stock: 30,
  },
  {
    id: 5,
    title: "Designer Handbag",
    image: "/images/handbag.jpg",
    price: 8999,
    rating: 4.4,
    reviews: 65,
    isNew: true,
    category: "Fashion",
    subcategory: "Accessories",
    stock: 12,
  },
  {
    id: 6,
    title: "Smart HD Television",
    image: "/images/tv.jpg",
    price: 35999,
    oldPrice: 39999,
    rating: 4.6,
    reviews: 78,
    category: "Electronics",
    subcategory: "Televisions",
    stock: 8,
  },
];

const priceRanges = [
  { id: "price-1", label: "Under ₹5,000", min: 0, max: 5000 },
  { id: "price-2", label: "₹5,000 - ₹10,000", min: 5000, max: 10000 },
  { id: "price-3", label: "₹10,000 - ₹20,000", min: 10000, max: 20000 },
  { id: "price-4", label: "Over ₹20,000", min: 20000, max: Infinity },
];

const ratingOptions = [
  { id: "rating-4", label: "4★ & Above", value: 4 },
  { id: "rating-3", label: "3★ & Above", value: 3 },
  { id: "rating-2", label: "2★ & Above", value: 2 },
];

const sortOptions = [
  { id: "popularity", label: "Popularity" },
  { id: "price-low", label: "Price: Low to High" },
  { id: "price-high", label: "Price: High to Low" },
  { id: "newest", label: "Newest First" },
  { id: "rating", label: "Customer Rating" },
];

const CategoriesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [sortBy, setSortBy] = useState("popularity");
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  const featuredCategories = categories.filter((cat) => cat.featured);
  const additionalCategories = categories.filter((cat) => !cat.featured);

  useEffect(() => {
    let result = [...sampleProducts];

    if (selectedCategory) {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (selectedSubcategory) {
      result = result.filter(
        (product) => product.subcategory === selectedSubcategory
      );
    }

    if (activeFilter === "new") {
      result = result.filter((product) => product.isNew);
    } else if (activeFilter === "sale") {
      result = result.filter((product) => product.discount || product.oldPrice);
    } else if (activeFilter === "limited") {
      result = result.filter(
        (product) =>
          product.stockStatus === "Limited Stock" || product.stock < 10
      );
    }

    if (selectedPriceRange) {
      const range = priceRanges.find((r) => r.id === selectedPriceRange);
      if (range) {
        result = result.filter(
          (product) => product.price >= range.min && product.price <= range.max
        );
      }
    }

    if (selectedRating) {
      const rating = ratingOptions.find((r) => r.id === selectedRating);
      if (rating) {
        result = result.filter((product) => product.rating >= rating.value);
      }
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          (product.subcategory &&
            product.subcategory.toLowerCase().includes(query))
      );
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(result);
  }, [
    selectedCategory,
    selectedSubcategory,
    activeFilter,
    searchQuery,
    selectedPriceRange,
    selectedRating,
    sortBy,
  ]);

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  const openModal = (product) => {
    setSelectedItem(product);
    setIsModalOpen(true);

    if (!recentlyViewed.find((item) => item.id === product.id)) {
      setRecentlyViewed((prev) => [product, ...prev].slice(0, 4));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddToCart = (productDetails) => {
    console.log("Adding to cart:", productDetails);
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setSelectedSubcategory(null);
    setShowFilters(false);
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  const clearAllFilters = () => {
    setActiveFilter("all");
    setSelectedPriceRange(null);
    setSelectedRating(null);
    setSortBy("popularity");
    setSearchQuery("");
  };

  const totalFilterCount = [
    activeFilter !== "all",
    selectedPriceRange,
    selectedRating,
  ].filter(Boolean).length;

  return (
    <div className="px-4 py-8">
      {!selectedCategory && (
        <div className="mb-12 relative overflow-hidden rounded-lg border">
          <img
            src="https://www.buildwebsites.co.in/wp-content/uploads/2022/09/eCommerce-Website-Components-photo.jpg"
            alt="Shop by Categories"
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent flex flex-col justify-center p-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Discover Our Collections
            </h1>
            <p className="text-white text-lg max-w-md mb-6">
              Explore our wide range of products across various categories
            </p>
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full py-3 px-4 pr-12 rounded-full border-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search
                className="absolute right-4 top-3 text-gray-500"
                size={20}
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            {selectedCategory ? selectedCategory : "Shop by Categories"}
          </h1>
          {selectedCategory && selectedSubcategory && (
            <div className="text-gray-600 mt-1">
              {selectedCategory} / {selectedSubcategory}
            </div>
          )}
        </div>

        {selectedCategory && (
          <div className="mt-4 md:mt-0 w-full md:w-auto flex items-center">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search
                className="absolute right-3 top-2.5 text-gray-500"
                size={18}
              />
            </div>
          </div>
        )}
      </div>

      {!selectedCategory && (
        <>
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Featured Categories</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {featuredCategories.map((category) => (
                <div
                  key={category.id}
                  className="relative cursor-pointer group overflow-hidden rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-all hover:shadow-md"
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white text-lg font-semibold">
                      {category.name}
                    </h3>
                    <div className="flex items-center mt-1">
                      <span className="text-white text-sm opacity-80">
                        {subcategories[category.name]?.length || 0}{" "}
                        subcategories
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">More Categories</h2>
              <Button
                variant="ghost"
                onClick={() => setShowMoreCategories(!showMoreCategories)}
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                {showMoreCategories ? "Show Less" : "Show All"}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    showMoreCategories ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(showMoreCategories
                ? additionalCategories
                : additionalCategories.slice(0, 4)
              ).map((category) => (
                <div
                  key={category.id}
                  className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {subcategories[category.name]?.slice(0, 3).join(", ")}
                    {subcategories[category.name]?.length > 3 ? "..." : ""}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {recentlyViewed.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Recently Viewed</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {recentlyViewed.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    openModal={openModal}
                    toggleWishlist={toggleWishlist}
                    wishlist={wishlist}
                    handleAddToCart={handleAddToCart}
                    compact={true}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {selectedCategory && (
        <div className="mt-6">
          <div className="mb-8 overflow-x-auto">
            <div className="flex space-x-2 pb-2">
              <Button
                variant={selectedSubcategory === null ? "default" : "outline"}
                onClick={() => setSelectedSubcategory(null)}
                className="whitespace-nowrap"
              >
                All {selectedCategory}
              </Button>

              {subcategories[selectedCategory]?.map((sub) => (
                <Button
                  key={sub}
                  variant={selectedSubcategory === sub ? "default" : "outline"}
                  onClick={() => handleSubcategoryClick(sub)}
                  className="whitespace-nowrap"
                >
                  {sub}
                </Button>
              ))}
            </div>
          </div>

          {/* Filters and Products */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters - Mobile Toggle */}
            <div className="flex items-center justify-between lg:hidden mb-4">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal size={16} />
                Filters {totalFilterCount > 0 && `(${totalFilterCount})`}
              </Button>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <select
                    className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    {sortOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-2.5 pointer-events-none"
                    size={16}
                  />
                </div>

                <Button
                  variant="ghost"
                  className={viewMode === "grid" ? "bg-gray-100" : ""}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 size={18} />
                </Button>
                <Button
                  variant="ghost"
                  className={viewMode === "list" ? "bg-gray-100" : ""}
                  onClick={() => setViewMode("list")}
                >
                  <List size={18} />
                </Button>
              </div>
            </div>

            <div
              className={`${
                showFilters ? "block" : "hidden"
              } lg:block lg:w-64 flex-shrink-0`}
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sticky top-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Filters</h3>
                  {totalFilterCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Clear All
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden"
                  >
                    <X size={18} />
                  </Button>
                </div>

                {/* Filter by type */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Product Type</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="filter"
                        checked={activeFilter === "all"}
                        onChange={() => setActiveFilter("all")}
                        className="mr-2"
                      />
                      All Products
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="filter"
                        checked={activeFilter === "new"}
                        onChange={() => setActiveFilter("new")}
                        className="mr-2"
                      />
                      New Arrivals
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="filter"
                        checked={activeFilter === "sale"}
                        onChange={() => setActiveFilter("sale")}
                        className="mr-2"
                      />
                      On Sale
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="filter"
                        checked={activeFilter === "limited"}
                        onChange={() => setActiveFilter("limited")}
                        className="mr-2"
                      />
                      Limited Stock
                    </label>
                  </div>
                </div>

                {/* Price range filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Price Range</h4>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <label key={range.id} className="flex items-center">
                        <input
                          type="radio"
                          name="price"
                          checked={selectedPriceRange === range.id}
                          onChange={() => setSelectedPriceRange(range.id)}
                          className="mr-2"
                        />
                        {range.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Customer Rating</h4>
                  <div className="space-y-2">
                    {ratingOptions.map((option) => (
                      <label key={option.id} className="flex items-center">
                        <input
                          type="radio"
                          name="rating"
                          checked={selectedRating === option.id}
                          onChange={() => setSelectedRating(option.id)}
                          className="mr-2"
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="flex-1">
              {/* Desktop Sorting and View Options */}
              <div className="hidden lg:flex justify-between items-center mb-6">
                <div className="text-sm text-gray-500">
                  Showing {filteredProducts.length} products
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <label htmlFor="sort" className="mr-2 text-sm">
                      Sort By:
                    </label>
                    <select
                      id="sort"
                      className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      {sortOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="absolute right-3 top-2.5 pointer-events-none"
                      size={16}
                    />
                  </div>

                  <div className="flex items-center border border-gray-300 rounded-md">
                    <Button
                      variant="ghost"
                      className={`rounded-r-none ${
                        viewMode === "grid" ? "bg-gray-100" : ""
                      }`}
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid3X3 size={18} />
                    </Button>
                    <Button
                      variant="ghost"
                      className={`rounded-l-none ${
                        viewMode === "list" ? "bg-gray-100" : ""
                      }`}
                      onClick={() => setViewMode("list")}
                    >
                      <List size={18} />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {totalFilterCount > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {activeFilter !== "all" && (
                    <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                      {activeFilter === "new"
                        ? "New Arrivals"
                        : activeFilter === "sale"
                        ? "On Sale"
                        : "Limited Stock"}
                      <button
                        onClick={() => setActiveFilter("all")}
                        className="ml-2"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}

                  {selectedPriceRange && (
                    <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                      {
                        priceRanges.find((r) => r.id === selectedPriceRange)
                          ?.label
                      }
                      <button
                        onClick={() => setSelectedPriceRange(null)}
                        className="ml-2"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}

                  {selectedRating && (
                    <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                      {
                        ratingOptions.find((r) => r.id === selectedRating)
                          ?.label
                      }
                      <button
                        onClick={() => setSelectedRating(null)}
                        className="ml-2"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {filteredProducts.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="mb-4">
                    <Search size={48} className="mx-auto text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Try adjusting your filters or search criteria
                  </p>
                  <Button onClick={clearAllFilters}>Clear All Filters</Button>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <div
                      key={product.id}
                      className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="sm:w-48 h-48 flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <h3 className="font-semibold text-lg mb-2">
                          {product.title}
                        </h3>
                        <div className="flex items-center mb-2">
                          <div className="flex items-center text-yellow-400 mr-2">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
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
                          <span className="text-sm text-gray-500">
                            ({product.reviews} reviews)
                          </span>
                        </div>
                        <div className="flex items-center mb-2">
                          <span className="font-bold text-lg">
                            ₹{product.price.toLocaleString()}
                          </span>
                          {product.oldPrice && (
                            <span className="ml-2 text-gray-500 line-through">
                              ₹{product.oldPrice.toLocaleString()}
                            </span>
                          )}
                          {product.discount && (
                            <span className="ml-2 text-green-600 text-sm">
                              {product.discount}
                            </span>
                          )}
                        </div>
                        <div className="mt-auto flex flex-wrap gap-2">
                          <Button onClick={() => handleAddToCart(product)}>
                            Add to Cart
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => toggleWishlist(product.id)}
                            className={
                              wishlist.includes(product.id)
                                ? "text-red-500"
                                : ""
                            }
                          >
                            {wishlist.includes(product.id)
                              ? "Remove from Wishlist"
                              : "Add to Wishlist"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
