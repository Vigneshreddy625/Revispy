import React from 'react';
import { Search, Filter, Package, ChevronRight } from 'lucide-react';

const Orders = () => {
  return (
    <div className="max-w-lg px-4 text-xs">
      <div className="flex justify-between items-center mb-2 border-b pb-2">
        <div>
          <h1 className="text-xs font-bold">All Orders</h1>
          <p className="text-[10px] text-gray-500">From Anytime</p>
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <Search className="w-3 h-3 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders"
              className="pl-6 pr-3 py-1 border rounded-md bg-transparent focus:outline-none text-[10px]"
            />
          </div>
          <button className="flex items-center gap-1 px-3 py-1 border rounded-md hover:bg-gray-100">
            <Filter className="w-3 h-3" />
            <span className='text-[10px]'>Filter</span>
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {[{
          status: 'Delivered',
          date: 'Thu, 26 Dec',
          img: 'https://www.imagineonline.store/cdn/shop/files/iPhone_16_Pro_Max_Desert_Titanium_PDP_Image_Position_1__en-IN_6313d2b8-ef64-40f0-b60a-d77be47fd058.jpg?v=1727250893',
          title: 'iPhone 16 Pro Max',
          Brand: 'Apple',
          review: 'Rate & Review'
        }, {
          status: 'Delivered',
          date: 'Wed, 25 Dec',
          img: 'https://www.ikonicworld.com/cdn/shop/files/8904231004580_1.jpg?v=1737461929',
          title: 'Hair Dryer',
          Brand: 'Phillips',
          review: 'Thanks for your rating!'
        }].map((order, idx) => (
          <div key={idx} className="border rounded-lg shadow-sm p-3 hover:shadow-md transition">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-4 h-4 text-green-500" />
              <span className="text-green-600 font-medium text-[12px]">{order.status}</span>
              <span className="text-[11px] text-gray-500">On {order.date}</span>
            </div>

            <div className="flex items-center justify-between border rounded-md p-2 bg-gray-200 dark:bg-transparent">
              <div className="flex items-center gap-2">
                <img src={order.img} alt={order.title} className="w-14 h-14 object-cover rounded" />
                <div>
                  <p className="font-medium text-[11px] truncate w-40">{order.title}</p>
                  <p className="text-[10px] text-gray-500">Size: {order.Brand}</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>

            <p className="text-[12px] text-gray-500 mt-2">Exchange/Return window closed</p>
            <div className="mt-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ))}
              </div>
              <div className="flex justify-between items-center mt-1">
                <p className="text-[12px] text-gray-600">{order.review}</p>
                {order.review === 'Thanks for your rating!' && (
                  <button className="text-blue-500 text-[12px] font-medium">Edit Review</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;