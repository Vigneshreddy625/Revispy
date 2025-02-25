import React, { useState, useEffect, Suspense } from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { 
  Clock, Star, TrendingUp, Heart, Filter, Search, ShoppingCart, 
  ChevronLeft, ChevronRight, ArrowUpDown, X, Check, SlidersHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Slider } from "../ui/slider";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import img from "/Sale.png";
const LazyImage = React.lazy(() => import("../Items/LazyImage"));

const SalePage = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 48, minutes: 0, seconds: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [activeFilters, setActiveFilters] = useState({
    minPrice: 0,
    maxPrice: 50000,
    minRating: 0,
    categories: [],
    discountMin: 0,
  });
  const itemsPerPage = 3;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        clearInterval(timer);
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    {
      name: "Smartphones",
      image:
        "https://www.trustedreviews.com/wp-content/uploads/sites/54/2023/08/Best-smartphone-2.jpg",
      discount: "Up to 40% Off",
      items: "1200+ Items",
      featured: ["iPhone 15", "Samsung S24", "Google Pixel 8"],
      startingPrice: "₹12000",
    },
    {
      name: "Smartwatches",
      image: "https://cdn.mos.cms.futurecdn.net/FkGweMeB7hdPgaSFQdgsfj.jpg",
      discount: "Up to 35% Off",
      items: "800+ Items",
      featured: ["Apple Watch", "Galaxy Watch", "Fitbit"],
      startingPrice: "₹2000",
    },
    {
      name: "Laptops",
      image:
        "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mba13-m2-spacegray-gallery1-202402?wid=4000&hei=3072&fmt=jpeg&qlt=90&.v=1707416806471",
      discount: "Up to 30% Off",
      items: "500+ Items",
      featured: ["MacBook Air", "Dell XPS", "HP Spectre"],
      startingPrice: "₹20000",
    },
    {
      name: "Headphones",
      image:
        "https://media.croma.com/image/upload/v1607605440/Croma%20Assets/Entertainment/Headphones%20and%20Earphones/Images/231421_n3yvmu.png",
      discount: "Up to 50% Off",
      items: "1000+ Items",
      featured: ["AirPods Pro", "Sony WH-100XM5", "Bose QC"],
      startingPrice: "₹10000",
    },
    {
      name: "Cameras",
      image:
        "https://www.dpreview.com/files/p/articles/6269402639/canon_eosr8.jpeg",
      discount: "Up to 25% Off",
      items: "300+ Items",
      featured: ["Sony A7", "Canon EOS", "Fujifilm X-T5"],
      startingPrice: "₹300000",
    },
    {
      name: "Gaming",
      image: "https://media.bluent.com/images/wher-are-we-going.webp",
      discount: "Up to 45% Off",
      items: "400+ Items",
      featured: ["PS5", "Xbox Series X", "Nintendo Switch"],
      startingPrice: "₹65000",
    },
  ];

  const flashDeals = [
    {
      name: "AirPods Pro",
      price: "₹10900",
      originalPrice: "₹20900",
      rating: 4.8,
      reviews: 2456,
      discount: 48,
      category: "Headphones",
      image:
        "https://m-cdn.phonearena.com/images/hub/274-wide-two_1200/Apple-AirPods-Pro-3-release-date-predictions-price-specs-and-must-know-features.jpg",
    },
    {
      name: "Samsung 4K TV",
      price: "₹15900",
      originalPrice: "₹23900",
      rating: 4.7,
      reviews: 1823,
      discount: 33,
      category: "TVs",
      image:
        "https://img.global.news.samsung.com/in/wp-content/uploads/2024/09/Newsroom-Cover_DU8000_1000x563.jpg",
    },
    {
      name: "iPad Air",
      price: "₹30900",
      originalPrice: "₹40900",
      rating: 4.9,
      reviews: 3241,
      discount: 24,
      category: "Tablets",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNltlyQxZDUKgHcMIJXp_IDyn4MYNNQoVbJA&s",
    },
  ];

  const handleAddToCart = (item) => {
    setCart(prev => [...prev, { ...item, id: Date.now() }]);
  };

  const handleRemoveFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleClearFilters = () => {
    setActiveFilters({
      minPrice: 0,
      maxPrice: 50000,
      minRating: 0,
      categories: [],
      discountMin: 0,
    });
    setSortBy("default");
    setSearchQuery("");
  };

  const handleCategoryToggle = (category) => {
    setActiveFilters(prev => {
      const newCategories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      
      return { ...prev, categories: newCategories };
    });
  };

  const uniqueCategories = [...new Set(flashDeals.map(deal => deal.category))];
  
  const activeFilterCount = 
    (activeFilters.minPrice > 0 ? 1 : 0) +
    (activeFilters.maxPrice < 50000 ? 1 : 0) +
    (activeFilters.minRating > 0 ? 1 : 0) +
    activeFilters.categories.length +
    (activeFilters.discountMin > 0 ? 1 : 0);

  const filteredFlashDeals = flashDeals.filter(deal => {
    const price = parseInt(deal.price.replace("₹", ""));
    const matchesSearch = deal.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = price >= activeFilters.minPrice && price <= activeFilters.maxPrice;
    const matchesRating = deal.rating >= activeFilters.minRating;
    const matchesCategory = 
      activeFilters.categories.length === 0 || 
      activeFilters.categories.includes(deal.category);
    const matchesDiscount = deal.discount >= activeFilters.discountMin;
    
    return matchesSearch && matchesPrice && matchesRating && matchesCategory && matchesDiscount;
  }).sort((a, b) => {
    switch (sortBy) {
      case "priceLow":
        return parseInt(a.price.replace("₹", "")) - parseInt(b.price.replace("₹", ""));
      case "priceHigh":
        return parseInt(b.price.replace("₹", "")) - parseInt(a.price.replace("₹", ""));
      case "rating":
        return b.rating - a.rating;
      case "discount":
        return b.discount - a.discount;
      default:
        return 0;
    }
  });

  const paginatedCategories = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  return (
    <div className="w-full min-h-screen">
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
        <img src={img} alt="Festival Sale Banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white backdrop-brightness-50 p-4">
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-2 md:mb-4 text-center">
            Festive Season Sale
          </h1>
          <p className="text-sm md:text-xl mb-4 text-center">
            Incredible Deals on Premium Tech
          </p>
          <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6 bg-black/30 p-3 rounded-lg">
            <TimeBlock label="Hours" value={timeLeft.hours} />
            <TimeBlock label="Minutes" value={timeLeft.minutes} />
            <TimeBlock label="Seconds" value={timeLeft.seconds} />
          </div>
          <Button className="text-sm md:text-base px-6 py-2 md:px-8 md:py-3 bg-red-600 hover:bg-red-700">
            Shop Now
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <h2 className="text-lg md:text-2xl font-semibold flex items-center gap-2">
            <Clock className="w-5 h-5 md:w-6 md:h-6 text-red-600" /> Flash Deals
          </h2>
          
          <div className="flex flex-col items-center gap-2 w-auto md:w-auto">
            <div className="flex items-center gap-2">
            <div className="relative flex-grow max-w-xs">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search deals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-2 py-1 border rounded w-full bg-transparent"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                </button>
              )}
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4" />
                  <SelectValue placeholder="Sort by" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Relevance</SelectItem>
                <SelectItem value="priceLow">Price: Low to High</SelectItem>
                <SelectItem value="priceHigh">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="discount">Biggest Discount</SelectItem>
              </SelectContent>
            </Select>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <Badge className="ml-1 bg-red-500 text-white h-5 w-5 rounded-full p-0 flex items-center justify-center">
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Filters</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleClearFilters}
                      className="h-8 text-xs"
                    >
                      Clear All
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Price Range</h4>
                    <div className="flex items-center justify-between gap-4">
                      <input
                        type="number"
                        min="0"
                        max={activeFilters.maxPrice}
                        value={activeFilters.minPrice}
                        onChange={(e) => setActiveFilters(prev => ({ ...prev, minPrice: parseInt(e.target.value) || 0 }))}
                        className="w-full p-1 border bg-transparent rounded text-sm"
                        placeholder="Min"
                      />
                      <span>to</span>
                      <input
                        type="number"
                        min={activeFilters.minPrice}
                        value={activeFilters.maxPrice}
                        onChange={(e) => setActiveFilters(prev => ({ ...prev, maxPrice: parseInt(e.target.value) || 0 }))}
                        className="w-full p-1 border rounded bg-transparent text-sm"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Min. Rating</h4>
                    <Select 
                      value={activeFilters.minRating.toString()} 
                      onValueChange={(val) => setActiveFilters(prev => ({ ...prev, minRating: parseFloat(val) }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any Rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Any Rating</SelectItem>
                        <SelectItem value="3">3+ Stars</SelectItem>
                        <SelectItem value="4">4+ Stars</SelectItem>
                        <SelectItem value="4.5">4.5+ Stars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Min. Discount</h4>
                    <Select 
                      value={activeFilters.discountMin.toString()} 
                      onValueChange={(val) => setActiveFilters(prev => ({ ...prev, discountMin: parseInt(val) }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any Discount" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Any Discount</SelectItem>
                        <SelectItem value="10">10% or more</SelectItem>
                        <SelectItem value="20">20% or more</SelectItem>
                        <SelectItem value="30">30% or more</SelectItem>
                        <SelectItem value="40">40% or more</SelectItem>
                        <SelectItem value="50">50% or more</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Categories</h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {uniqueCategories.map(category => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`category-${category}`}
                            checked={activeFilters.categories.includes(category)}
                            onCheckedChange={() => handleCategoryToggle(category)}
                          />
                          <Label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            </div>
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mt-2 w-full">
                {activeFilters.minPrice > 0 && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Min: ₹{activeFilters.minPrice}
                    <X 
                      className="w-3 h-3 ml-1 cursor-pointer" 
                      onClick={() => setActiveFilters(prev => ({ ...prev, minPrice: 0 }))}
                    />
                  </Badge>
                )}
                
                {activeFilters.maxPrice < 50000 && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Max: ₹{activeFilters.maxPrice}
                    <X 
                      className="w-3 h-3 ml-1 cursor-pointer" 
                      onClick={() => setActiveFilters(prev => ({ ...prev, maxPrice: 50000 }))}
                    />
                  </Badge>
                )}
                
                {activeFilters.minRating > 0 && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {activeFilters.minRating}+ Stars
                    <X 
                      className="w-3 h-3 ml-1 cursor-pointer" 
                      onClick={() => setActiveFilters(prev => ({ ...prev, minRating: 0 }))}
                    />
                  </Badge>
                )}
                
                {activeFilters.discountMin > 0 && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {activeFilters.discountMin}%+ Off
                    <X 
                      className="w-3 h-3 ml-1 cursor-pointer" 
                      onClick={() => setActiveFilters(prev => ({ ...prev, discountMin: 0 }))}
                    />
                  </Badge>
                )}
                
                {activeFilters.categories.map(category => (
                  <Badge key={category} variant="secondary" className="flex items-center gap-1">
                    {category}
                    <X 
                      className="w-3 h-3 ml-1 cursor-pointer" 
                      onClick={() => handleCategoryToggle(category)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {filteredFlashDeals.length === 0 ? (
          <div className="text-center py-10  rounded-lg">
            <div className="text-gray-500 mb-2">No products match your filters</div>
            <Button variant="outline" onClick={handleClearFilters}>Clear Filters</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFlashDeals.map((deal) => (
              <Card
                key={deal.name}
                className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative">
                  <Suspense fallback={<div className="w-full h-48 bg-gray-200 animate-pulse" />}>
                    <LazyImage
                      src={deal.image}
                      alt={deal.name}
                      className="w-full h-48 object-cover rounded-t"
                    />
                  </Suspense>
                  <Badge className="absolute top-2 right-2 bg-red-600 text-white">
                    {deal.discount}% OFF
                  </Badge>
                  {deal.stockLeft < 20 && (
                    <Badge className="absolute top-2 right-2 bg-yellow-600">
                      Only {deal.stockLeft} left
                    </Badge>
                  )}
                </div>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-semibold">{deal.name}</h3>
                    <Badge variant="outline" className="text-xs">{deal.category}</Badge>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <span className="text-xl font-bold">{deal.price}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">
                        {deal.originalPrice}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{deal.rating}</span>
                    <span className="text-gray-500">({deal.reviews})</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button 
                    className="w-full" 
                    onClick={() => handleAddToCart(deal)}
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 md:w-6 md:h-6" /> Top Categories
          </h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span>{currentPage} / {totalPages}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedCategories.map((category) => (
            <Card
              key={category.name}
              className="hover:shadow-lg transition-all duration-300"
            >
              <div className="relative">
                <Suspense fallback={<div className="w-full h-40 bg-gray-200 animate-pulse" />}>
                  <LazyImage
                    src={category.image}
                    alt={category.name}
                    className="w-full h-40 object-cover rounded-t"
                  />
                </Suspense>
                {category.trending && (
                  <Badge className="absolute top-2 right-2 bg-blue-600">
                    Trending
                  </Badge>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                  <Badge variant="secondary">{category.discount}</Badge>
                </div>
                <p className="text-sm text-gray-500 mb-2">{category.items}</p>
                <p className="text-sm font-medium mb-2">
                  Starting from {category.startingPrice}
                </p>
                <div className="flex flex-wrap gap-1">
                  {category.featured.map((item) => (
                    <Badge key={item} variant="outline" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const TimeBlock = ({ label, value }) => (
  <div className="text-center p-2 bg-black/20 rounded">
    <div className="text-xl md:text-3xl font-bold">{value.toString().padStart(2, '0')}</div>
    <div className="text-xs md:text-sm">{label}</div>
  </div>
);

export default SalePage;