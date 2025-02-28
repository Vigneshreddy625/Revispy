import React, { Suspense, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Product from "../Modals/Product";
import { Heart, Eye, ShoppingCart} from "lucide-react";
import {Button} from "../ui/button";
const LazyImage = React.lazy(() => import("../Items/LazyImage"));

const trendingItems = [
  {
    id: 1,
    title: "Smart TVS",
    description: "Noise-cancelling, wireless, and high-fidelity sound quality.",
    price: 19999.99,
    image:
      "https://www.livemint.com/lm-img/img/2024/05/02/1600x900/75_inch_smart_tv_1714649551876_1714649561405.jpg",
    isNew: true,
    rating: 4.5,
    reviews: 128,
    stockStatus: "In Stock",
    stockQuantity: 15,
    category: "Electronics",
    brand: "Samsung",
    colors: [
      { name: "Black", value: "black", hex: "#000000" },
      { name: "Silver", value: "silver", hex: "#C0C0C0" },
    ],
    sizes: ["43\"", "50\"", "55\"", "65\"", "75\""],
    features: [
      "4K Ultra HD Resolution",
      "Smart TV Functionality",
      "Multiple HDMI Ports",
      "Built-in Wi-Fi",
      "Voice Control Compatible"
    ],
    shipping: "Free shipping on orders over ₹999",
    returns: "30-day easy returns and exchanges",
    images: [
      "https://www.livemint.com/lm-img/img/2024/05/02/1600x900/75_inch_smart_tv_1714649551876_1714649561405.jpg",
      "https://www.livemint.com/lm-img/img/2024/05/02/1600x900/75_inch_smart_tv_1714649551876_1714649561405.jpg",
      "https://www.livemint.com/lm-img/img/2024/05/02/1600x900/75_inch_smart_tv_1714649551876_1714649561405.jpg"
    ]
  },
  {
    id: 2,
    title: "Modern Desk Lamp",
    description: "Minimalistic and adjustable, perfect for any workspace and study place.",
    price: 890.99,
    image:
      "https://thedecorkart.com/cdn/shop/articles/Choosing_a_Compact_Study_Table_Lamp.jpg?v=1719574946",
    isNew: false,
    rating: 4.2,
    reviews: 75,
    stockStatus: "In Stock",
    stockQuantity: 25,
    category: "Home & Decor",
    brand: "Phillips",
    colors: [
      { name: "White", value: "white", hex: "#FFFFFF" },
      { name: "Black", value: "black", hex: "#000000" },
      { name: "Gold", value: "gold", hex: "#FFD700" }
    ],
    sizes: ["Small", "Medium", "Large"],
    features: [
      "Adjustable Brightness",
      "Touch Controls",
      "USB Charging Port",
      "Energy Efficient LED",
      "Flexible Neck Design"
    ],
    shipping: "Free shipping on orders over ₹999",
    returns: "30-day easy returns and exchanges",
    images: [
      "https://thedecorkart.com/cdn/shop/articles/Choosing_a_Compact_Study_Table_Lamp.jpg?v=1719574946",
      "https://www.homesake.in/cdn/shop/files/IH0E574_theme.jpg?v=1704885814",
      "https://lostine.com/cdn/shop/products/CeramicLamp_Bone_Lifestyle_4_1200x.jpg?v=1714058459"
      ]
  },
  {
    id: 3,
    title: "Leather Backpack",
    description: "Spacious and durable, made with premium materials to carry.",
    price: 1490.99,
    image:
      "https://craftandglory.in/cdn/shop/files/SON000021.jpg?v=1711024390&width=1946",
    isNew: true,
    rating: 4.7,
    reviews: 92,
    stockStatus: "In Stock",
    stockQuantity: 18,
    category: "Accessories",
    brand: "American Tourister",
    colors: [
      { name: "Brown", value: "brown", hex: "#8B4513" },
      { name: "Black", value: "black", hex: "#000000" },
      { name: "Tan", value: "tan", hex: "#D2B48C" }
    ],
    sizes: ["Standard"],
    features: [
      "Genuine Leather Material",
      "Multiple Compartments",
      "Laptop Sleeve",
      "Water-Resistant Finish",
      "Adjustable Straps"
    ],
    shipping: "Free shipping on orders over ₹999",
    returns: "30-day easy returns and exchanges",
    images: [
      "https://craftandglory.in/cdn/shop/files/SON000021.jpg?v=1711024390&width=1946",
      "https://teakwoodleathers.com/cdn/shop/products/NiS9-2Uo_1080x.jpg?v=1650717093",
      "https://www.leathertalks.com/cdn/shop/files/ladiesleatherlaptopbackpack_69a58a35-602d-4cc4-8d16-8eafd825b773.jpg?v=1706792294"
    ]
  },
  {
    id: 4,
    title: "Wireless Charging Pad",
    description: "Fast charging with elegant design for any device.",
    price: 5999.99,
    image:
      "https://images.dailyobjects.com/marche/product-images/1809/trinity-wireless-charging-station-images/Trinity-Wireless-Charging-Station-4th.jpg?tr=cm-pad_crop,v-3,w-412,h-490,dpr-2,q-60",
    isNew: false,
    rating: 4.0,
    reviews: 64,
    stockStatus: "Limited Stock",
    stockQuantity: 5,
    category: "Electronics",
    brand: "Anker",
    colors: [
      { name: "Black", value: "black", hex: "#000000" },
      { name: "White", value: "white", hex: "#FFFFFF" }
    ],
    sizes: ["Standard"],
    features: [
      "15W Fast Charging",
      "Multiple Device Support",
      "Qi Certification",
      "LED Charging Indicator",
      "Compact Design"
    ],
    shipping: "Free shipping on orders over ₹999",
    returns: "30-day easy returns and exchanges",
    images: [
      "https://images.dailyobjects.com/marche/product-images/1809/trinity-wireless-charging-station-images/Trinity-Wireless-Charging-Station-4th.jpg?tr=cm-pad_crop,v-3,w-412,h-490,dpr-2,q-60",
      "https://www.cnet.com/a/img/resize/e2058cf800dbc5ce9ac7aa056fbe2f8c2b8cacfb/hub/2023/02/28/9da2e9c7-d07d-45cb-89d1-18c7013249e5/anker-315-wireless-charger.png?auto=webp&fit=crop&height=1200&width=1200",
      "https://images.samsung.com/is/image/samsung/p6pim/in/feature/164005327/in-feature-colors-inform-charging-status-531902239?$FB_TYPE_A_MO_JPG$"
    ]
  },
  {
    id: 5,
    title: "Smart Watch",
    description: "Track your fitness and stay connected in style.",
    price: 29999.99,
    image:
      "https://cdn.mos.cms.futurecdn.net/FkGweMeB7hdPgaSFQdgsfj-1200-80.jpg",
    isNew: true,
    rating: 4.8,
    reviews: 217,
    stockStatus: "In Stock",
    stockQuantity: 20,
    category: "Wearables",
    brand: "Apple",
    colors: [
      { name: "Black", value: "black", hex: "#000000" },
      { name: "Silver", value: "silver", hex: "#C0C0C0" },
      { name: "Gold", value: "gold", hex: "#FFD700" }
    ],
    sizes: ["40mm", "44mm"],
    features: [
      "Heart Rate Monitor",
      "GPS Tracking",
      "Water Resistant",
      "Always-on Display",
      "Fitness App Integration"
    ],
    shipping: "Free shipping on orders over ₹999",
    returns: "30-day easy returns and exchanges",
    images: [
      "https://cdn.mos.cms.futurecdn.net/FkGweMeB7hdPgaSFQdgsfj-1200-80.jpg",
      "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw61458d43/images/Titan/Catalog/90188AP01_1.jpg?sw=600&sh=600",
      "https://m.media-amazon.com/images/I/7161CULzh+L.jpg"
    ]
  },
  {
    id: 6,
    title: "Portable Speaker",
    description: "Premium sound quality in a compact design.",
    price: 12999.99,
    image:
      "https://assets.bose.com/content/dam/cloudassets/Bose_DAM/Web/consumer_electronics/global/products/speakers/SLMAX-SPEAKERWIRELESS/product_silo_images/aem_pdp_SLMPS_gallery_black_600x511_x2_1.jpg/jcr:content/renditions/cq5dam.web.1920.1920.jpeg",
    isNew: false,
    rating: 4.3,
    reviews: 156,
    stockStatus: "In Stock",
    stockQuantity: 12,
    category: "Audio",
    brand: "Bose",
    colors: [
      { name: "Black", value: "black", hex: "#000000" },
      { name: "Blue", value: "blue", hex: "#0000FF" },
      { name: "Red", value: "red", hex: "#FF0000" }
    ],
    sizes: ["Standard"],
    features: [
      "360° Sound",
      "Waterproof Design",
      "Bluetooth Connectivity",
      "20-Hour Battery Life",
      "Voice Assistant Support"
    ],
    shipping: "Free shipping on orders over ₹999",
    returns: "30-day easy returns and exchanges",
    images: [
      "https://assets.bose.com/content/dam/cloudassets/Bose_DAM/Web/consumer_electronics/global/products/speakers/SLMAX-SPEAKERWIRELESS/product_silo_images/aem_pdp_SLMPS_gallery_black_600x511_x2_1.jpg/jcr:content/renditions/cq5dam.web.1920.1920.jpeg",
      "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1730266533/Croma%20Assets/Entertainment/Speakers%20and%20Media%20Players/Images/307854_0_n3buu6.png",
      "https://i.rtings.com/assets/products/y8VC5NUj/bose-soundlink-flex/design-small.jpg?format=auto"
    ]
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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
        setWishlist(wishlist.filter(id => id !== productId));
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
                  <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden" onClick={() => openModal(product)}>
                      <Suspense fallback={<div className="w-full h-64 bg-gray-200 animate-pulse" />}>
                        <div className="w-full h-64 overflow-hidden">
                          <LazyImage 
                            src={product.image} 
                            alt={product.title} 
                            className="w-full h-full object-cover cursor-pointer group-hover:scale-110 transition-transform duration-500" 
                          />
                        </div>
                      </Suspense>
                      {product.discount && (
                        <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs font-medium rounded">
                          {product.discount}
                        </span>
                      )}
                      {product.isNew && (
                        <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 text-xs font-medium rounded">
                          NEW
                        </span>
                      )}
                      <div className="absolute -right-12 top-14 group-hover:right-2 transition-all duration-300 flex flex-col gap-2">
                        <button 
                          className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 text-gray-700"
                          onClick={() => toggleWishlist(product.id)}
                        >
                          <Heart className="h-5 w-5" fill={wishlist.includes(product.id) ? "red" : "none"} color={wishlist.includes(product.id) ? "red" : "currentColor"} />
                        </button>
                        <button 
                          className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 text-gray-700"
                          onClick={() => openModal(product)}
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button 
                          className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 text-gray-700"
                          onClick={() => handleAddToCart(product)}
                        >
                          <ShoppingCart className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium mb-2 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors" onClick={() => openModal(product)}>{product.title}</h3>
                      {product.isBestSeller && (
                        <span className="mb-1 text-xs font-medium rounded">
                          (BEST SELLER)
                        </span>
                      )}
                      </div>
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400">
                          {'★'.repeat(Math.floor(product.rating))}
                          {'☆'.repeat(5 - Math.floor(product.rating))}
                        </div>
                        <span className="text-sm ml-2 text-gray-600 dark:text-gray-400">({product.reviews})</span>
                        {product.stockStatus === "Limited Stock" && (
                        <div className="ml-2">
                          <p className="text-xs text-amber-600 font-medium">Only {product.stockQuantity} left!</p>
                        </div>
                      )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <p className="text-xl font-semibold">₹{product.price}</p>
                        {product.originalPrice && (
                          <p className="text-sm text-gray-500 line-through">₹{product.originalPrice}</p>
                        )}
                      </div>
                      <div className="mt-3">
                        <Button size="sm" className="w-full" onClick={() => handleAddToCart(product)}>
                          Add to Cart
                        </Button>
                      </div>
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

      <Product
        isOpen={isModalOpen}
        onClose={closeModal}
        product={selectedItem}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}