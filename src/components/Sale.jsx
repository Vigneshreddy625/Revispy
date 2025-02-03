import React, { useState, useEffect, Suspense } from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Clock, Star, TrendingUp, Heart, Filter, Search, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import img from "/Sale.png";
const LazyImage = React.lazy(() => import("./LazyImage"));

const SalePage = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 48, minutes: 0, seconds: 0 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
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
      featured: ["AirPods Pro", "Sony WH-1000XM5", "Bose QC"],
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
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNltlyQxZDUKgHcMIJXp_IDyn4MYNNQoVbJA&s",
    },
    
  ];

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="w-full min-h-screen ">
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
        <img
          src={img}
          alt="Festival Sale Banner"
          className="w-full h-full object-cover"
        />
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
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg md:text-2xl font-semibold flex items-center gap-2">
            <Clock className="w-5 h-5 md:w-6 md:h-6 text-red-600" /> Flash Deals
          </h2>
          <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            View All
          </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {flashDeals.map((deal, index) => (
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
                <Badge className="absolute top-2 right-2 bg-red-600">
                  {deal.discount}% OFF
                </Badge>
                {deal.stockLeft < 20 && (
                  <Badge className="absolute top-2 right-2 bg-yellow-600">
                    Only {deal.stockLeft} left
                  </Badge>
                )}
              </div>
              <CardContent className="p-3">
                <h3 className="text-lg font-semibold mb-2">{deal.name}</h3>
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
                <Button className="w-full" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 bg-white">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-blue-600" /> Top Categories
          </h2>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
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