import React, { useState, useEffect } from "react";
import {
  BarChart3,
  Package,
  CreditCard,
  Users,
  FileText,
  TrendingUp,
  Bell,
  HelpCircle,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Mail,
  Search,
  Filter,
  Calendar,
  User,
  Phone,
  MessageCircle,
  MapPin,
  X,
} from "lucide-react";

// Dummy Data for Orders (remains the same)
const dummyOrders = [
  {
    id: "#390561",
    customer: { name: "Michelle Black", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face" },
    status: "Paid",
    total: "$780.00",
    date: "Jan 8",
    items: [
      { name: "Ryobi ONE drill/driver", price: "$409.00", image: "https://placehold.co/60x60/e0e0e0/333333?text=Drill" },
      { name: "Socket Systeme Electric", price: "$238.00", image: "https://placehold.co/60x60/e0e0e0/333333?text=Socket" },
    ],
  },
  {
    id: "#663334",
    customer: { name: "Janice Chandler", avatar: "https://images.unsplash.com/photo-1529626465618-a89c5432098d?w=32&h=32&fit=crop&crop=face" },
    status: "Delivered",
    total: "$1,250.00",
    date: "Jan 6",
    items: [
      { name: "Inforce oil-free compressor", price: "$135.00", image: "https://placehold.co/60x60/e0e0e0/333333?text=Compressor" },
      { name: "TIG-200 welding inverter", price: "$699.00", image: "https://placehold.co/60x60/e0e0e0/333333?text=Welder" },
    ],
  },
  {
    id: "#418135",
    customer: { name: "Mildred Hall", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=32&h=32&fit=crop&crop=face" },
    status: "Paid",
    total: "$540.95",
    date: "Jan 5",
    items: [
      { name: "DVBT2 receiver bbk", price: "$139.00", image: "https://placehold.co/60x60/e0e0e0/333333?text=Receiver" },
    ],
  },
  {
    id: "#801999",
    customer: { name: "Ana Carter", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face" },
    status: "Paid",
    total: "$1,489.00",
    date: "Jan 2",
    items: [
        { name: "Item A", price: "$500.00", image: "https://placehold.co/60x60/e0e0e0/333333?text=ItemA" },
        { name: "Item B", price: "$989.00", image: "https://placehold.co/60x60/e0e0e0/333333?text=ItemB" },
    ],
  },
  {
    id: "#517783",
    customer: { name: "John Sherman", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" },
    status: "Completed",
    total: "$925.00",
    date: "Dec 28",
    items: [
      { name: "Item C", price: "$925.00", image: "https://placehold.co/60x60/e0e0e0/333333?text=ItemC" },
    ],
  },
  {
    id: "#602992",
    customer: { name: "James Miller", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face" },
    status: "Paid",
    total: "$1,620.00",
    date: "Dec 26",
    items: [
      { name: "Ryobi ONE drill/driver", price: "$409.00", image: "https://placehold.co/60x60/e0e0e0/333333?text=Drill" },
      { name: "Socket Systeme Electric", price: "$238.00", image: "https://placehold.co/60x60/e0e0e0/333333?text=Socket" },
      { name: "DVBT2 receiver bbk", price: "$139.00", image: "https://placehold.co/60x60/e0e0e0/333333?text=Receiver" },
      { name: "Inforce oil-free compressor", price: "$135.00", image: "https://placehold.co/60x60/e0e0e0/333333?text=Compressor" },
      { name: "TIG-200 welding inverter", price: "$699.00", image: "https://placehold.co/60x60/e0e0e0/333333?text=Welder" },
    ],
  },
  {
    id: "#730345",
    customer: { name: "Travis French", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=32&h=32&fit=crop&crop=face" },
    status: "Paid",
    total: "$315.50",
    date: "Dec 22",
    items: [
      { name: "Item D", price: "$315.50", image: "https://placehold.co/60x60/e0e0e0/333333?text=ItemD" },
    ],
  },
  {
    id: "#126955",
    customer: { name: "Ralph Hall", avatar: "https://images.unsplash.com/photo-1539571696357-ec7cea9db51e?w=32&h=32&fit=crop&crop=face" },
    status: "Paid",
    total: "$1,267.45",
    date: "Dec 20",
    items: [
      { name: "Item E", price: "$1,267.45", image: "https://placehold.co/60x60/e0e0e0/333333?text=ItemE" },
    ],
  },
  {
    id: "#045321",
    customer: { name: "Gary Gilbert", avatar: "https://images.unsplash.com/photo-1547425260-76bc0fa66c24?w=32&h=32&fit=crop&crop=face" },
    status: "Completed",
    total: "$287.00",
    date: "Dec 18",
    items: [
      { name: "Item F", price: "$287.00", image: "https://placehold.co/60x60/e0e0e0/333333?text=ItemF" },
    ],
  },
  {
    id: "#082848",
    customer: { name: "Frances Howell", avatar: "https://images.unsplash.com/photo-1488426862944-ed844d180b54?w=32&h=32&fit=crop&crop=face" },
    status: "Delivered",
    total: "$1,740.00",
    date: "Dec 17",
    items: [
      { name: "Item G", price: "$1,740.00", image: "https://placehold.co/60x60/e0e0e0/333333?text=ItemG" },
    ],
  },
  {
    id: "#646072",
    customer: { name: "Herbert Boyd", avatar: "https://images.unsplash.com/photo-1557862921-37887e27926b?w=32&h=32&fit=crop&crop=face" },
    status: "Paid",
    total: "$714.00",
    date: "Dec 14",
    items: [
      { name: "Item H", price: "$714.00", image: "https://placehold.co/60x60/e0e0e0/333333?text=ItemH" },
    ],
  },
  {
    id: "#432019",
    customer: { name: "Alan White", avatar: "https://images.unsplash.com/photo-1519085360753-af0f389a2ace?w=32&h=32&fit=crop&crop=face" },
    status: "Paid",
    total: "$267.65",
    date: "Dec 13",
    items: [
      { name: "Item I", price: "$267.65", image: "https://placehold.co/60x60/e0e0e0/333333?text=ItemI" },
    ],
  },
  {
    id: "#985927",
    customer: { name: "Julie Martin", avatar: "https://images.unsplash.com/photo-1544723795-3fb6469e0441?w=32&h=32&fit=crop&crop=face" },
    status: "Delivered",
    total: "$389.00",
    date: "Dec 11",
    items: [
      { name: "Item J", price: "$389.00", image: "https://placehold.co/60x60/e0e0e0/333333?text=ItemJ" },
    ],
  },
];


const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Orders");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      } else {
        setSidebarCollapsed(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Effect to clear selectedOrder when selectedItem changes to something other than "Orders"
  useEffect(() => {
    if (selectedItem !== "Orders") {
      setSelectedOrder(null);
    }
  }, [selectedItem]); // Dependency array: run when selectedItem changes

  const sidebarItems = [
    { icon: BarChart3, name: "Dashboard", path: "/" },
    { icon: Package, name: "Orders", path: "/orders" },
    { icon: CreditCard, name: "Payments", path: "/payments" },
    { icon: Users, name: "Customers", path: "/customers" },
    { icon: FileText, name: "Reports", path: "/reports" },
    { icon: TrendingUp, name: "Statistic", path: "/statistic" },
    { icon: Bell, name: "Notification", path: "/notification" },
    { icon: HelpCircle, name: "Help", path: "/help" },
    { icon: Settings, name: "Settings", path: "/settings" },
  ];

  const getStatusClasses = (status) => {
    switch (status) {
      case "Paid":
        return "bg-yellow-100 text-yellow-800";
      case "Delivered":
        return "bg-orange-100 text-orange-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex h-screen bg-black font-sans">
      <div className="relative">
        <div
          className={`${
            sidebarCollapsed ? "w-16" : "w-64"
          } bg-black text-white transition-all duration-300 ease-in-out flex flex-col h-full`}
        >
          <div className="p-4 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <BarChart3 size={20} className="text-slate-800" />
              </div>
              {!sidebarCollapsed && (
                <span className="font-semibold text-lg">ProfitPulse</span>
              )}
            </div>
          </div>

          <nav className="flex-1 py-4 overflow-y-auto">
            {sidebarItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={() => setSelectedItem(item.name)} // This updates selectedItem
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-700 transition-colors ${
                    selectedItem === item.name
                      ? "bg-slate-700 border-r-2 border-blue-400"
                      : ""
                  } ${sidebarCollapsed ? "justify-center" : ""}`}
                >
                  <Icon size={20} />
                  {!sidebarCollapsed && (
                    <span className="text-sm">{item.name}</span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="border-t border-slate-700 p-4">
            <button className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-700 transition-colors rounded ${sidebarCollapsed ? "justify-center" : ""}`}>
              <LogOut size={20} />
              {!sidebarCollapsed && <span className="text-sm">Log out</span>}
            </button>
          </div>
        </div>

        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute top-12 -right-3 bg-white border border-gray-200 rounded-full p-1 shadow-lg hover:shadow-xl transition-shadow z-10 focus:outline-none"
        >
          {sidebarCollapsed ? (
            <ChevronRight size={16} className="text-gray-600" />
          ) : (
            <ChevronLeft size={16} className="text-gray-600" />
          )}
        </button>
      </div>

      <div className={`flex-1 flex flex-col overflow-hidden bg-gray-50 rounded-md ${selectedItem === "Orders" && selectedOrder ? "md:flex-row" : ""}`}>
        <div className={`flex flex-col ${selectedItem === "Orders" && selectedOrder ? "md:w-3/5" : "w-full"} transition-all duration-300 ease-in-out`}>
          <header className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-semibold text-gray-900">{selectedItem}</h1> {/* Dynamic header title */}
              </div>

              <div className="flex items-center gap-4">
                <div className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <Mail size={20} className="text-gray-600" />
                </div>
                <div className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <Search size={20} className="text-gray-600" />
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face"
                    alt="Kristina Evans"
                    className="w-8 h-8 rounded-full"
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/32x32/cccccc/333333?text=KE" }}
                  />
                  <div className="text-sm hidden sm:block">
                    <div className="font-medium text-gray-900">
                      Kristina Evans
                    </div>
                    <div className="text-gray-500 text-xs">
                      kris.evans@gmail.com
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters only show when selectedItem is "Orders" */}
            {selectedItem === "Orders" && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4">
                  <select className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm w-full sm:w-auto focus:ring-blue-500 focus:border-blue-500">
                    <option>Any status</option>
                    <option>Paid</option>
                    <option>Delivered</option>
                    <option>Completed</option>
                    <option>Pending</option>
                  </select>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm w-full sm:w-auto focus:ring-blue-500 focus:border-blue-500">
                    <option>$100—$1500</option>
                    <option>$0—$99</option>
                    <option>$1501+</option>
                  </select>
                  <div className="ml-auto w-full sm:w-auto flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Filter size={20} className="text-gray-600" />
                      </button>
                      <select className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm w-full sm:w-auto focus:ring-blue-500 focus:border-blue-500">
                        <option>Sort by Date</option>
                        <option>Sort by Amount</option>
                      </select>
                  </div>
              </div>
            )}
          </header>

          <main className="flex-1 p-6 overflow-y-auto">
            {selectedItem === "Orders" ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out rounded border-gray-300" />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dummyOrders.map((order, index) => (
                      <tr
                        key={order.id}
                        className={`hover:bg-gray-50 cursor-pointer ${selectedOrder && selectedOrder.id === order.id ? 'bg-blue-50' : ''}`}
                        onClick={() => setSelectedOrder(order)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-12">
                          <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out rounded border-gray-300" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            <img
                              src={order.customer.avatar}
                              alt={order.customer.name}
                              className="w-8 h-8 rounded-full mr-2"
                              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/32x32/cccccc/333333?text=CS" }}
                            />
                            {order.customer.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.total}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-500">
                          ...
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              // Content for other dashboard items (e.g., Dashboard, Payments, etc.)
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex items-center justify-center p-4">
                <div className="p-8 text-center max-w-sm">
                  <BarChart3 size={48} className="text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {selectedItem} Content Here
                  </h3>
                  <p className="text-gray-500">
                    This is a placeholder for the {selectedItem.toLowerCase()} section.
                  </p>
                </div>
              </div>
            )}
          </main>
        </div>

        {/* Order Detail Card (Right Sidebar) - Only show if selectedItem is "Orders" and an order is selected */}
        {selectedItem === "Orders" && selectedOrder && (
          <div className="w-full md:w-2/5 bg-white border-l border-gray-200 flex-shrink-0 flex flex-col shadow-lg overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Order {selectedOrder.id}
              </h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              {/* Customer Info */}
              <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <img
                  src={selectedOrder.customer.avatar}
                  alt={selectedOrder.customer.name}
                  className="w-16 h-16 rounded-full border-2 border-white shadow"
                  onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/64x64/cccccc/333333?text=CS" }}
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{selectedOrder.customer.name}</h3>
                  <div className="flex gap-2 mt-2">
                    <button className="p-2 bg-white rounded-full border border-gray-200 shadow-sm hover:bg-gray-100">
                      <Mail size={16} className="text-gray-600" />
                    </button>
                    <button className="p-2 bg-white rounded-full border border-gray-200 shadow-sm hover:bg-gray-100">
                      <Phone size={16} className="text-gray-600" />
                    </button>
                    <button className="p-2 bg-white rounded-full border border-gray-200 shadow-sm hover:bg-gray-100">
                      <MessageCircle size={16} className="text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <h3 className="text-md font-semibold text-gray-900 mb-3">Order items</h3>
              <div className="space-y-4">
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-gray-600 text-sm">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-lg font-bold text-gray-900">{selectedOrder.total}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6 border-t border-gray-200 flex gap-3 flex-shrink-0">
              <button className="flex-1 bg-gray-900 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
                <Package size={18} />
                <span>Track</span>
              </button>
              <button className="flex-1 bg-yellow-400 text-gray-900 py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-500 transition-colors">
                <CreditCard size={18} />
                <span>Refund</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;