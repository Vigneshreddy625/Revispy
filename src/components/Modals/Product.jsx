import React, { Suspense, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Lens } from "../ui/lens";
import { Star, ShoppingCart, Heart, Share2, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
const LazyImage = React.lazy(() => import("../Items/LazyImage"));

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
          className={`w-8 h-8 rounded-full border-2  ${selectedColor === color.value ? 'border-blue-500' : 'border-transparent dark:border-gray-700'}`}
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

const Product = ({ 
  isOpen, 
  onClose, 
  product, 
  onAddToCart 
}) => {
  const [selectedTab, setSelectedTab] = useState("details");
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors?.[0]?.value || "black");
      setSelectedSize(product.sizes?.[0] || "");
      setQuantity(1);
      setIsWishlisted(false);
      setCurrentImageIndex(0);
      setSelectedTab("details");
    }
  }, [product]);

  const handleNextImage = () => {
    if (product && product.images) {
      setCurrentImageIndex((prev) => 
        prev < product.images.length - 1 ? prev + 1 : 0
      );
    }
  };
  
  const handlePrevImage = () => {
    if (product && product.images) {
      setCurrentImageIndex((prev) => 
        prev > 0 ? prev - 1 : product.images.length - 1
      );
    }
  };
  
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart({
        item: product,
        color: selectedColor,
        size: selectedSize,
        quantity
      });
    }
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-screen lg:max-h-[85vh] overflow-y-auto p-0 border">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-2xl font-bold">{product.title}</DialogTitle>
          <DialogDescription>
            <span className="text-sm text-gray-500">{product.brand} • {product.category}</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div className="space-y-4">
            <div className="relative rounded-lg overflow-hidden border h-58">
              <Suspense fallback={<div className="w-full h-full animate-pulse"></div>}>
                <Lens hovering={hovering} setHovering={setHovering}>
                  <LazyImage
                    src={product.images[currentImageIndex]}
                    alt={`${product.title} - View ${currentImageIndex + 1}`}
                    className="w-full h-full max-h-96 object-cover"
                  />
                </Lens>
              </Suspense>
              
              {/* <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
                    onClick={() => setCurrentImageIndex(index)}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div> */}
            </div>
            
            <div className="flex gap-2">
              {product.images.map((img, index) => (
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
                <p className="text-sm text-gray-600">{product.description}</p>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <RatingStars rating={product.rating} />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                  </div>
                  
                  <p className="text-sm">
                    <span className={`font-medium ${
                      product.stockStatus === "In Stock" 
                        ? "text-green-600" 
                        : product.stockStatus === "Limited Stock" 
                          ? "text-orange-500" 
                          : "text-red-500"
                    }`}>
                      {product.stockStatus}
                    </span>
                    {product.stockStatus === "In Stock" && (
                      <span className="text-gray-500"> - {product.stockQuantity} available</span>
                    )}
                  </p>
                </div>
                
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-1">Color</p>
                    <ColorPicker 
                      colors={product.colors} 
                      selectedColor={selectedColor} 
                      onSelectColor={setSelectedColor} 
                    />
                  </div>
                )}
                
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-1">Size</p>
                    <SizeSelector 
                      sizes={product.sizes} 
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
                    maxQuantity={product.stockQuantity || 10}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="features" className="space-y-4">
                <ul className="space-y-2">
                  {product.features && product.features.map((feature, index) => (
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
                  <p className="text-sm">{product.shipping || "Free shipping on orders over ₹999"}</p>
                </div>
                
                <div className="rounded-md bg-green-50 p-3 text-green-800">
                  <p className="font-medium">Returns & Exchanges</p>
                  <p className="text-sm">{product.returns || "30-day easy returns and exchanges"}</p>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="pt-2 border-t">
              <p className="text-3xl font-bold">₹{product.price.toFixed(2)}</p>
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
      </DialogContent>
    </Dialog>
  );
};

export default Product;