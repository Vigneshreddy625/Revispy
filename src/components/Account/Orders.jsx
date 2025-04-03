import React, { useState } from "react";
import {
  Search,
  Filter,
  Package,
  ChevronRight,
  Calendar,
  Clock,
  ArrowDownUp,
  X,
  CheckCheck,
  Truck,
  ShoppingBag,
  RefreshCw,
} from "lucide-react";

const Orders = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");

  const orders = [
    {
      id: "ORD-12345",
      status: "Delivered",
      statusColor: "green",
      date: "Thu, 26 Dec",
      timestamp: "10:23 AM",
      img: "/api/placeholder/80/80",
      title: "iPhone 16 Pro Max",
      brand: "Apple",
      price: "$1,299.00",
      review: "Rate & Review",
      deliveryDetails: "Delivered by FedEx",
      trackingId: "FDX7834592",
      returnEligible: false,
    },
    {
      id: "ORD-12344",
      status: "Delivered",
      statusColor: "green",
      date: "Wed, 25 Dec",
      timestamp: "11:45 AM",
      img: "/api/placeholder/80/80",
      title: "Hair Dryer Professional",
      brand: "Phillips",
      price: "$89.99",
      review: "Thanks for your rating!",
      rating: 4,
      deliveryDetails: "Delivered by USPS",
      trackingId: "USP9823471",
      returnEligible: false,
    },
    {
      id: "ORD-12343",
      status: "In Transit",
      statusColor: "blue",
      date: "Tue, 24 Dec",
      timestamp: "09:30 AM",
      img: "/api/placeholder/80/80",
      title: "Wireless Headphones XM5",
      brand: "Sony",
      price: "$349.99",
      deliveryDetails: "On the way with DHL",
      trackingId: "DHL5678901",
      estimatedDelivery: "Dec 27",
      returnEligible: false,
    },
    {
      id: "ORD-12342",
      status: "Processing",
      statusColor: "yellow",
      date: "Mon, 23 Dec",
      timestamp: "03:15 PM",
      img: "/api/placeholder/80/80",
      title: "Smart Watch Series 9",
      brand: "Samsung",
      price: "$299.99",
      deliveryDetails: "Preparing for shipment",
      estimatedShipping: "Dec 25",
      returnEligible: false,
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "delivered" && order.status === "Delivered") ||
      (activeTab === "transit" && order.status === "In Transit") ||
      (activeTab === "processing" && order.status === "Processing");

    const matchesSearch =
      searchQuery === "" ||
      order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === "oldest") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortBy === "price-high") {
      return (
        parseFloat(b.price.replace("$", "").replace(",", "")) -
        parseFloat(a.price.replace("$", "").replace(",", ""))
      );
    } else if (sortBy === "price-low") {
      return (
        parseFloat(a.price.replace("$", "").replace(",", "")) -
        parseFloat(b.price.replace("$", "").replace(",", ""))
      );
    }
    return 0;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <CheckCheck className="w-4 h-4 text-green-500" />;
      case "In Transit":
        return <Truck className="w-4 h-4 text-blue-500" />;
      case "Processing":
        return <ShoppingBag className="w-4 h-4 text-yellow-500" />;
      case "Cancelled":
        return <X className="w-4 h-4 text-red-500" />;
      case "Returned":
        return <RefreshCw className="w-4 h-4 text-purple-500" />;
      default:
        return <Package className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (color) => {
    switch (color) {
      case "green":
        return "text-green-600 bg-green-50";
      case "blue":
        return "text-blue-600 bg-blue-50";
      case "yellow":
        return "text-yellow-600 bg-yellow-50";
      case "red":
        return "text-red-600 bg-red-50";
      case "purple":
        return "text-purple-600 bg-purple-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="max-w-2xl px-4 text-xs">
      <div className="sticky top-0 bg-white dark:bg-black z-10 pb-2">
        <div className="flex justify-between items-center mb-3 border-b pb-2">
          <div>
            <h1 className="text-base font-bold">My Orders</h1>
            <p className="text-xs text-gray-500">
              {filteredOrders.length} orders from all time
            </p>
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <Search className="w-3 h-3 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search orders"
                className="pl-6 pr-3 py-1 border rounded-md bg-transparent focus:outline-none text-xs w-40"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <X className="w-3 h-3 text-gray-400" />
                </button>
              )}
            </div>
            <button
              className="flex items-center gap-1 px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-xs"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter className="w-3 h-3" />
              <span className="text-xs">Filter</span>
            </button>
          </div>
        </div>

        <div className="flex space-x-1 mb-3 overflow-x-auto pb-1 no-scrollbar">
          <button
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
              activeTab === "all"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 dark:bg-gray-300 text-gray-800"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All Orders
          </button>
          <button
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
              activeTab === "processing"
                ? "bg-yellow-500 text-white"
                : "bg-gray-100 dark:bg-gray-300 text-gray-800"
            }`}
            onClick={() => setActiveTab("processing")}
          >
            Processing
          </button>
          <button
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
              activeTab === "transit"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 dark:bg-gray-300 text-gray-800"
            }`}
            onClick={() => setActiveTab("transit")}
          >
            In Transit
          </button>
          <button
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
              activeTab === "delivered"
                ? "bg-green-500 text-white"
                : "bg-gray-100 dark:bg-gray-300 text-gray-800"
            }`}
            onClick={() => setActiveTab("delivered")}
          >
            Delivered
          </button>
        </div>

        {filterOpen && (
          <div className="mb-3 p-3 border rounded-lg ">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Sort & Filter</h3>
              <button onClick={() => setFilterOpen(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-500 mb-1">Sort by:</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    className={`px-3 py-1 rounded-full text-xs ${
                      sortBy === "recent"
                        ? "bg-gray-800 dark:bg-gray-700 text-white"
                        : "bg-white dark:bg-gray-600 border"
                    }`}
                    onClick={() => setSortBy("recent")}
                  >
                    Most Recent
                  </button>
                  <button
                    className={`px-3 py-1 rounded-full text-xs ${
                      sortBy === "oldest"
                        ? "bg-gray-800 dark:bg-gray-700 text-white"
                        : "bg-white dark:bg-gray-600 "
                    }`}
                    onClick={() => setSortBy("oldest")}
                  >
                    Oldest First
                  </button>
                  <button
                    className={`px-3 py-1 rounded-full text-xs ${
                      sortBy === "price-high"
                        ? "bg-gray-800 dark:bg-gray-700 text-white"
                        : "bg-white dark:bg-gray-600 border"
                    }`}
                    onClick={() => setSortBy("price-high")}
                  >
                    Price: High to Low
                  </button>
                  <button
                    className={`px-3 py-1 rounded-full text-xs ${
                      sortBy === "price-low"
                        ? "bg-gray-800 dark:bg-gray-700 text-white"
                        : "bg-white dark:bg-gray-600 border"
                    }`}
                    onClick={() => setSortBy("price-low")}
                  >
                    Price: Low to High
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {sortedOrders.length > 0 ? (
          sortedOrders.map((order, idx) => (
            <div
              key={idx}
              className="border rounded-lg shadow-sm p-3 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon(order.status)}
                  <span
                    className={`${getStatusColor(
                      order.statusColor
                    )} px-2 py-0.5 rounded-full text-xs font-medium`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-700 font-medium">
                    {order.id}
                  </span>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <Calendar className="w-3 h-3" />
                    <span>{order.date}</span>
                    <Clock className="w-3 h-3 ml-1" />
                    <span>{order.timestamp}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border rounded-md p-2 ">
                <div className="flex items-center gap-3">
                  <img
                    src={order.img}
                    alt={order.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium text-xs">{order.title}</p>
                    <p className="text-xs text-gray-500">
                      Brand: {order.brand}
                    </p>
                    <p className="text-xs font-semibold mt-1">{order.price}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>

              <div className="mt-2 p-2 rounded-md">
                <p className="text-xs text-gray-700">{order.deliveryDetails}</p>
                {order.trackingId && (
                  <p className="text-xs text-gray-500">
                    Tracking: {order.trackingId}
                  </p>
                )}
                {order.estimatedDelivery && (
                  <p className="text-xs text-green-600">
                    Estimated delivery: {order.estimatedDelivery}
                  </p>
                )}
                {order.estimatedShipping && (
                  <p className="text-xs text-blue-600">
                    Estimated shipping: {order.estimatedShipping}
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center mt-3 pt-2 border-t">
                <div>
                  {order.status === "Delivered" && (
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < (order.rating || 0)
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  {order.status === "Delivered" && (
                    <button className="text-blue-600 text-xs font-medium">
                      {order.review === "Rate & Review"
                        ? "Rate & Review"
                        : "Edit Review"}
                    </button>
                  )}
                  <button className="text-blue-600 text-xs font-medium">
                    {order.status === "In Transit"
                      ? "Track Order"
                      : "View Details"}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <Package className="w-10 h-10 mx-auto text-gray-400 mb-2" />
            <p className="font-medium">No orders found</p>
            <p className="text-gray-500 mt-1">
              Try adjusting your filters or search
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
