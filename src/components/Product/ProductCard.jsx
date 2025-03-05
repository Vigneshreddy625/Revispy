import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { Suspense } from "react";
import LazyImage from "../Items/LazyImage";

const ProductCard = ({ product, openModal, toggleWishlist, wishlist, handleAddToCart }) => {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 min-w-72">
      <CardContent className="p-0">
        <div className="relative overflow-hidden" onClick={() => openModal(product)}>
          <Suspense fallback={<div className="w-full h-64 bg-gray-200 animate-pulse" />}>
            <div className="w-full h-64 overflow-hidden">
              <LazyImage 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform cursor-pointer duration-500" 
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
        </div>
        <div className="relative p-4">
          <div className="absolute -right-12 bottom-16 group-hover:right-2 transition-all duration-300 flex flex-col gap-1">
            <button className='px-2 py-1' onClick={() => toggleWishlist(product.id)}>
              <Heart className="h-5 w-5" fill={wishlist.includes(product.id) ? "red" : "none"} color={wishlist.includes(product.id) ? "red" : "currentColor"} />
            </button>
            <button className='px-2 py-1' onClick={() => handleAddToCart(product)}>
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
          <div className="flex justify-between">
            <h3 className="text-sm font-medium mb-2 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors" onClick={() => openModal(product)}>
              {product.title}
            </h3>
            {product.isBestSeller && (
              <span className="mt-0.5 text-xs font-medium rounded">(BEST SELLER)</span>
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
            <Button size="sm" className="w-full" onClick={() => openModal(product)}>
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
