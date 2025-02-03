import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import {
  Home,
  ShoppingBag,
  Tag,
  BarChart2,
  Grid,
} from "lucide-react";
import { 
  FaHome,
  FaShoppingBag,
  FaTags,
  FaChartBar,
  FaThLarge 
} from "react-icons/fa";

function BottomBar() {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const msgCount = 5;

  const icons = [
    {
      id: "home-tooltip",
      icon: (
        <div className="relative">
          <Home className="w-6 h-6" />
        </div>
      ),
      activeIcon: (
        <div className="relative">
          <FaHome className="w-6 h-6" />
        </div>
      ),
      label: "Home",
      tooltip: "Home",
      path: "/home",
      matchPath: "home"
    },
    {
      id: "sale-tooltip",
      icon: (
        <div className="relative">
          <Tag className="w-6 h-6" />
        </div>
      ),
      activeIcon: (
        <div className="relative">
          <FaTags className="w-6 h-6" />
        </div>
      ),
      label: "Sale",
      tooltip: "Sale",
      path: "/sale",
      matchPath: "sale"
    },
    {
      id: "categories-tooltip",
      icon: (
        <div className="relative">
          <Grid className="w-6 h-6" />
        </div>
      ),
      activeIcon: (
        <div className="relative">
          <FaThLarge className="w-6 h-6" />
        </div>
      ),
      label: "Categories",
      tooltip: "Categories",
      path: "/categories",
      matchPath: "categories"
    },
    {
      id: "trending-tooltip",
      icon: (
        <div className="relative">
          <BarChart2 className="w-6 h-6" />
        </div>
      ),
      activeIcon: (
        <div className="relative">
          <FaChartBar className="w-6 h-6" />
        </div>
      ),
      label: "Trending",
      tooltip: "Trending",
      path: "/trending",
      matchPath: "trending"
    },
    {
      id: "cart-tooltip",
      icon: (
        <div className="relative">
          <ShoppingBag className="w-6 h-6" />
          {msgCount > 0 && (
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {msgCount}
            </span>
          )}
        </div>
      ),
      activeIcon: (
        <div className="relative">
          <FaShoppingBag className="w-6 h-6" />
          {msgCount > 0 && (
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {msgCount}
            </span>
          )}
        </div>
      ),
      label: "Bag",
      tooltip: "Shopping Bag",
      path: "/cart",
      matchPath: "cart"
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t dark:border-gray-700 shadow-md">
      <nav className="max-w-lg mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {icons.map(({ id, icon, activeIcon, label, tooltip, path, matchPath }) => {
            const isActive = currentPath.includes(matchPath);
            return (
              <Link 
                to={path} 
                key={id} 
                className="flex flex-col items-center min-w-[64px]"
              >
                <div
                  data-tooltip-id={id}
                  data-tooltip-content={tooltip}
                  className="flex flex-col items-center justify-center cursor-pointer"
                  aria-label={label}
                  role="button"
                >
                  <div className={`${
                    isActive ? "text-pink-500" : "text-gray-600 hover:text-gray-200"
                  }`}>
                    {isActive ? activeIcon : icon}
                  </div>
                  <span className={`text-xs mt-1 ${
                    isActive ? "text-pink-500" : "text-gray-600"
                  }`}>
                    {label}
                  </span>
                  <ReactTooltip
                    id={id}
                    place="top"
                    content={tooltip}
                    className="z-50"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default BottomBar;