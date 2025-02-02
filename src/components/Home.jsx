import React, { Suspense, useState, useEffect } from 'react';
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Heart } from 'lucide-react';

const LazyImage = React.lazy(() => import('./LazyImage'));

const Home = () => {

  const featuredProducts = [
    { id: 1, name: "Headphones", price: "$129.99", originalPrice: "$159.99", discount: "20% OFF", rating: 4.5, reviews: 128, image: "https://media.croma.com/image/upload/v1723054217/Croma%20Assets/Communication/Headphones%20and%20Earphones/Images/227824_0_fcnxfv.png" },
    { id: 2, name: "Smart Watch", price: "$199.99", originalPrice: "$234.99", discount: "15% OFF", rating: 4.2, reviews: 95, image: "https://www.jiomart.com/images/product/original/rvhjzhyxio/clubclassy-t500-smart-watch-full-screen-waterproof-touch-display-bluetooth-calling-fitpro-t500-smart-watches-fitness-tracker-compatible-with-all-android-amp-ios-black-product-images-orvhjzhyxio-p606648963-3-202312101651.jpg" },
    { id: 3, name: "Running Shoes", price: "$89.99", originalPrice: "$119.99", discount: "25% OFF", rating: 4.8, reviews: 234, image: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/12b4c855-4419-4764-9178-bbbe5a64e6a1/NIKE+ZOOMX+INVINCIBLE+RN+3+OLY.png" },
    { id: 4, name: "Coffee Maker", price: "$79.99", originalPrice: "$114.99", discount: "30% OFF", rating: 4.3, reviews: 156, image: "https://images-cdn.ubuy.co.in/653fc5a70fdd3b03d3619ee4-mainstays-black-5-cup-drip-coffee-maker.jpg" },
  ];

  const categories = [
    { name: "Electronics", image: "https://c8.alamy.com/comp/HKPR1N/consumer-and-home-electronicstvfridgevacuum-cleanermicrowavewasher-HKPR1N.jpg", subcategories: ["Smartphones", "Laptops", "Audio", "Accessories"] },
    { name: "Fashion", image: "https://thebureaufashionweek.com/wp-content/uploads/sites/11/2021/08/What-to-wear-to-Fashion-Week-1200x675.jpg", subcategories: ["Men", "Women", "Kids", "Accessories"] },
    { name: "Home", image: "https://www.proiectari.md/wp-content/uploads/2023/12/model-casa.jpg", subcategories: ["Furniture", "Decor", "Kitchen", "Bath"] },
    { name: "Beauty", image: "https://cdn.logojoy.com/wp-content/uploads/20191023114758/AdobeStock_224061283-min.jpeg", subcategories: ["Skincare", "Makeup", "Haircare", "Fragrances"] },
  ];

  const [timeLeft, setTimeLeft] = useState({
    hours: 24,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const { hours, minutes, seconds } = prevTime;
        if (seconds > 0) {
          return { ...prevTime, seconds: seconds - 1 };
        } else if (minutes > 0) {
          return { ...prevTime, minutes: minutes - 1, seconds: 59 };
        } else if (hours > 0) {
          return { ...prevTime, hours: hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <main>
      <section className="text-center pt-20">
        <h1 className="text-4xl font-bold tracking-wide">Summer Collection 2024</h1>
        <p className="text-lg mt-4">Up to 50% off on selected items</p>
        <Button size="lg" className="mt-6 border transition">
          Shop Now
        </Button>
      </section>

        <section className="max-w-7xl mx-auto px-4 pt-16">
        <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold">Shop by category</h2>
              <Button variant="outline">View All</Button>
            </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div
                key={category.name}
                className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer hover:scale-105 transform transition duration-300"
              >
                <Suspense fallback={<div className="w-full h-48 animate-pulse" />}>
                  <LazyImage src={category.image} alt={category.name} className="w-full h-48 object-cover" />
                </Suspense>
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300">
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                    <p className="text-white text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View Collection →
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="pt-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold">Featured Products</h2>
              <Button variant="outline">View All</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div className="relative">
                      <Suspense fallback={<div className="w-full h-48 bg-gray-200 animate-pulse" />}>
                        <LazyImage src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
                      </Suspense>
                      <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-sm rounded-full">
                        {product.discount}
                      </span>
                      <button className="absolute top-2 left-2 p-2 rounded-full bg-gray-300 text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Heart className="h-5 w-5"/>
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400">
                          {'★'.repeat(Math.floor(product.rating))}
                          {'☆'.repeat(5 - Math.floor(product.rating))}
                        </div>
                        <span className="text-sm ml-2">({product.reviews})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xl font-semibold">{product.price}</p>
                          <p className="text-sm text-gray-500 line-through">{product.originalPrice}</p>
                        </div>
                        <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 pt-16 pb-4">
          <div className="relative overflow-hidden rounded-2xl border shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <h2 className="text-3xl font-bold mb-4">Deal of the Day</h2>
                <p className="text-lg mb-4">Get 40% off on selected items</p>
                <div className="flex space-x-4 justify-center md:justify-start mb-6">
                <div className="text-center">
                    <span className="block text-3xl font-bold">{timeLeft.hours}</span>
                    <span className="text-sm">Hours</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-3xl font-bold">{timeLeft.minutes}</span>
                    <span className="text-sm">Minutes</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-3xl font-bold">{timeLeft.seconds}</span>
                    <span className="text-sm">Seconds</span>
                  </div>
                </div>
                <Button size="lg" className="bg-transparent border text-black dark:text-white dark:hover:bg-gray-600 hover:bg-gray-100">
                  Shop Now
                </Button>
              </div>
              <div className="w-full md:w-1/2 lg:w-2/5">
                <Suspense fallback={<div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg" />}>
                  <LazyImage
                    src="https://www.cardexpert.in/wp-content/uploads/2022/08/Weekly-offers.gif"
                    alt="Deal of the Day"
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </Suspense>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Home;