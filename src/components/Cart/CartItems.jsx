import React from 'react';
import { Trash2 } from 'lucide-react';

const CartItems = ({ cartItems, updateQuantity, removeItem }) => {
  return (
    <div className="space-y-8">
      {cartItems.map((item) => (
        <div key={item.id} className="flex gap-4 pb-6 border-b border-gray-100 dark:border-gray-800">
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 md:w-24 md:h-24 object-cover"
          />
          <div className="flex-grow">
            <h3 className="font-medium text-md text-gray-900 dark:text-white">{item.name}</h3>
            <div className="text-sm text-gray-800 dark:text-gray-200 mt-1">
              <p className="text-xs mb-1">ITEM NO: {item.itemNo}</p>
              <p className="text-xs mb-1">COLOR: {item.color}</p>
              <div className="flex items-center gap-2 mt-2">
                <span>QTY:</span>
                <div className="flex items-center border border-gray-300 dark:border-gray-600">
                  <button
                    onClick={() => updateQuantity(item.id, item.qty - 1)}
                    className="px-2 py-1 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 py-1">{item.qty}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.qty + 1)}
                    className="px-2 py-1 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="flex mt-3">
              <button
                onClick={() => removeItem(item.id)}
                className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1 text-sm"
              >
                <Trash2 size={14} />
                REMOVE
              </button>
            </div>
          </div>
          <div className="hidden md:flex flex-col items-end mr-6">
            {item.originalPrice && (
              <span className="text-gray-400 line-through text-sm">
                Rs.{item.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-gray-900 dark:text-white">Rs.{item.price.toFixed(2)}</span>
            {item.originalPrice && (
              <span className="text-green-600 text-xs mt-1">
                Save Rs.{(item.originalPrice - item.price).toFixed(2)}
              </span>
            )}
          </div>
          <div className="text-right flex flex-col items-end">
            <div className="text-gray-900 dark:text-white font-medium">
              Rs.{(item.price * item.qty).toFixed(2)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItems;