import React, { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  LogOut,
  LogIn,
  User,
  Heart,
  ShoppingBagIcon,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ToggleMode from "../Darkmode/ToggleMode";
import { useAuth } from "../../authContext/useAuth";
import logo from "../../assets/logo.png";
import logo2 from "../../assets/logo2.png";
import { useTheme } from "../Darkmode/Theme-provider";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import SearchDropdown from "../HeaderComps/SearchDropdown";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuth();
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
      navigate(`/searchresults?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  const navigationItems = [
    {
      label: "Categories",
      path: "/categories",
    },
    { label: "Sale", path: "/sale" },
    { label: "Deal Of Day", path: "/dod" },
    { label: "Trending", path: "/trending" },
  ];

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="sticky top-0 z-50 bg-background">
      <header className="border-b dark:border-gray-600">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16 px-4">
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
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </nav>
            </div>
            <div className="flex-grow max-w-3xl mx-8">
              {!isMobile && (
                <SearchDropdown onSelectProduct={handleProductSelect} />
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

              {!isMobile && (
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
              )}

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
                      onClick={() => navigate("/account/profile")}
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
    </div>
  );
};

export default Header;
