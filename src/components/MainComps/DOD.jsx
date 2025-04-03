import React, { useState, useEffect } from "react";
import { Grid, List, Clock, ShoppingCart, Heart } from "lucide-react";
import ProductCard from "../Product/ProductCard";
import ProductList from "../Product/ProductList";
import Product from "../Modals/Product";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";
import { getOneRandomItems } from "../utils/RandomGen";

const DealOfDay = () => {
  // const dealProduct = 
  // {
  //   id: 3,
  //   title: "Nike Air Max",
  //   description: "Comfortable and stylish running shoes for all-day wear.",
  //   price: 8999.99,
  //   originalPrice: 12999.99,
  //   discount: "30% OFF",
  //   image:
  //     "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/12b4c855-4419-4764-9178-bbbe5a64e6a1/NIKE+ZOOMX+INVINCIBLE+RN+3+OLY.png",
  //   isNew: false,
  //   isBestSeller: true,
  //   rating: 4.8,
  //   reviews: 234,
  //   stockStatus: "In Stock",
  //   stockQuantity: 18,
  //   category: "Footwear",
  //   brand: "SportFlex",
  //   colors: [
  //     { name: "Black", value: "black", hex: "#000000" },
  //     { name: "White", value: "white", hex: "#FFFFFF" },
  //   ],
  //   sizes: ["8", "9", "10", "11"],
  //   features: [
  //     "Lightweight",
  //     "Breathable Mesh",
  //     "Durable Sole",
  //     "Cushioned Comfort",
  //     "Stylish Design",
  //   ],
  //   shipping: "Free shipping on orders over $50",
  //   returns: "30-day easy returns and exchanges",
  //   images: [
  //     "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/12b4c855-4419-4764-9178-bbbe5a64e6a1/NIKE+ZOOMX+INVINCIBLE+RN+3+OLY.png",
  //     "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/88127f88-4f81-4f39-a106-862f414d882f/NIKE+ZOOMX+INVINCIBLE+RN+3+OLY.png",
  //     "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/859fa30e-c31d-48ab-bf59-f762734cdd39/NIKE+ZOOMX+INVINCIBLE+RN+3+OLY.png",
  //   ],
  // };

  const [viewMode, setViewMode] = useState("list");
  const [wishlist, setWishlist] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  const isMobile = window.innerWidth < 1024;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setViewMode("grid");
      } else {
        setViewMode("list");
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const dealProduct = useSelector((state) => state.products?.items.data[15]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        let { hours, minutes, seconds } = prev;
        
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
              clearInterval(timer);
              return { hours: 0, minutes: 0, seconds: 0 };
            }
          }
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const isInWishlist = prev.includes(productId);
      const newWishlist = isInWishlist 
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      
      showToast(
        isInWishlist 
          ? `Removed from wishlist` 
          : `Added to wishlist`, 
        isInWishlist ? "warning" : "success"
      );
      
      return newWishlist;
    });
  };

  const handleAddToCart = (product) => {
    console.log(`Added to cart: ${product.title}`);
    showToast(`${product.title} added to cart`, "success");
  };

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast({ visible: false, message: "", type: "success" });
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 p-6 rounded-lg text-center bg-gradient-to-r ">
        <div className="flex justify-center items-center mb-4">
          <Clock className="mr-2 mt-1 text-blue-600 dark:text-gray-300" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Deal of the Day
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-200 mb-4">
          Limited time offer - Grab this amazing deal before it's gone!
        </p>
        
        <div className="flex justify-center space-x-4">
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
            <span className="text-2xl font-bold text-blue-600 dark:text-gray-300">
              {timeRemaining.hours.toString().padStart(2, '0')}
            </span>
            <p className="text-xs text-gray-500 dark:text-gray-400">Hours</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
            <span className="text-2xl font-bold text-blue-600 dark:text-gray-300">
              {timeRemaining.minutes.toString().padStart(2, '0')}
            </span>
            <p className="text-xs text-gray-500 dark:text-gray-400">Minutes</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
            <span className="text-2xl font-bold text-blue-600 dark:text-gray-300">
              {timeRemaining.seconds.toString().padStart(2, '0')}
            </span>
            <p className="text-xs text-gray-500 dark:text-gray-400">Seconds</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <span className="text-gray-700 dark:text-gray-200">
            1 product available
          </span>
          <Badge variant="secondary" className="ml-2 mt-0.5">
            Limited Stock
          </Badge>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={() => setViewMode("grid")}
            variant={viewMode === "grid" ? "default" : "outline"}
            aria-label="Grid view"
          >
            <Grid size={16} className="mr-1" /> Grid
          </Button>
          {!isMobile && (
            <Button
              onClick={() => setViewMode("list")}
              variant={viewMode === "list" ? "default" : "outline"}
              aria-label="List view"
            >
              <List size={16} className="mr-1" /> List
            </Button>
          )}
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="flex justify-center items-center gap-4 flex-wrap">
          <ProductCard
            key={dealProduct._id}
            product={dealProduct}
            openModal={openModal}
            toggleWishlist={toggleWishlist}
            wishlist={wishlist}
            handleAddToCart={handleAddToCart}
          />
        </div>
      ) : (
        <div className="space-y-4">
          <ProductList
            key={dealProduct._id}
            product={dealProduct}
            openModal={openModal}
            toggleWishlist={toggleWishlist}
            wishlist={wishlist}
            handleAddToCart={handleAddToCart}
          />
        </div>
      )}

      <Product
        isOpen={isModalOpen}
        onClose={closeModal}
        product={selectedItem}
        onAddToCart={handleAddToCart}
      />

      {toast.visible && (
        <div 
          className={`
            fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 animate-fadeIn
            ${toast.type === "success" 
              ? "bg-green-600 text-white" 
              : "bg-yellow-600 text-white"
            }
          `}
        >
          {toast.type === "success" ? (
            <ShoppingCart className="inline-block mr-2 -mt-1" size={18} />
          ) : (
            <Heart className="inline-block mr-2 -mt-1" size={18} />
          )}
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default DealOfDay;