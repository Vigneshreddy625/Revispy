import React, { Suspense, useState, useEffect } from "react";
import { Button } from "../ui/button";
import {Award, Clock, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Product from "../Modals/Product";
import ProductCard from "../Product/ProductCard";
import { useSelector } from "react-redux";
import { getSixRandomItems } from "../utils/RandomGen";

const LazyImage = React.lazy(() => import("../Items/LazyImage"));

const Home = () => {
  

  const categories = [
    {
      name: "Electronics",
      image:
        "https://c8.alamy.com/comp/HKPR1N/consumer-and-home-electronicstvfridgevacuum-cleanermicrowavewasher-HKPR1N.jpg",
      subcategories: ["Smartphones", "Laptops", "Audio", "Accessories"],
    },
    {
      name: "Clothing",
      image:
        "https://thebureaufashionweek.com/wp-content/uploads/sites/11/2021/08/What-to-wear-to-Fashion-Week-1200x675.jpg",
      subcategories: ["Men", "Women", "Kids", "Accessories"],
    },
    {
      name: "Home & Furniture",
      image:
        "https://www.proiectari.md/wp-content/uploads/2023/12/model-casa.jpg",
      subcategories: ["Furniture", "Decor", "Kitchen", "Bath"],
    },
    {
      name: "Health & Beauty",
      image:
        "https://cdn.logojoy.com/wp-content/uploads/20191023114758/AdobeStock_224061283-min.jpeg",
      subcategories: ["Skincare", "Makeup", "Haircare", "Fragrances"],
    },
  ];

  const [timeLeft, setTimeLeft] = useState({
    hours: 24,
    minutes: 0,
    seconds: 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const navigate = useNavigate();
  const featuredProducts = useSelector(getSixRandomItems);

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
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddToCart = (productDetails) => {
    console.log("Adding to cart:", productDetails);
  };

  const filteredProducts =
    activeFilter === "all"
      ? featuredProducts
      : activeFilter === "new"
      ? featuredProducts.filter((product) => product.newArrival)
      : featuredProducts.filter((product) => product.isBestSeller);

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
        <section className="text-center pt-6 lg:pt-16">
          <h1 className="text-4xl font-bold tracking-wide">
            Summer Collection 2024
          </h1>
          <p className="text-lg mt-4">Up to 50% off on selected items</p>
          <Button size="lg" className="mt-6 border transition" onClick={() => navigate("/searchresults")}>
            Shop Now
          </Button>
        </section>

        <section className="px-4 pt-6 lg:pt-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">Shop by category</h2>
            <Button variant="outline" onClick={() => navigate("/categories")}>View All</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div
                key={category.name}
                className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer hover:scale-105 transform transition duration-300"
              >
                <Suspense
                  fallback={<div className="w-full h-48 animate-pulse" />}
                >
                  <LazyImage
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover"
                  />
                </Suspense>
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300">
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-semibold text-white">
                      {category.name}
                    </h3>
                    <p className="text-white text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" onClick={() => navigate(`/categories/${category.name.toLowerCase().trim().replace(/\s+/g, "")}`)}> 
                      View Collection →
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="pt-6 lg:pt-16 pb-4 lg:pb-12 mt-6 lg:mt-16">
          <div className="px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Discover our handpicked collection of trending items
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                <Button
                  variant={activeFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter("all")}
                  className="flex items-center gap-1"
                >
                  <Tag className="h-4 w-4" /> All Products
                </Button>
                <Button
                  variant={activeFilter === "new" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter("new")}
                  className="flex items-center gap-1"
                >
                  <Clock className="h-4 w-4" /> New Arrivals
                </Button>
                <Button
                  variant={
                    activeFilter === "bestseller" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setActiveFilter("bestseller")}
                  className="flex items-center gap-1"
                >
                  <Award className="h-4 w-4" /> Best Sellers
                </Button>
              </div>
            </div>

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
            <div className="text-center mt-10">
              <Button size="lg" variant="outline" className="px-8">
                View All Products
              </Button>
            </div>
          </div>
        </section>

        <section className="px-4 pt-6 lg:pt-16 pb-4">
          <div className="relative overflow-hidden rounded-2xl border shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <h2 className="text-3xl font-bold mb-4">Deal of the Day</h2>
                <p className="text-lg mb-4">Get 40% off on selected items</p>
                <div className="flex space-x-4 justify-center md:justify-start mb-6">
                  <div className="text-center">
                    <span className="block text-3xl font-bold">
                      {timeLeft.hours}
                    </span>
                    <span className="text-sm">Hours</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-3xl font-bold">
                      {timeLeft.minutes}
                    </span>
                    <span className="text-sm">Minutes</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-3xl font-bold">
                      {timeLeft.seconds}
                    </span>
                    <span className="text-sm">Seconds</span>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="bg-transparent border text-black dark:text-white dark:hover:bg-gray-600 hover:bg-gray-100"
                  onClick={() => navigate("/dod")}
                >
                  Shop Now
                </Button>
              </div>
              <div className="w-full md:w-1/2 lg:w-2/5">
                <Suspense
                  fallback={
                    <div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg" />
                  }
                >
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
        <Product
          isOpen={isModalOpen}
          onClose={closeModal}
          product={selectedItem}
          onAddToCart={handleAddToCart}
        />
      </main>
    </div>
  );
};

export default Home;
