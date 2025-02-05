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
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  const handleMobileSearch = () => {
    setIsMobileSearchOpen(true);
    navigate("/search");
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
    <header className="w-full border-b dark:border-gray-600 shadow-md">
      <div className="container mx-auto p-2">
        <div className="flex items-center justify-between gap-4">
          <Link to="/home">
            {isDarkMode ? (
              <img
                src={logo2}
                alt="logo"
                className="w-14 h-12"
                loading="lazy"
              />
            ) : (
              <img src={logo} alt="logo" className="w-14 h-12" loading="lazy" />
            )}
          </Link>

          <NavigationMenu className="hidden lg:flex lg:ml-20">
            <NavigationMenuList>
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.path}>
                  {item.subItems ? (
                    <>
                      <NavigationMenuTrigger>
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-48">
                          {item.subItems.map((subItem) => (
                            <li key={subItem.path}>
                              <NavigationMenuLink asChild>
                                <Link
                                  to={subItem.path}
                                  className="block px-4 py-2 hover:bg-accent hover:text-accent-foreground"
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
                      className={`px-3 py-2 text-sm ${
                        location.pathname === item.path
                          ? "text-primary font-semibold"
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

          <div className="flex items-center gap-2">
            <ToggleMode />

            {!isMobile ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
                className="flex"
              >
                <Search className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleMobileSearch()}
                aria-label="Search"
                className="flex"
              >
                <Search className="h-4 w-4" />
              </Button>
            )}

            <Link to="/wishlist">
              <Button
                variant="ghost"
                size="icon"
                aria-label="wishlist"
                className="flex"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </Link>

            {!isMobile && (
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-4 w-4" />
                  {cartCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs"
                    >
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            )}

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/orders")}>
                    Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/account")}>
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/wishlist")}>
                    Wishlist
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
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
                aria-label="Login"
              >
                <LogIn className="h-4 w-4" />
              </Button>
            )}

            {/* <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button> */}
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-4 border-t pt-4">
            <ul className="space-y-4">
              {navigationItems.map((item) => (
                <li key={item.path}>
                  {item.subItems ? (
                    <div className="space-y-2">
                      <p className="font-medium">{item.label}</p>
                      <ul className="ml-4 space-y-2">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.path}>
                            <Link
                              to={subItem.path}
                              className="text-sm hover:text-primary"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`text-sm ${
                        location.pathname === item.path
                          ? "text-primary font-semibold"
                          : "hover:text-primary"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Search Products</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">Search</Button>
          </form>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
