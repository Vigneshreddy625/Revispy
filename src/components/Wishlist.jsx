import React, { Suspense } from 'react';

const LazyImage = React.lazy(() => Promise.resolve({
  default: ({ src, alt, className, isOutOfStock }) => (
    <img
      src={src}
      alt={alt}
      className={`${className} transition-opacity duration-300 ${
        isOutOfStock ? 'opacity-50 grayscale' : 'opacity-100'
      }`}
      loading="lazy"
    />
  )
}));

const ImagePlaceholder = () => (
  <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 animate-pulse" />
);

const Wishlist = () => {
  const wishlistItems = [
    {
      id: 1,
      name: 'Marshall Speaker...',
      price: 13499,
      originalPrice: 14999,
      discount: '10% OFF',
      image: 'https://www.jiomart.com/images/product/original/492166279/marshall-kilburn-2-bluetooth-speaker-with-up-to-20-hours-black-and-brass-digital-o492166279-p590798533-2-202109210524.jpeg?im=Resize=(420,420)',
      inStock: true
    },
    {
      id: 2,
      name: 'Iphone 16 pro max',
      price: 177900,
      originalPrice: 185900,
      discount: '4% OFF',
      image: 'https://www.imagineonline.store/cdn/shop/files/iPhone_16_Pro_Max_Desert_Titanium_PDP_Image_Position_1__en-IN_6313d2b8-ef64-40f0-b60a-d77be47fd058.jpg?v=1727250893',
      inStock: false
    },
    {
      id: 3,
      name: 'Macbook M3 pro',
      price: 328990,
      originalPrice: 350000,
      discount: '6% OFF',
      image: 'https://www.aptronixindia.com/media/catalog/product/m/b/mbp14-spacegray-select-202310.jpeg',
      inStock: true
    },
    {
      id: 4,
      name: 'Milton Thermosteel',
      price: 749,
      originalPrice: 999,
      discount: '25% OFF',
      image: 'https://gmartshopy.com/cdn/shop/files/5184xeIV7ML._SL1500.jpg?v=1720787756',
      inStock: true
    },
    {
      id: 5,
      name: 'Laundry Basket',
      price: 399,
      originalPrice: 499,
      discount: '20% OFF',
      image: 'https://www.kuberindustries.co.in/uploads/kuberindustries/products/kuber-industries-laundry-basket--plastic-cloth-storage-hamper--laundry-storage-basket-with-lid--laun-4204238787506750_l.jpg',
      inStock: true
    },
    {
        id: 6,
        name: 'MRF bat',
        price: 1999,
        originalPrice: 2499,
        discount: '25% OFF',
        image: 'https://crictoday.com/wp-content/uploads/2024/02/MRFF-2-19-1024x576.jpg',
        inStock: true
    },
    {
        id: 7,
        name: 'Hair Dryer',
        price: 1499,
        originalPrice: 1999,
        discount: '35% OFF',
        image: 'https://www.ikonicworld.com/cdn/shop/files/8904231004580_1.jpg?v=1737461929',
        inStock: true
    },
    {
        id: 7,
        name: 'Backpack',
        price: 4299,
        originalPrice: 2999,
        discount: '8% OFF',
        image: 'https://cdn.staticans.com/image/tr:e-sharpen-01,h-350,w-350,cm-pad_resize/data/AmericanTourister/20jan2025/LE2434601_1.jpg',
        inStock: false
    }
  ];

  const handleRemoveItem = (id) => {
    console.log('Removing item:', id);
  };

  const formatPrice = (price) => {
    return price.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="px-4 py-8">
      <div className="hidden md:flex items-center justify-between mb-8">
        <div className="flex w-full items-center justify-center md:justify-normal">
          <h1 className="text-xl font-medium">My Wishlist</h1>
          <span className="ml-2 text-gray-500 dark:text-gray-300">({wishlistItems.length} items)</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {wishlistItems.map((item) => (
          <div 
            key={item.id} 
            className="border dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="relative">
              <Suspense fallback={<ImagePlaceholder />}>
                <LazyImage
                  src={item.image}
                  alt={item.name}
                  className="w-full h-56 md:h-64 object-cover bg-transparent border-b dark:border-gray-600"
                  isOutOfStock={!item.inStock}
                />
              </Suspense>
              <button 
                onClick={() => handleRemoveItem(item.id)}
                className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Remove item"
              >
                <svg
                  className="w-4 h-4 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              {!item.inStock && (
                <div className="absolute bottom-0 left-0 right-0 bg-red-500 bg-opacity-80 text-white text-center py-1 text-sm font-medium">
                  OUT OF STOCK
                </div>
              )}
            </div>

            <div className="md:mt-4">
                <div className="px-4 py-2">
              <h3 className="text-sm text-center font-medium truncate">
                {item.name}
              </h3>
              <div className="mt-2 flex items-center justify-center">
                <span className="text-sm font-medium">Rs.{item.price}</span>
                {item.originalPrice > item.price && (
                  <>
                    <span className="hidden md:inline-block ml-2 text-sm text-gray-500 line-through">
                      Rs.{item.originalPrice}
                    </span>
                    <span className="hidden md:inline-block ml-2 text-sm text-red-500">
                      {item.discount}
                    </span>
                  </>
                )}
              </div>
            </div>
              <button
                className={`md:mt-4 py-2 w-full border-t dark:border-gray-600 text-sm font-medium
                  ${
                    item.inStock
                      ? 'text-pink-500 hover:bg-pink-20 0 dark:hover:bg-pink-300'
                      : 'text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900'
                  }`}
              >
                {item.inStock ? 'MOVE TO BAG' : 'SHOW SIMILAR'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;