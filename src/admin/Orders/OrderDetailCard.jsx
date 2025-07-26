import React from 'react';
import { X, Mail, Phone, MessageCircle, RotateCcw, MapPin } from "lucide-react";

const OrderDetailCard = ({ order, onClose }) => {
  // Use passed order data or fallback to sample data
  const orderData = order || {
    id: "#390561",
    status: "Paid",
    date: "Jan 8, 13:52",
    customer: {
      name: "James Miller",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
    },
    items: [
      {
        name: "Ryobi ONE drill/driver",
        price: "$409.00",
        image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=60&h=60&fit=crop"
      },
      {
        name: "Socket Systems Electric",
        price: "$238.00",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=60&h=60&fit=crop"
      },
      {
        name: "DVB-T2 receiver bbk",
        price: "$139.00",
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=60&h=60&fit=crop"
      },
      {
        name: "Inforce oil-free compressor",
        price: "$135.00",
        image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=60&h=60&fit=crop"
      },
      {
        name: "TIG-200 welding inverter",
        price: "$699.00",
        image: "https://images.unsplash.com/photo-1609592043755-a50bb47d81e5?w=60&h=60&fit=crop"
      }
    ],
    total: "$1,620.00"
  };

  const address= {
      street: "1234 Main Street",
      city: "San Francisco",
      state: "CA",
      zipCode: "94102",
      country: "United States"
    }

  return (
    <div className="w-full h-full rounded-lg bg-white border-l border-gray-200 flex-shrink-0 flex flex-col shadow-lg overflow-hidden">
      <div className="px-4 py-4 flex items-center justify-between border-b border-gray-100 flex-shrink-0">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Order {orderData.id}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-xs font-medium">
              {orderData.status}
            </span>
            <span className="text-sm text-gray-500">{orderData.date}</span>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X size={20} className="text-gray-400" />
        </button>
      </div>

      <div className="px-4 py-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center mb-3 overflow-hidden">
            <img
              src={orderData.customer.avatar}
              alt={orderData.customer.name}
              className="w-full h-full object-cover"
              onError={(e) => { 
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="w-full h-full bg-yellow-400 flex items-center justify-center text-white font-semibold" style={{display: 'none'}}>
              JM
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-900">
            {orderData.customer.name}
          </h3>
          {/* <div className="flex gap-3">
            <button className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
              <Mail size={16} className="text-white" />
            </button>
            <button className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
              <Phone size={16} className="text-white" />
            </button>
            <button className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
              <MessageCircle size={16} className="text-white" />
            </button>
          </div> */}
        </div>
      </div>

      <div className="px-4 pb-4 flex-1 overflow-y-auto">
        <h4 className="text-sm font-medium text-gray-900 mb-4">Order items</h4>
        <div className="space-y-4">
          {orderData.items.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { 
                    e.target.src = "data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='48' height='48' fill='%23f3f4f6'/%3E%3Cpath d='M24 14a2 2 0 0 1 2 2v8h8a2 2 0 1 1 0 4h-8v8a2 2 0 1 1-4 0v-8h-8a2 2 0 1 1 0-4h8v-8a2 2 0 0 1 2-2z' fill='%236b7280'/%3E%3C/svg%3E";
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 leading-tight">
                  {item.name}
                </p>
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  {item.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {address && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
              <MapPin size={16} className="text-gray-600" />
              Delivery Address
            </h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-900 font-medium leading-relaxed">
                {address.street}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {address.city}, {address.state} {address.zipCode}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {address.country}
              </p>
            </div>
          </div>
        )}

        {/* Total */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-100 mt-6">
          <span className="text-lg font-medium text-gray-900">Total</span>
          <span className="text-lg font-bold text-gray-900">{orderData.total}</span>
        </div>
      </div>

      <div className="px-4 pb-4 flex gap-3 flex-shrink-0 border-t border-gray-100 pt-4">
        <button className="flex-1 bg-gray-900 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-gray-800 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Track
        </button>
        <button className="flex-1 bg-yellow-400 text-gray-900 py-3 rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-yellow-500 transition-colors">
          <RotateCcw size={16} />
          Refund
        </button>
      </div>
    </div>
  );
};

export default OrderDetailCard;