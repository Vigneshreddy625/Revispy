import React, { useState, useEffect, Suspense } from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Clock, Star, TrendingUp, Heart } from "lucide-react";
import img from "/Sale.png";
const LazyImage = React.lazy(() => import("./LazyImage"));

const SalePage = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 48,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
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
      startingPrice: "$299",
    },
    {
      name: "Smartwatches",
      image: "https://cdn.mos.cms.futurecdn.net/FkGweMeB7hdPgaSFQdgsfj.jpg",
      discount: "Up to 35% Off",
      items: "800+ Items",
      featured: ["Apple Watch", "Galaxy Watch", "Fitbit"],
      startingPrice: "$149",
    },
    {
      name: "Laptops",
      image:
        "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mba13-m2-spacegray-gallery1-202402?wid=4000&hei=3072&fmt=jpeg&qlt=90&.v=1707416806471",
      discount: "Up to 30% Off",
      items: "500+ Items",
      featured: ["MacBook Air", "Dell XPS", "HP Spectre"],
      startingPrice: "$499",
    },
    {
      name: "Headphones",
      image:
        "https://media.croma.com/image/upload/v1607605440/Croma%20Assets/Entertainment/Headphones%20and%20Earphones/Images/231421_n3yvmu.png",
      discount: "Up to 50% Off",
      items: "1000+ Items",
      featured: ["AirPods Pro", "Sony WH-1000XM5", "Bose QC"],
      startingPrice: "$89",
    },
    {
      name: "Cameras",
      image:
        "https://www.dpreview.com/files/p/articles/6269402639/canon_eosr8.jpeg",
      discount: "Up to 25% Off",
      items: "300+ Items",
      featured: ["Sony A7", "Canon EOS", "Fujifilm X-T5"],
      startingPrice: "$399",
    },
    {
      name: "Gaming",
      image: "https://media.bluent.com/images/wher-are-we-going.webp",
      discount: "Up to 45% Off",
      items: "400+ Items",
      featured: ["PS5", "Xbox Series X", "Nintendo Switch"],
      startingPrice: "$249",
    },
  ];

  const flashDeals = [
    {
      name: "AirPods Pro",
      price: "$199",
      originalPrice: "$249",
      rating: 4.8,
      reviews: 2456,
      image:
        "https://m-cdn.phonearena.com/images/hub/274-wide-two_1200/Apple-AirPods-Pro-3-release-date-predictions-price-specs-and-must-know-features.jpg",
    },
    {
      name: "Samsung 4K TV",
      price: "$599",
      originalPrice: "$899",
      rating: 4.7,
      reviews: 1823,
      image:
        "https://img.global.news.samsung.com/in/wp-content/uploads/2024/09/Newsroom-Cover_DU8000_1000x563.jpg",
    },
    {
      name: "iPad Air",
      price: "$449",
      originalPrice: "$599",
      rating: 4.9,
      reviews: 3241,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNltlyQxZDUKgHcMIJXp_IDyn4MYNNQoVbJA&s",
    },
  ];

  return (
    <div className="w-full min-h-screen">
      <div className="relative w-full h-full">
        <img
          src={img}
          alt="Festival Sale Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white backdrop-brightness-50">
          <h1 className="text-6xl font-bold mb-4">Festive Season Sale</h1>
          <p className="text-2xl mb-6">Incredible Deals on Premium Tech</p>
          <div className="flex gap-4 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold">{timeLeft.hours}</div>
              <div className="text-sm">Hours</div>
            </div>
            <div className="text-4xl font-bold">:</div>
            <div className="text-center">
              <div className="text-4xl font-bold">{timeLeft.minutes}</div>
              <div className="text-sm">Minutes</div>
            </div>
            <div className="text-4xl font-bold">:</div>
            <div className="text-center">
              <div className="text-4xl font-bold">{timeLeft.seconds}</div>
              <div className="text-sm">Seconds</div>
            </div>
          </div>
          <Button className="text-lg px-8 py-6">Shop Now</Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold flex items-center gap-2">
            <Clock className="w-8 h-8" /> Flash Deals
          </h2>
          <Button variant="outline">View All</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flashDeals.map((deal) => (
            <Card
              key={deal.name}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              
                <Suspense fallback={<div>Loading...</div>}>
                  <LazyImage
                    src={deal.image}
                    alt={deal.name}
                    className="w-full h-48 object-cover mb-4 rounded"
                  />
                </Suspense>
                <CardContent className="p-4">
                <h3 className="text-xl font-semibold">{deal.name}</h3>
                <div className="flex items-center gap-2 my-2">
                  <span className="text-2xl font-bold text-red-600">
                    {deal.price}
                  </span>
                  <span className="text-gray-500 line-through">
                    {deal.originalPrice}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{deal.rating}</span>
                  <span className="text-gray-500">({deal.reviews})</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full">Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold flex items-center gap-2">
            <TrendingUp className="w-8 h-8" /> Top Categories
          </h2>
          <Button variant="outline">View All Categories</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <Suspense fallback={<div>Loading...</div>}>
                <LazyImage
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </Suspense>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {category.items}
                    </p>
                    <Badge variant="secondary" className="mb-4">
                      {category.discount}
                    </Badge>
                    <p className="text-sm font-medium">
                      Starting from {category.startingPrice}
                    </p>
                  </div>
                  <Button variant="outline" size="icon">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">
                    Featured Products:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {category.featured.map((item) => (
                      <Badge key={item} variant="outline">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalePage;
