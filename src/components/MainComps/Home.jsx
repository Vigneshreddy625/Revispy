import React, { Suspense, useState, useEffect } from "react";
import { Button } from "../ui/button";
import {Award, Clock, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Product from "../Modals/Product";
import ProductCard from "../Product/ProductCard";

const LazyImage = React.lazy(() => import("../Items/LazyImage"));

const Home = () => {
  const featuredProducts = [
    {
      id: 1,
      title: "Marshall Headphones",
      description:
        "Noise-cancelling, wireless, and high-fidelity sound quality.",
      price: 12999.99,
      originalPrice: 15999.99,
      discount: "35% OFF",
      image:
        "https://media.croma.com/image/upload/v1723054217/Croma%20Assets/Communication/Headphones%20and%20Earphones/Images/227824_0_fcnxfv.png",
      isNew: true,
      isBestSeller: true,
      rating: 4.5,
      reviews: 128,
      stockStatus: "In Stock",
      stockQuantity: 15,
      category: "Electronics",
      brand: "SoundPro",
      colors: [
        { name: "Black", value: "black", hex: "#000000" },
        { name: "Silver", value: "silver", hex: "#C0C0C0" },
      ],
      sizes: ["Standard"],
      features: [
        "High-fidelity sound",
        "Noise cancellation",
        "Wireless connectivity",
        "Long battery life",
        "Comfortable fit",
      ],
      shipping: "Free shipping on orders over $50",
      returns: "30-day easy returns and exchanges",
      images: [
        "https://media.croma.com/image/upload/v1723054217/Croma%20Assets/Communication/Headphones%20and%20Earphones/Images/227824_0_fcnxfv.png",
        "https://x.imastudent.com/content/0023420_marshall-monitor-ii-anc-wireless-headphones_500.jpeg",
        "https://mahajanelectronics.com/cdn/shop/files/712irsQ0gdL._SL1500.jpg?v=1728136536&width=1500",
      ],
    },
    {
      id: 2,
      title: "Apple Watch Pro",
      description: "Track your fitness and stay connected in style.",
      price: 19999.99,
      originalPrice: 24599.99,
      discount: "20% OFF",
      image:
        "https://www.jiomart.com/images/product/original/rvhjzhyxio/clubclassy-t500-smart-watch-full-screen-waterproof-touch-display-bluetooth-calling-fitpro-t500-smart-watches-fitness-tracker-compatible-with-all-android-amp-ios-black-product-images-orvhjzhyxio-p606648963-3-202312101651.jpg",
      isNew: true,
      isBestSeller: false,
      rating: 4.2,
      reviews: 95,
      stockStatus: "In Stock",
      stockQuantity: 20,
      category: "Wearables",
      brand: "TechFit",
      colors: [
        { name: "Black", value: "black", hex: "#000000" },
        { name: "Silver", value: "silver", hex: "#C0C0C0" },
      ],
      sizes: ["40mm", "44mm"],
      features: [
        "Heart Rate Monitor",
        "GPS Tracking",
        "Water Resistant",
        "Always-on Display",
        "Fitness App Integration",
      ],
      shipping: "Free shipping on orders over $50",
      returns: "30-day easy returns and exchanges",
      images: [
        "https://www.jiomart.com/images/product/original/rvhjzhyxio/clubclassy-t500-smart-watch-full-screen-waterproof-touch-display-bluetooth-calling-fitpro-t500-smart-watches-fitness-tracker-compatible-with-all-android-amp-ios-black-product-images-orvhjzhyxio-p606648963-3-202312101651.jpg",
        "https://static.toiimg.com/thumb/resizemode-4,msid-54128624,imgsize-500,width-800/54128624.jpg",
        "https://play-lh.googleusercontent.com/WuL1L1ZwDcYOdRwtib2D95uZyP0Z4HojhjDyXUoWauXoq6Ec-qtlpcEyTkZIcj_Nbw8=w600-h300-pc0xffffff-pd",
      ],
    },
    {
      id: 3,
      title: "Nike Air Max",
      description: "Comfortable and stylish running shoes for all-day wear.",
      price: 8999.99,
      originalPrice: 12999.99,
      discount: "30% OFF",
      image:
        "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/12b4c855-4419-4764-9178-bbbe5a64e6a1/NIKE+ZOOMX+INVINCIBLE+RN+3+OLY.png",
      isNew: false,
      isBestSeller: true,
      rating: 4.8,
      reviews: 234,
      stockStatus: "In Stock",
      stockQuantity: 18,
      category: "Footwear",
      brand: "SportFlex",
      colors: [
        { name: "Black", value: "black", hex: "#000000" },
        { name: "White", value: "white", hex: "#FFFFFF" },
      ],
      sizes: ["8", "9", "10", "11"],
      features: [
        "Lightweight",
        "Breathable Mesh",
        "Durable Sole",
        "Cushioned Comfort",
        "Stylish Design",
      ],
      shipping: "Free shipping on orders over $50",
      returns: "30-day easy returns and exchanges",
      images: [
        "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/12b4c855-4419-4764-9178-bbbe5a64e6a1/NIKE+ZOOMX+INVINCIBLE+RN+3+OLY.png",
        "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/88127f88-4f81-4f39-a106-862f414d882f/NIKE+ZOOMX+INVINCIBLE+RN+3+OLY.png",
        "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/859fa30e-c31d-48ab-bf59-f762734cdd39/NIKE+ZOOMX+INVINCIBLE+RN+3+OLY.png",
      ],
    },
    {
      id: 4,
      title: 'Samsung 65" QLED TV',
      description:
        "Ultra HD 4K smart TV with stunning picture quality and built-in streaming apps.",
      price: 89999.99,
      originalPrice: 109999.99,
      discount: "18% OFF",
      image:
        "https://images.samsung.com/is/image/samsung/p6pim/in/ua43t5410akxxl/gallery/in-fhd-t5310-ua43t5410akxxl-532972634?$684_547_PNG$",
      isNew: true,
      isBestSeller: false,
      rating: 4.7,
      reviews: 195,
      stockStatus: "In Stock",
      stockQuantity: 12,
      category: "Electronics",
      brand: "Samsung",
      colors: [{ name: "Black", value: "black", hex: "#000000" }],
      sizes: ["65 inch"],
      features: [
        "4K QLED Display",
        "Smart TV functionality",
        "Game Mode",
        "Voice Assistant",
      ],
      shipping: "Free shipping",
      returns: "14-day easy returns and exchanges",
      images: [
        "https://images.samsung.com/is/image/samsung/p6pim/in/ua43t5410akxxl/gallery/in-fhd-t5310-ua43t5410akxxl-532972634?$684_547_PNG$",
        "https://jamesandco.in/wp-content/uploads/2024/09/in-qled-q60d-qa55q60daulxl-539976106.jpg",
        "https://img.us.news.samsung.com/us/wp-content/uploads/2019/01/14103848/Samsung-TV_iTunes-Movies-and-TV-shows.jpg"
      ],
    },
    {
      id: 5,
      title: "Canon DSLR Camera",
      description:
        "Capture stunning photos with this professional-grade camera.",
      price: 80999.99,
      originalPrice: 89999.99,
      discount: "18% OFF",
      image:
        "https://images-cdn.ubuy.co.in/65fe64a89de64a706c0120dc-canon-eos-5d-mark-iv-dslr-camera-with.jpg",
      isNew: false,
      isBestSeller: true,
      rating: 4.9,
      reviews: 203,
      stockStatus: "Limited Stock",
      stockQuantity: 5,
      category: "Electronics",
      brand: "PhotoPro",
      colors: [{ name: "Black", value: "black", hex: "#000000" }],
      sizes: ["Standard"],
      features: [
        "24.1MP Sensor",
        "4K Video Recording",
        "Dual Pixel Autofocus",
        "Wi-Fi Connectivity",
        "Long Battery Life",
      ],
      shipping: "Free shipping",
      returns: "30-day easy returns and exchanges",
      images: [
        "https://images-cdn.ubuy.co.in/65fe64a89de64a706c0120dc-canon-eos-5d-mark-iv-dslr-camera-with.jpg",
        "https://m.media-amazon.com/images/I/91mjRsCxynL.jpg",
      ],
    },
    {
      id: 6,
      title: "Puma slides",
      description:
        "Luxurious, eco-friendly bedding for a comfortable night's sleep.",
      price: 1799.99,
      originalPrice: 2099.99,
      discount: "20% OFF",
      image:
        "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/396064/01/sv01/fnd/IND/fmt/png/Royalcat-Memory-Foam-Unisex-Slides",
      isNew: true,
      isBestSeller: false,
      rating: 4.7,
      reviews: 118,
      stockStatus: "In Stock",
      stockQuantity: 25,
      category: "Home",
      brand: "EcoLuxe",
      colors: [
        { name: "White", value: "white", hex: "#FFFFFF" },
        { name: "Beige", value: "beige", hex: "#F5F5DC" },
        { name: "Gray", value: "gray", hex: "#808080" },
      ],
      sizes: ["Twin", "Full", "Queen", "King"],
      features: [
        "100% Organic Cotton",
        "300 Thread Count",
        "Hypoallergenic",
        "Chemical-Free",
        "Easy Care",
      ],
      shipping: "Free shipping on orders over $50",
      returns: "30-day easy returns and exchanges",
      images: [
        "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/396064/01/sv01/fnd/IND/fmt/png/Royalcat-Memory-Foam-Unisex-Slides",
        "https://rukminim2.flixcart.com/image/850/1000/xif0q/slipper-flip-flop/q/l/0/-original-imaggty7jefs4bsf.jpeg?q=90&crop=false",
      ],
    },
  ];

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
      ? featuredProducts.filter((product) => product.isNew)
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
