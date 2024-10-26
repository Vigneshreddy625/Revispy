import React, {Suspense} from "react";
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
    price: 199.99,
    image:
      "https://www.livemint.com/lm-img/img/2024/05/02/1600x900/75_inch_smart_tv_1714649551876_1714649561405.jpg",
    isNew: true,
  },
  {
    id: 2,
    title: "Modern Desk Lamp",
    description: "Minimalistic and adjustable, perfect for any workspace.",
    price: 89.99,
    image:
      "https://thedecorkart.com/cdn/shop/articles/Choosing_a_Compact_Study_Table_Lamp.jpg?v=1719574946",
    isNew: false,
  },
  {
    id: 3,
    title: "Leather Backpack",
    description: "Spacious and durable, made with premium materials to carry.",
    price: 149.99,
    image:
      "https://craftandglory.in/cdn/shop/files/SON000021.jpg?v=1711024390&width=1946",
    isNew: true,
  },
  {
    id: 4,
    title: "Wireless Charging Pad",
    description: "Fast charging with elegant design for any device.",
    price: 59.99,
    image:
      "https://images.dailyobjects.com/marche/product-images/1809/trinity-wireless-charging-station-images/Trinity-Wireless-Charging-Station-4th.jpg?tr=cm-pad_crop,v-3,w-412,h-490,dpr-2,q-60",
    isNew: false,
  },
  {
    id: 5,
    title: "Smart Watch",
    description: "Track your fitness and stay connected in style.",
    price: 299.99,
    image:
      "https://cdn.mos.cms.futurecdn.net/FkGweMeB7hdPgaSFQdgsfj-1200-80.jpg",
    isNew: true,
  },
  {
    id: 6,
    title: "Portable Speaker",
    description: "Premium sound quality in a compact design.",
    price: 129.99,
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
  const itemChunks = chunkArray(trendingItems, 3);
  const isMobile = window.innerWidth <= 1024;
  const mobilechunks = chunkArray(trendingItems, 1);
  const chunks = isMobile ? mobilechunks : itemChunks

  return (
    <div className="container mx-auto p-6 space-y-8">
      <section className="text-center">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Trending Now
        </h1>
        <p className="text-lg md:text-xl mt-2 opacity-80 max-w-md mx-auto">
          Explore our most popular picks loved by our community.
        </p>
      </section>
      <Carousel className="w-full">
        <CarouselContent>
          {chunks.map((chunk, index) => (
            <CarouselItem key={index}>
              <div className="flex justify-between p-4">
                {chunk.map((item) => (
                  <div key={item.id} className="w-full mx-2">
                    <Card className="shadow-lg rounded-lg overflow-hidden">
                      <div className="relative">
                        <Suspense fallback={<div>Loading...</div>}>
                          <LazyImage
                            src={item.image}
                            alt={item.title}
                            className="w-full h-64 object-cover"
                          />
                        </Suspense>

                        <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-3 py-1 rounded">
                          {item.isNew && (
                            <span className="text-xs uppercase tracking-widest font-semibold text-b">
                              New
                            </span>
                          )}
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl font-semibold leading-tight">
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p className="text-sm opacity-75 leading-snug">
                          {item.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-medium">
                            ${item.price.toFixed(2)}
                          </span>
                          <button className="px-4 py-2 border rounded-md font-medium hover:shadow-lg transition">
                            Add to Cart
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
