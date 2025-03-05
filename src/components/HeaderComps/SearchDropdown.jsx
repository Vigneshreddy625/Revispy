import React, { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react"; 
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import productData from "../utils/data";

const SearchDropdown = ({ onSelectProduct }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return [];

    return productData.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleSearch = (term) => {
    const searchTermToUse = term?.trim() || searchTerm.trim();

    if (searchTermToUse) {
      navigate(`/searchresults?q=${encodeURIComponent(searchTermToUse)}`);
      setIsDropdownOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (
        filteredProducts.length === 0 ||
        !filteredProducts.some(
          (p) => p.title.toLowerCase() === searchTerm.toLowerCase()
        )
      ) {
        handleSearch();
      }
    }
  };

  return (
    <div 
      ref={dropdownRef} 
      className="w-full relative" 
      onKeyDown={handleKeyDown}
    >
      <Command>
        <div className="relative">
          <Search 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
            size={20} 
          />
          <input
            type="text"
            placeholder="Search products by name or category..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsDropdownOpen(e.target.value.length > 0);
            }}
            onFocus={() => {
              if (searchTerm.length > 0) {
                setIsDropdownOpen(true);
              }
            }}
            className="w-full p-2 pl-10 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none bg-transparent transition"
          />
        </div>
        {isDropdownOpen && searchTerm && (
          <CommandList className="absolute top-12 w-full max-h-[450px] overflow-y-auto z-[100] bg-white dark:bg-black border dark:border-gray-600 rounded-lg shadow-lg m-scrollbar">
            {filteredProducts.length > 0 ? (
              <CommandGroup>
                {filteredProducts.map((product) => (
                  <CommandItem
                    key={product.id}
                    value={product.title}
                    onSelect={() => {
                      onSelectProduct?.(product);
                      handleSearch(product.title);
                    }}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div>
                        <div className="font-medium">{product.title}</div>
                        <div className="text-sm text-gray-500">
                          {product.category}
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary">
                    ₹{product.price.toFixed(2)}
                    </Badge>
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : (
              <CommandEmpty>No products found</CommandEmpty>
            )}
          </CommandList>
        )}
      </Command>
    </div>
  );
};

export default SearchDropdown;