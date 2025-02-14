import React, { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  LogOut,
  LogIn,
  Menu,
  X,
  Bell,
  User,
  Heart,
  Car,
  ShoppingBagIcon,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ToggleMode from "./Darkmode/ToggleMode";
import { useAuth } from "../authContext/useAuth";
import logo from "../assets/logo.png";
import logo2 from "../assets/logo2.png";
import { useTheme } from "./Darkmode/Theme-provider";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "./ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsDarkMode(theme === "dark");
  }, [theme]);

  useEffect(() => {
    setCartCount(3);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  const navigationItems = [
    {
      label: "Categories",
      path: "/categories",
      subItems: [
        { label: "Electronics", path: "/categories/electronics" },
        { label: "Fashion", path: "/categories/clothing" },
        { label: "Beauty", path: "/categories/beauty" },
        { label: "Home", path: "/categories/home" },
      ],
    },
    { label: "Sale", path: "/sale" },
    { label: "Clearance", path: "/clearance" },
    { label: "New Stock", path: "/newstock" },
    { label: "Trending", path: "/trending" },
  ];

  return (
    <div className="sticky top-0 z-50 bg-background">
      <header className="border-b dark:border-gray-600">
        <div className="container mx-auto">
          <div className="flex items-center h-16 px-4">
            <div className="flex items-center gap-8">
              <Link to="/home" className="flex-shrink-0">
                <img
                  src={isDarkMode ? logo2 : logo}
                  alt="logo"
                  className="w-14 h-12 object-contain"
                  loading="lazy"
                />
              </Link>
              <nav className="hidden lg:flex items-center space-x-6">
                <NavigationMenu>
                  <NavigationMenuList className="gap-2">
                    {navigationItems.map((item) => (
                      <NavigationMenuItem key={item.path}>
                        {item.subItems ? (
                          <>
                            <NavigationMenuTrigger className="text-sm font-medium">
                              {item.label}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                              <ul className="grid w-48 p-2">
                                {item.subItems.map((subItem) => (
                                  <li key={subItem.path}>
                                    <NavigationMenuLink asChild>
                                      <Link
                                        to={subItem.path}
                                        className="block px-3 py-2 text-sm rounded hover:bg-accent hover:text-accent-foreground"
                                      >
                                        {subItem.label}
                                      </Link>
                                    </NavigationMenuLink>
                                  </li>
                                ))}
                              </ul>
                            </NavigationMenuContent>
                          </>
                        ) : (
                          <Link
                            to={item.path}
                            className={`text-sm font-medium px-3 py-2 rounded transition-colors ${
                              location.pathname === item.path
                                ? "text-primary"
                                : "hover:text-primary"
                            }`}
                          >
                            {item.label}
                          </Link>
                        )}
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </nav>
            </div>
            <div className="flex-grow max-w-xl mx-8">
              {!isMobile && (
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <Search className="h-5 w-5 text-gray-500" />
                  </button>
                </form>
              )}
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              {isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate("/search")}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Link to="/wishlist">
                  <Heart className="h-5 w-5" />
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Link to="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs"
                    >
                      {cartCount}
                    </Badge>
                  )}
                </Link>
              </Button>

              <ToggleMode />

              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5 text-sm font-medium">
                      My Account
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => navigate("/account")}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => navigate("/orders")}
                    >
                      <ShoppingBagIcon className="h-4 w-4 mr-2" />
                      Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => navigate("/wishlist")}
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Wishlist
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer text-red-500 hover:text-red-600"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate("/login")}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <LogIn className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
      {/* <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Search Products</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSearch} className="relative mt-2">
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10"
            />
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="absolute right-0 top-0 h-full"
            >
              <Search className="h-5 w-5" />
            </Button>
          </form>
        </DialogContent>
      </Dialog> */}
    </div>
  );
};

export default Header;