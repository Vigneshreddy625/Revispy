import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Filter } from "lucide-react";
import { Button } from "../ui/button";

const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "https://i.pinimg.com/736x/51/d3/88/51d38806d50482762c700eca5717a32f.jpg",
    featured: true,
    description: "Latest gadgets and tech accessories",
    productCount: 1243
  },
  {
    id: 2,
    name: "Clothing",
    image: "https://assets.vogue.com/photos/61e9c43c8aa98afba69ec2e8/master/w_2560%2Cc_limit/00_story.jpg",
    featured: true,
    description: "Trendy clothing and accessories",
    productCount: 2356
  },
  {
    id: 3,
    name: "Home & Furniture",
    image: "https://media.istockphoto.com/id/943910360/photo/posters-in-cozy-apartment-interior.jpg?s=612x612&w=0&k=20&c=QzNjsxCNMcFNxpn4E2ocPvSU8Ud2S3B_mHyo5L-HOLo=",
    featured: true,
    description: "Modern living essentials",
    productCount: 856
  },
  {
    id: 4,
    name: "Beauty & Health",
    image: "https://img.freepik.com/premium-vector/beauty-health-illustration-with-natural-cosmetics-eco-products-skin-treatment-face_2175-13450.jpg",
    featured: true,
    description: "Self-care and wellness products",
    productCount: 1124
  },
  { 
    id: 5, 
    name: "Sports", 
    image: "https://media.istockphoto.com/id/1188462138/photo/variety-of-sport-accessories-on-wooden-surface.jpg?s=612x612&w=0&k=20&c=y2l7DYNkxbVteZy-Kx_adCzm-soTRbiEypje4j8ENe0=", 
    featured: true,
    description: "Equipment for all activities",
    productCount: 785
  },
  { 
    id: 6, 
    name: "Toys", 
    image: "https://dailysale.com/cdn/shop/collections/toys-games-879935.jpg?v=1737087607",
    description: "Fun for all ages",
    productCount: 643
  },
  { 
    id: 7, 
    name: "Footwear", 
    image: "https://rukminim2.flixcart.com/image/850/1000/k687wy80/slipper-flip-flop/m/p/v/3022711-8-under-armour-white-black-original-imafzpzua577cxvc.jpeg?q=90&crop=false",
    description: "Everyday footwear",
    productCount: 1856
  },
  { 
    id: 8, 
    name: "Books", 
    image: "https://st2.depositphotos.com/1105977/5461/i/450/depositphotos_54615585-stock-photo-old-books-on-wooden-table.jpg",
    description: "Bestsellers and classics",
    productCount: 1856
  },
  { 
    id: 9, 
    name: "Perfumes", 
    image: "https://www.fragrancex.com/blog/wp-content/uploads/2024/08/10-Most-Popular-Perfumes-for-Women.jpg",
    description: "Best perfunes for every occasion",
    productCount: 421
  },
];

const CategoryCard = ({ category, handleCategoryClick }) => {
  const navigate = useNavigate();
  handleCategoryClick = (categoryName) => {
    navigate(`/searchresults?q=${categoryName}`);  
  };
  return (
    <div className="relative cursor-pointer group overflow-hidden rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-all hover:shadow-md" onClick={() => handleCategoryClick(category.name)}>
      <div className="relative h-48 overflow-hidden">
        <img src={category.image || `/api/placeholder/400/320`} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4 transform group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-white text-lg font-semibold mb-1">{category.name}</h3>
        <p className="text-white text-sm opacity-90 mb-2">{category.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-white text-sm opacity-80">
            {category.productCount.toLocaleString()} products
          </span>
          <Button variant="outline" size="sm" className="bg-white/20 text-white border-white/40 backdrop-blur-sm" onClick={() => handleCategoryClick(category.name)}>
            Explore <ChevronRight size={14} className="ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const Categories = ({ handleCategoryClick }) => {
  return (
    <div className="">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} handleCategoryClick={handleCategoryClick} />
        ))}
      </div>
    </div>
  );
};

const FloatingFilterButton = ({ showFilters, setShowFilters, totalFilterCount }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 lg:hidden">
      <Button size="lg" className="rounded-full shadow-lg" onClick={() => setShowFilters(!showFilters)}>
        <Filter size={20} className="mr-2" />
        Filters {totalFilterCount > 0 && `(${totalFilterCount})`}
      </Button>
    </div>
  );
};

const MainComponent = () => {
  const [showFilters, setShowFilters] = useState(false);

  const handleCategoryClick = (categoryName) => {
    console.log("Category clicked:", categoryName);
  };

  return (
    <div className="min-h-screen w-full py-12">
      <main className="px-4 py-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Shop by Category</h1>
        </div>
        <Categories handleCategoryClick={handleCategoryClick} />
      </main>
      <FloatingFilterButton showFilters={showFilters} setShowFilters={setShowFilters} totalFilterCount={0} />
    </div>
  );
};

export default MainComponent;
