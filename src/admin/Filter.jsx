import React, {useState} from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import ProductFormModal from "./AddProductModal";
import { tr } from "@faker-js/faker";

const FilterBar = ({ isOrdersPage, isProductsPage }) => {

  const [productFormModal, setProductFormModal] = useState(false);
  const selectStyle =
    "w-full bg-white text-black border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500";

  return (
    <>
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 w-full">
        <input
          type="text"
          placeholder={isOrdersPage ? "Search orders..." : "Search products..."}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-black focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />

        {isOrdersPage && (
          <>
            <Select>
              <SelectTrigger className={selectStyle}>
                <SelectValue placeholder="status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className={selectStyle}>
                <SelectValue placeholder="amount range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">amount range</SelectItem>
                <SelectItem value="0-99">$0–$99</SelectItem>
                <SelectItem value="100-1500">$100–$1500</SelectItem>
                <SelectItem value="1501+">$1501+</SelectItem>
              </SelectContent>
            </Select>
          </>
        )}

        {/* Products Page Filters */}
        {isProductsPage && (
          <>
            <Select>
              <SelectTrigger className={selectStyle}>
                <SelectValue placeholder="category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">category</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="apparel">Apparel</SelectItem>
                <SelectItem value="home-goods">Home Goods</SelectItem>
                <SelectItem value="books">Books</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className={selectStyle}>
                <SelectValue placeholder="stock status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">stock status</SelectItem>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className={selectStyle}>
                <SelectValue placeholder="price range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">price range</SelectItem>
                <SelectItem value="0-50">$0–$50</SelectItem>
                <SelectItem value="51-200">$51–$200</SelectItem>
                <SelectItem value="201+">$201+</SelectItem>
              </SelectContent>
            </Select>
          </>
        )}
      </div>

      <div className="flex flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
        {isProductsPage && (
          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-black text-sm hover:shadow-sm transition min-w-[140px]" onClick={() => setProductFormModal(true)}>
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        )}

        {/* Sort Select */}
        <Select>
          <SelectTrigger className={`${selectStyle} min-w-[150px]`}>
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            {isOrdersPage && (
              <>
                <SelectItem value="date">Sort by Date</SelectItem>
                <SelectItem value="amount">Sort by Amount</SelectItem>
              </>
            )}
            {isProductsPage && (
              <>
                <SelectItem value="date">Sort by Date</SelectItem>
                <SelectItem value="name">Sort by Name</SelectItem>
                <SelectItem value="price">Sort by Price</SelectItem>
              </>
            )}
            {!isOrdersPage && !isProductsPage && (
              <SelectItem value="any">Sort by...</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
    <ProductFormModal isOpen={productFormModal} onClose={() => setProductFormModal(!productFormModal)}/>
    </>
  );
};

export default FilterBar;
