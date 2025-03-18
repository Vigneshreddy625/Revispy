import React, { Suspense, useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Product from "../Modals/Product";
import ProductCard from "../Product/ProductCard";
import { useSelector } from "react-redux";
import { getTwelveRandomItems } from "../utils/RandomGen";
const LazyImage = React.lazy(() => import("../Items/LazyImage"));

const chunkArray = (array, chunkSize) => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

export default function TrendingPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const trendingItems = useSelector(getTwelveRandomItems);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  const handleAddToCart = (productDetails) => {
    console.log("Adding to cart:", productDetails);
  };

  const itemsPerChunk = isMobile ? 1 : window.innerWidth < 1024 ? 2 : 3;
  const chunks = chunkArray(trendingItems, itemsPerChunk);

  return (
    <div className="lg:min-h-screen flex flex-col justify-center items-center px-4 py-8 space-y-8">
      <section className="text-center">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight">
          Trending Today
        </h1>
        <p className="text-base sm:text-lg md:text-xl mt-2 opacity-80 max-w-md mx-auto">
          Explore our most popular picks loved by our community.
        </p>
      </section>

      <Carousel className="w-full max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-7xl">
        <CarouselContent>
          {chunks.map((chunk, index) => (
            <CarouselItem key={index}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
                {chunk.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    openModal={openModal}
                    toggleWishlist={toggleWishlist}
                    wishlist={wishlist}
                    handleAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden sm:block">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>

      <Product
        isOpen={isModalOpen}
        onClose={closeModal}
        product={selectedItem}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
