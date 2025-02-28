import React, { Suspense, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Star, ShoppingCart, Heart, Share2, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
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
      "https://thedecorkart.com/cdn/shop/articles/Choosing_a_Compact_Study_Table_Lamp.jpg?v=1719574946",
      "https://thedecorkart.com/cdn/shop/articles/Choosing_a_Compact_Study_Table_Lamp.jpg?v=1719574946"
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
      "https://craftandglory.in/cdn/shop/files/SON000021.jpg?v=1711024390&width=1946",
      "https://craftandglory.in/cdn/shop/files/SON000021.jpg?v=1711024390&width=1946"
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
      "https://images.dailyobjects.com/marche/product-images/1809/trinity-wireless-charging-station-images/Trinity-Wireless-Charging-Station-4th.jpg?tr=cm-pad_crop,v-3,w-412,h-490,dpr-2,q-60",
      "https://images.dailyobjects.com/marche/product-images/1809/trinity-wireless-charging-station-images/Trinity-Wireless-Charging-Station-4th.jpg?tr=cm-pad_crop,v-3,w-412,h-490,dpr-2,q-60"
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
      "https://cdn.mos.cms.futurecdn.net/FkGweMeB7hdPgaSFQdgsfj-1200-80.jpg",
      "https://cdn.mos.cms.futurecdn.net/FkGweMeB7hdPgaSFQdgsfj-1200-80.jpg"
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
      "https://assets.bose.com/content/dam/cloudassets/Bose_DAM/Web/consumer_electronics/global/products/speakers/SLMAX-SPEAKERWIRELESS/product_silo_images/aem_pdp_SLMPS_gallery_black_600x511_x2_1.jpg/jcr:content/renditions/cq5dam.web.1920.1920.jpeg",
      "https://assets.bose.com/content/dam/cloudassets/Bose_DAM/Web/consumer_electronics/global/products/speakers/SLMAX-SPEAKERWIRELESS/product_silo_images/aem_pdp_SLMPS_gallery_black_600x511_x2_1.jpg/jcr:content/renditions/cq5dam.web.1920.1920.jpeg"
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

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && (
        <div className="relative">
          <Star className="w-4 h-4 text-yellow-400" />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      ))}
    </div>
  );
};

const ColorPicker = ({ colors, selectedColor, onSelectColor }) => {
  return (
    <div className="flex gap-2 mt-2">
      {colors.map(color => (
        <button
          key={color.value}
          className={`w-8 h-8 rounded-full border-2 ${selectedColor === color.value ? 'border-blue-500' : 'border-transparent'}`}
          style={{ backgroundColor: color.hex }}
          onClick={() => onSelectColor(color.value)}
          aria-label={`Select ${color.name}`}
        />
      ))}
    </div>
  );
};

const SizeSelector = ({ sizes, selectedSize, onSelectSize }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {sizes.map(size => (
        <button
          key={size}
          className={`px-3 py-1 border rounded-md transition-all ${
            selectedSize === size 
              ? 'border-blue-500 bg-blue-50 text-blue-600' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onClick={() => onSelectSize(size)}
        >
          {size}
        </button>
      ))}
    </div>
  );
};

const QuantitySelector = ({ quantity, setQuantity, maxQuantity }) => {
  return (
    <div className="flex items-center border rounded-md w-32">
      <button 
        className="px-3 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
        onClick={() => quantity > 1 && setQuantity(quantity - 1)}
        disabled={quantity <= 1}
      >
        -
      </button>
      <span className="flex-1 text-center">{quantity}</span>
      <button 
        className="px-3 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
        onClick={() => quantity < maxQuantity && setQuantity(quantity + 1)}
        disabled={quantity >= maxQuantity}
      >
        +
      </button>
    </div>
  );
};

export default function TrendingPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedTab, setSelectedTab] = useState("details");
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  useEffect(() => {
    // Reset state when a new item is selected
    if (selectedItem) {
      setSelectedColor(selectedItem.colors?.[0]?.value || "black");
      setSelectedSize(selectedItem.sizes?.[0] || "");
      setQuantity(1);
      setIsWishlisted(false);
      setCurrentImageIndex(0);
      setSelectedTab("details");
    }
  }, [selectedItem]);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNextImage = () => {
    if (selectedItem && selectedItem.images) {
      setCurrentImageIndex((prev) => 
        prev < selectedItem.images.length - 1 ? prev + 1 : 0
      );
    }
  };
  
  const handlePrevImage = () => {
    if (selectedItem && selectedItem.images) {
      setCurrentImageIndex((prev) => 
        prev > 0 ? prev - 1 : selectedItem.images.length - 1
      );
    }
  };
  
  const handleAddToCart = () => {
    console.log("Adding to cart:", {
      item: selectedItem,
      color: selectedColor,
      size: selectedSize,
      quantity
    });
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

                    <CardContent className="space-y-2 flex-grow flex flex-col justify-between">
                      <p className="text-sm opacity-75 leading-snug">
                        {item.description}
                      </p>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                        <span className="text-lg font-medium">
                          ₹{item.price.toFixed(2)}
                        </span>
                        <button 
                          className="w-full sm:w-auto px-4 py-2 border rounded-md font-medium hover:shadow-lg transition bg-black hover:bg-gray-700 dark:bg-neutral-900 text-white dark:hover:bg-gray-600"
                          onClick={() => openModal(item)}
                        >
                          Details
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

      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className="max-w-4xl max-h-[100vh] overflow-y-auto p-0">
          {selectedItem && (
            <>
              <DialogHeader className="px-6 pt-6">
                <DialogTitle className="text-2xl font-bold">{selectedItem.title}</DialogTitle>
                <DialogDescription>
                  <span className="text-sm text-gray-500">{selectedItem.brand} • {selectedItem.category}</span>
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">

                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden border h-80 bg-gray-50">
                    <Suspense fallback={<div className="w-full h-full bg-gray-200 animate-pulse"></div>}>
                      <LazyImage
                        src={selectedItem.images[currentImageIndex]}
                        alt={`${selectedItem.title} - View ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </Suspense>
                    
                    <button 
                      onClick={handlePrevImage} 
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 dark:bg-gray-500 flex items-center justify-center shadow-md hover:bg-white"
                      aria-label="Previous image"
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <button 
                      onClick={handleNextImage} 
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 dark:bg-gray-500 flex items-center justify-center shadow-md hover:bg-white"
                      aria-label="Next image"
                    >
                      <ArrowRight size={16} />
                    </button>
                    
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                      {selectedItem.images.map((_, index) => (
                        <button
                          key={index}
                          className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
                          onClick={() => setCurrentImageIndex(index)}
                          aria-label={`View image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Thumbnail images */}
                  <div className="flex gap-2">
                    {selectedItem.images.map((img, index) => (
                      <button
                        key={index}
                        className={`border rounded-md overflow-hidden w-16 h-16 ${
                          index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <LazyImage
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-5">
                  <Tabs defaultValue="details" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="features">Features</TabsTrigger>
                      <TabsTrigger value="shipping">Shipping</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="details" className="space-y-4">
                      <p className="text-sm text-gray-600">{selectedItem.description}</p>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <RatingStars rating={selectedItem.rating} />
                          <span className="text-sm font-medium">{selectedItem.rating}</span>
                          <span className="text-sm text-gray-500">({selectedItem.reviews} reviews)</span>
                        </div>
                        
                        <p className="text-sm">
                          <span className={`font-medium ${
                            selectedItem.stockStatus === "In Stock" 
                              ? "text-green-600" 
                              : selectedItem.stockStatus === "Limited Stock" 
                                ? "text-orange-500" 
                                : "text-red-500"
                          }`}>
                            {selectedItem.stockStatus}
                          </span>
                          {selectedItem.stockStatus === "In Stock" && (
                            <span className="text-gray-500"> - {selectedItem.stockQuantity} available</span>
                          )}
                        </p>
                      </div>
                      
                      {selectedItem.colors && selectedItem.colors.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-1">Color</p>
                          <ColorPicker 
                            colors={selectedItem.colors} 
                            selectedColor={selectedColor} 
                            onSelectColor={setSelectedColor} 
                          />
                        </div>
                      )}
                      
                      {selectedItem.sizes && selectedItem.sizes.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-1">Size</p>
                          <SizeSelector 
                            sizes={selectedItem.sizes} 
                            selectedSize={selectedSize} 
                            onSelectSize={setSelectedSize} 
                          />
                        </div>
                      )}
                      
                      <div className="flex items-center gap-4">
                        <p className="text-sm font-medium">Quantity</p>
                        <QuantitySelector 
                          quantity={quantity} 
                          setQuantity={setQuantity} 
                          maxQuantity={selectedItem.stockQuantity || 10}
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="features" className="space-y-4">
                      <ul className="space-y-2">
                        {selectedItem.features && selectedItem.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                    
                    <TabsContent value="shipping" className="space-y-4">
                      <div className="rounded-md bg-blue-50 p-3 text-blue-800">
                        <p className="font-medium">Shipping</p>
                        <p className="text-sm">{selectedItem.shipping || "Free shipping on orders over ₹999"}</p>
                      </div>
                      
                      <div className="rounded-md bg-green-50 p-3 text-green-800">
                        <p className="font-medium">Returns & Exchanges</p>
                        <p className="text-sm">{selectedItem.returns || "30-day easy returns and exchanges"}</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="pt-2 border-t">
                  <p className="text-3xl font-bold">₹{selectedItem.price.toFixed(2)}</p>
                  <p className="text-sm text-green-600">Inclusive of all taxes</p>
                </div>
                
                <div className="flex gap-3 pt-2">
                  <Button 
                    className="flex-1 gap-2" 
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </Button>
                  <Button 
                    className={`${isWishlisted ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    variant="outline"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
                  </Button>
                  <Button 
                    variant="outline"
                    className="bg-gray-100 text-gray-700 hover:bg-gray-200"
                  >
                    <Share2 size={16} />
                  </Button>
                </div>

                </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>

    </div>
  )
}
