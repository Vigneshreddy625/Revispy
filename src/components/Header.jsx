import React, { useState } from "react";
import { Search, ShoppingCart, LogOutIcon, LogInIcon, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ToggleMode from "./Darkmode/ToggleMode";
import { useAuth } from "../authContext/useAuth";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="w-full">
      <div className="px-4 py-2">
        <div className="hidden md:flex justify-end space-x-4 mr-8 text-xs">
          <a href="#" className="hover:text-gray-600">Help</a>
          <a href="#" className="hover:text-gray-600">Orders & Returns</a>
          <a href="#" className="hover:text-gray-600">Hi, John</a>
        </div>
        <div className="mx-4 flex items-center justify-between">
          <div className="text-xl font-bold cursor-pointer" onClick={() => navigate("/home")}>ECOMMERCE</div>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="flex space-x-6">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/categories" className="text-sm hover:text-gray-600">Categories</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/sale" className="text-sm hover:text-gray-600">Sale</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/clearance" className="text-sm hover:text-gray-600">Clearance</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/newstock" className="text-sm hover:text-gray-600">New Stock</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/trending" className="text-sm hover:text-gray-600">Trending</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center ml-2 space-x-2 md:space-x-4">
            <ToggleMode />
            <div className="hidden md:flex items-center">
              <Search className="w-4 h-4" />
            </div>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="w-4 h-4" />
            </Button>
            {isAuthenticated ? (
              <button
                className="flex items-center py-2 hover:bg-accent rounded-md transition-colors duration-200 cursor-pointer"
                onClick={handleLogout}
              >
                <LogOutIcon className="w-5 h-5 mr-3" />
              </button>
            ) : (
              <button
                className="flex items-center py-2 hover:bg-accent rounded-md transition-colors duration-200 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                <LogInIcon className="w-5 h-5 mr-3" />
              </button>
            )}
            <button onClick={toggleMobileMenu} className="md:hidden p-2 focus:outline-none">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden px-4 py-4 space-y-4">
            <Link to="/categories" onClick={toggleMobileMenu} className="block text-sm hover:text-gray-600">Categories</Link>
            <Link to="/sale" onClick={toggleMobileMenu} className="block text-sm hover:text-gray-600">Sale</Link>
            <Link to="/clearance" onClick={toggleMobileMenu} className="block text-sm hover:text-gray-600">Clearance</Link>
            <Link to="/newstock" onClick={toggleMobileMenu} className="block text-sm hover:text-gray-600">New Stock</Link>
            <Link to="/trending" onClick={toggleMobileMenu} className="block text-sm hover:text-gray-600">Trending</Link>
          </div>
        )}
      </div>
      <div className="bg-gray-100 dark:bg-gray-700 py-2 px-4 flex items-center justify-center space-x-2">
        <button className="p-1">&lt;</button>
        <span className="text-sm">Get 10% off on business sign up</span>
        <button className="p-1">&gt;</button>
      </div>
    </div>
  );
};

export default Header;
