import React from "react";

const ProductList = ({
  product,
  openModal,
  toggleWishlist,
  wishlist,
  handleAddToCart,
}) => {
  return (
    <div className="border rounded-lg p-4 grid grid-cols-1 md:grid-cols-12 gap-4 hover:shadow-md transition-shadow ">
      <div className="relative md:col-span-3">
        <div className="aspect-square overflow-hidden rounded-md group">
          <img
            src={product.image || "/api/placeholder/200/200"}
            alt={product.title}
            className="w-full h-full object-cover rounded cursor-pointer group-hover:scale-105 transition-transform duration-300"
            onClick={() => openModal(product)}
          />
        </div>
        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-2 right-2 p-1.5 rounded-full shadow-md transition-colors"
          aria-label={
            wishlist.includes(product.id)
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={wishlist.includes(product.id) ? "red" : "none"}
            stroke={wishlist.includes(product.id) ? "red" : "currentColor"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
        {product.discount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-md">
            {product.discount}
          </span>
        )}
      </div>

      <div className="md:col-span-6 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap gap-1 mb-2">
            {product.isNew && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full font-medium">
                New
              </span>
            )}
            {product.isBestSeller && (
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full font-medium">
                Best Seller
              </span>
            )}
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full font-medium">
              {product.category}
            </span>
          </div>

          <h3
            className="font-semibold text-lg mb-1 cursor-pointer hover:text-blue-600 transition-colors"
            onClick={() => openModal(product)}
          >
            {product.title}
          </h3>

          <div className="flex items-center mb-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={
                    i < Math.floor(product.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                >
                  ★
                </span>
              ))}
            </div>
            <span className="ml-2 text-xs text-gray-600">
              ({product.reviews} reviews)
            </span>
          </div>

          <p className="text-gray-600 text-sm line-clamp-2 mb-2">
            {product.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center mt-2 text-sm text-gray-500">
          <span
            className={`mr-4 ${
              product.stockStatus === "In Stock"
                ? "text-green-600"
                : "text-orange-600"
            }`}
          >
            • {product.stockStatus}
          </span>
          <span className="mr-4">• {product.shipping}</span>
        </div>
      </div>

      <div className="md:col-span-3 flex flex-col justify-between border-t pt-4 md:border-t-0 md:pt-0 md:border-l md:pl-4">
        <div>
          <div className="flex items-baseline">
            <span className="font-bold text-xl text-gray-900 dark:text-gray-300">
              ${(product.price / 100).toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="ml-2 text-gray-500 line-through text-sm">
                ${(product.originalPrice / 100).toFixed(2)}
              </span>
            )}
            {product.originalPrice && (
              <span className="ml-2 text-green-600 text-sm font-medium">
                {Math.round((1 - product.price / product.originalPrice) * 100)}%
                off
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <button
            onClick={() => handleAddToCart(product)}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            Add to Cart
          </button>

          <button
            onClick={() => openModal(product)}
            className="border border-gray-300 py-2 px-4 rounded-lg transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
