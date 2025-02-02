import React, { Suspense, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
const LazyImage = React.lazy(() => import("./LazyImage"));

const trendingItems = [
  {
    id: 1,
    title: "Smart TVS",
    description: "Noise-cancelling, wireless, and high-fidelity sound quality.",
    price: 19999.99,
    image:
      "https://www.livemint.com/lm-img/img/2024/05/02/1600x900/75_inch_smart_tv_1714649551876_1714649561405.jpg",
    isNew: true,
  },
  {
    id: 2,
    title: "Modern Desk Lamp",
    description: "Minimalistic and adjustable, perfect for any workspace and study place.",
    price: 890.99,
    image:
      "https://thedecorkart.com/cdn/shop/articles/Choosing_a_Compact_Study_Table_Lamp.jpg?v=1719574946",
    isNew: false,
  },
  {
    id: 3,
    title: "Leather Backpack",
    description: "Spacious and durable, made with premium materials to carry.",
    price: 1490.99,
    image:
      "https://craftandglory.in/cdn/shop/files/SON000021.jpg?v=1711024390&width=1946",
    isNew: true,
  },
  {
    id: 4,
    title: "Wireless Charging Pad",
    description: "Fast charging with elegant design for any device.",
    price: 5999.99,
    image:
      "https://images.dailyobjects.com/marche/product-images/1809/trinity-wireless-charging-station-images/Trinity-Wireless-Charging-Station-4th.jpg?tr=cm-pad_crop,v-3,w-412,h-490,dpr-2,q-60",
    isNew: false,
  },
  {
    id: 5,
    title: "Smart Watch",
    description: "Track your fitness and stay connected in style.",
    price: 29999.99,
    image:
      "https://cdn.mos.cms.futurecdn.net/FkGweMeB7hdPgaSFQdgsfj-1200-80.jpg",
    isNew: true,
  },
  {
    id: 6,
    title: "Portable Speaker",
    description: "Premium sound quality in a compact design.",
    price: 12999.99,
    image:
      "https://assets.bose.com/content/dam/cloudassets/Bose_DAM/Web/consumer_electronics/global/products/speakers/SLMAX-SPEAKERWIRELESS/product_silo_images/aem_pdp_SLMPS_gallery_black_600x511_x2_1.jpg/jcr:content/renditions/cq5dam.web.1920.1920.jpeg",
    isNew: false,
  },
];

const chunkArray = (array, chunkSize) => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

export default function TrendingPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const itemsPerChunk = isMobile ? 1 : window.innerWidth < 1024 ? 2 : 3;
  const chunks = chunkArray(trendingItems, itemsPerChunk);

  return (
    <div className="lg:min-h-screen flex flex-col justify-center items-center px-4 py-8 space-y-8">
      <section className="text-center">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight">
          Trending Now
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
                {chunk.map((item) => (
                  <Card 
                    key={item.id} 
                    className="shadow-lg rounded-lg overflow-hidden flex flex-col h-full"
                  >
                    <div className="relative">
                      <Suspense 
                        fallback={
                          <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
                        }
                      >
                        <LazyImage
                          src={item.image}
                          alt={item.title}
                          className="w-full h-48 sm:h-56 object-cover"
                        />
                      </Suspense>

                      {item.isNew && (
                        <div className="absolute top-2 right-2 bg-white text-black bg-opacity-90 px-3 py-1 rounded">
                          <span className="text-xs uppercase tracking-widest font-semibold">
                            New
                          </span>
                        </div>
                      )}
                    </div>

                    <CardHeader className="flex-none">
                      <CardTitle className="text-lg sm:text-xl font-semibold leading-tight">
                        {item.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4 flex-grow flex flex-col justify-between">
                      <p className="text-sm opacity-75 leading-snug">
                        {item.description}
                      </p>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                        <span className="text-lg font-medium">
                          ₹{item.price.toFixed(2)}
                        </span>
                        <button className="w-full sm:w-auto px-4 py-2 border rounded-md font-medium hover:shadow-lg transition bg-black hover:bg-gray-700 dark:bg-neutral-900 text-white dark:hover:bg-gray-600">
                          Add to Cart
                        </button>
                      </div>
                    </CardContent>
                  </Card>
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
    </div>
  );
}