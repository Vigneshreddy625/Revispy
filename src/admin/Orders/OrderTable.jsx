import React, { useState } from 'react';
import { Package, ChevronRight, Edit } from "lucide-react";
import EditOrderStatusModal from '../EditOrderStatusModal';

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

const OrderTable = ({ selectedOrder, setSelectedOrder }) => {
  const [editOrder, setEditOrder] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusClasses = (status) => {
    switch (status) {
      case "Paid":
        return "bg-blue-50 text-blue-700 border border-blue-200";
      case "Delivered":
        return "bg-orange-50 text-orange-700 border border-orange-200";
      case "Completed":
        return "bg-green-50 text-green-700 border border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  return (
    <>
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50/80">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Order</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Items</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {dummyOrders.map((order) => (
              <tr
              key={order.id}
              className={`hover:bg-gray-50 cursor-pointer ${
                selectedOrder && selectedOrder.id === order.id ? "bg-blue-50" : ""
              }`}
              onClick={() => setSelectedOrder(order)}
            >
                <td className="px-6 py-5 text-sm font-semibold text-gray-900">{order.id}</td>
                <td className="px-6 py-5 text-sm text-gray-900">
                  <div className="flex items-center">
                    <img
                      src={order.customer.avatar}
                      alt={order.customer.name}
                      className="w-10 h-10 rounded-full mr-3 border-2 border-gray-100 shadow-sm"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/40x40/cccccc/333333?text=CS";
                      }}
                    />
                    <div className="font-medium text-gray-900">{order.customer.name}</div>
                  </div>
                </td>
                <td className="px-6 py-5 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Package className="w-4 h-4 text-gray-400 mr-2" />
                    {order.items ? order.items.length : 0} items
                  </div>
                </td>
                <td className="px-6 py-5 text-sm">
                  <span className={`px-3 py-1.5 inline-flex text-xs font-semibold rounded-full ${getStatusClasses(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-sm font-bold text-gray-900">{order.total}</td>
                <td className="px-6 py-5 text-sm text-gray-500 font-medium">{order.date}</td>
                <td className="px-6 py-5 text-center">
                  <button onClick={(e) => {
                    e.stopPropagation();
                    setEditOrder(order);
                    setIsModalOpen(true);
                  }}><Edit className="w-5 h-5 text-gray-400 mx-auto hover:text-gray-600 transition-colors" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="lg:hidden">
        {dummyOrders.map((order, index) => (
          <div
            key={order.id}
            className={`border-b border-gray-100 hover:bg-gray-50/70 cursor-pointer transition-all duration-200 ${
              selectedOrder && selectedOrder.id === order.id ? "bg-blue-50/80 border-l-4 border-blue-500" : ""
            } ${index === dummyOrders.length - 1 ? 'border-b-0' : ''}`}
            onClick={() => setSelectedOrder(order)}
          >
            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-900 mb-1">{order.id}</span>
                  <div className="flex items-center">
                    <Package className="w-3.5 h-3.5 text-gray-400 mr-1.5" />
                    <span className="text-xs text-gray-500 font-medium">{order.items ? order.items.length : 0} items</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusClasses(order.status)}`}>
                    {order.status}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">{order.date}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={order.customer.avatar}
                    alt={order.customer.name}
                    className="w-12 h-12 rounded-full mr-3 border-2 border-gray-100 shadow-sm"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/48x48/cccccc/333333?text=CS";
                    }}
                  />
                  <div>
                    <div className="text-sm font-semibold text-gray-900 mb-0.5">{order.customer.name}</div>
                    <div className="text-xs text-gray-500 font-medium">Customer</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="text-right mr-3">
                    <div className="text-base font-bold text-gray-900 mb-0.5">{order.total}</div>
                    <div className="text-xs text-gray-500 font-medium">Total</div>
                  </div>
                  <button onClick={(e) => {
                    e.stopPropagation();
                    setEditOrder(order);
                    setIsModalOpen(true);
                  }}><Edit className="w-5 h-5 text-gray-400 mx-auto hover:text-gray-600 transition-colors" /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {dummyOrders.length === 0 && (
        <div className="p-12 text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
        </div>
      )}
    </div>
    <EditOrderStatusModal order={editOrder} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default OrderTable;