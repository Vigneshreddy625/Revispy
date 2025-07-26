import React, { useState, useEffect } from "react";
import ProductFormModal from "./UpdateProductsModal";
import {
  ChevronLeft,
  ChevronRight,
  Edit,
} from "lucide-react";

const AdminProductsList = () => {
  const [isOpen, setisOpen] = useState(false);

  const handleModalOpen = () => {
    setisOpen(!isOpen);
  };

  const products = [
    {
      id: 1,
      name: "Casual Sunglass",
      category: "Sunglass",
      stock: 124,
      stockStatus: "Low Stock",
      price: 47,
      originalPrice: 60, // Added originalPrice for discount
      image: "🕶️",
    },
    {
      id: 2,
      name: "T-Shirt",
      category: "Clothes",
      stock: 124,
      stockStatus: "normal",
      price: 47,
      originalPrice: 55, // Added originalPrice for discount
      image: "👕",
    },
    {
      id: 3,
      name: "Green Tea",
      category: "Beauty",
      stock: 0,
      stockStatus: "Out of Stock",
      price: 47,
      originalPrice: 50, // Added originalPrice for discount
      image: "🍵",
    },
    {
      id: 4,
      name: "Denim Shirt",
      category: "Clothes",
      stock: 124,
      stockStatus: "Low Stock",
      price: 47,
      originalPrice: 70, // Added originalPrice for discount
      image: "👔",
    },
    {
      id: 5,
      name: "Casual Jacket",
      category: "Clothes",
      stock: 0,
      stockStatus: "Out of Stock",
      price: 47,
      originalPrice: 80, // Added originalPrice for discount
      image: "🧥",
    },
    {
      id: 6,
      name: "Cap",
      category: "Cap",
      stock: 124,
      stockStatus: "normal",
      price: 47,
      originalPrice: 50, // Added originalPrice for discount
      image: "🧢",
    },
    {
      id: 7,
      name: "Nike Cats",
      category: "Shoes",
      stock: 124,
      stockStatus: "normal",
      price: 47,
      originalPrice: 65, // Added originalPrice for discount
      image: "👟",
    },
    {
      id: 8,
      name: "Cooling Fan",
      category: "Electronic",
      stock: 124,
      stockStatus: "Low Stock",
      price: 47,
      originalPrice: 55, // Added originalPrice for discount
      image: "🌀",
    },
    {
      id: 9,
      name: "Man Watch",
      category: "Watch",
      stock: 124,
      stockStatus: "Low Stock",
      price: 47,
      originalPrice: 90, 
      image: "⌚",
    },
  ];

  const calculateDiscount = (price, originalPrice) => {
    if (!originalPrice || originalPrice === 0) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  const getStockColor = (stockStatus) => {
    switch (stockStatus) {
      case "Low Stock":
        return "text-yellow-600";
      case "Out of Stock":
        return "text-red-600";
      default:
        return "text-gray-900";
    }
  };

  return (
    <>
      <div className="px-4 text-gray-800">
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2 font-medium text-gray-600">
                  Product
                </th>
                <th className="text-center sm:text-left sm:pl-12 py-2 font-medium text-gray-600">
                  Name
                </th>
                <th className="text-left px-4 py-2 font-medium text-gray-600">
                  Category
                </th>
                <th className="text-left px-4 py-2 font-medium text-gray-600">
                  Stock
                </th>
                <th className="text-left px-4 py-2 font-medium text-gray-600">
                  Price
                </th>
                <th className="text-left px-4 py-2 font-medium text-gray-600">
                  Discount
                </th>
                <th className="text-left px-4 py-2 font-medium text-gray-600">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg mr-3">
                        {product.image}
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={getStockColor(product.stockStatus)}>
                      {product.stockStatus === "Out of Stock"
                        ? "Out of Stock"
                        : product.stock}
                      {product.stockStatus === "Low Stock" && (
                        <span className="ml-1 text-yellow-600">Low Stock</span>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {calculateDiscount(product.price, product.originalPrice)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      onClick={handleModalOpen}
                    >
                      <Edit size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 py-4 border-gray-200 text-sm">
        <div className="text-gray-700">
          Result 1-10 of 45
          <select className="ml-2 border border-gray-300 rounded px-2 py-1 text-sm">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center px-3 py-1 text-gray-600 hover:text-gray-900 border rounded">
            <ChevronLeft className="w-4 h-4 mr-1" /> Prev
          </button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded">
            1
          </button>
          <button className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded">
            2
          </button>
          <button className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded">
            3
          </button>
          <span className="px-2 text-gray-500">...</span>
          <button className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded">
            12
          </button>
          <button className="flex items-center px-3 py-1 text-gray-600 hover:text-gray-900 border rounded">
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
      {isOpen && (
        <ProductFormModal
          isOpen={isOpen}
          onClose={handleModalOpen}
          product={products[0]}
          onSubmit={(formData) => {
            console.log("Form submitted:", formData);
            handleModalOpen();
          }}
        />
      )}
    </>
  );
};

export default AdminProductsList;
