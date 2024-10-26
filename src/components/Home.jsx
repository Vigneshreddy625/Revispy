import React, { Suspense } from 'react';
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

const LazyImage = React.lazy(() => import('./LazyImage'));

const Home = () => {
  const featuredProducts = [
    { id: 1, name: "Headphones", price: "$129.99", discount: "20% OFF", image: "https://media.croma.com/image/upload/v1723054217/Croma%20Assets/Communication/Headphones%20and%20Earphones/Images/227824_0_fcnxfv.png" },
    { id: 2, name: "Smart Watch", price: "$199.99", discount: "15% OFF", image: "https://www.jiomart.com/images/product/original/rvhjzhyxio/clubclassy-t500-smart-watch-full-screen-waterproof-touch-display-bluetooth-calling-fitpro-t500-smart-watches-fitness-tracker-compatible-with-all-android-amp-ios-black-product-images-orvhjzhyxio-p606648963-3-202312101651.jpg?im=Resize=(420,420)" },
    { id: 3, name: "Running Shoes", price: "$89.99", discount: "25% OFF", image: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/12b4c855-4419-4764-9178-bbbe5a64e6a1/NIKE+ZOOMX+INVINCIBLE+RN+3+OLY.png" },
    { id: 4, name: "Coffee Maker", price: "$79.99", discount: "30% OFF", image: "https://images-cdn.ubuy.co.in/653fc5a70fdd3b03d3619ee4-mainstays-black-5-cup-drip-coffee-maker.jpg" },
  ];

  const categories = [
    { name: "Electronics", image: "https://c8.alamy.com/comp/HKPR1N/consumer-and-home-electronicstvfridgevacuum-cleanermicrowavewasher-HKPR1N.jpg" },
    { name: "Fashion", image: "https://thebureaufashionweek.com/wp-content/uploads/sites/11/2021/08/What-to-wear-to-Fashion-Week-1200x675.jpg" },
    { name: "Home", image: "https://www.proiectari.md/wp-content/uploads/2023/12/model-casa.jpg" },
    { name: "Beauty", image: "https://cdn.logojoy.com/wp-content/uploads/20191023114758/AdobeStock_224061283-min.jpeg" },
  ];

  return (
    <main className="w-full min-h-screen">
      <section className="text-center py-20">
        <h1 className="text-4xl font-bold tracking-wide">Summer Collection 2024</h1>
        <p className="text-lg mt-4">Up to 50% off on selected items</p>
        <Button size="lg" className="mt-6 border transition">
          Shop Now
        </Button>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-semibold mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer hover:scale-105 transform transition"
            >
              <Suspense fallback={<div>Loading...</div>}>
                <LazyImage src={category.image} alt={category.name} className="w-full h-48 object-cover" />
              </Suspense>
              <div className="absolute inset-0 flex items-end p-4 backdrop-brightness-50">
                <h3 className="text-xl font-semibold">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">Featured Products</h2>
            <Button variant="outline" className="border transition">
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-2xl transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="relative">
                    <Suspense fallback={<div>Loading...</div>}>
                      <LazyImage src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
                    </Suspense>
                  </div>
                  <div className="p-3">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                      <span className="inline-flex items-center px-2 py-1 text-sm font-medium rounded-full">
                        {product.discount}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-xl font-semibold">{product.price}</p>
                      <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative overflow-hidden rounded-2xl shadow-lg p-8 md:p-12 border">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Deal of the Day</h2>
              <p className="text-lg mb-6">Get 40% off on selected items</p>
              <Button size="lg" className="border transition">
                Shop Now
              </Button>
            </div>
            <div className="w-full md:w-1/2 lg:w-2/5">
              <Suspense fallback={<div>Loading...</div>}>
                <LazyImage
                  src="https://www.cardexpert.in/wp-content/uploads/2022/08/Weekly-offers.gif"
                  alt="Deal of the Day"
                  className="w-full h-auto rounded-lg shadow"
                />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
