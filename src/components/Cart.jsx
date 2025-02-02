import React, { useState } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'FERGUS STRAP AUTOMATIC 42MM',
      itemNo: '798483117334',
      size: 'OS',
      color: 'SILVER/BLACK/TAN',
      qty: 1,
      price: 297.50,
      originalPrice: 425.00,
      image: 'https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw486cfd62/images/Titan/Catalog/1825SL15_1.jpg?sw=800&sh=800'
    },
    {
      id: 2,
      name: 'NEW Q ZIPPERS HUGE HILLIER HOBO',
      itemNo: '888877826172',
      size: '1SZ',
      color: 'BLACK MULTI',
      qty: 1,
      price: 598.00,
      image: 'https://eske.in/cdn/shop/files/BA-507-BottleGreen-Cosmos_1.png?v=1738410138'
    },
    {
      id: 3,
      name: 'BAKER 36MM',
      itemNo: '798483929149',
      size: 'OS',
      color: 'BLACK',
      qty: 1,
      price: 195.00,
      image: 'https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000410501474001/ATFuMpNJU1-469680105001_1.jpg'
    }
  ]);

  const updateQuantity = (id, newQty) => {
    if (newQty < 1 || newQty > 10) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, qty: newQty } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.qty), 0);
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row gap-8 bg-white dark:bg-black mt-2">
      <div className="flex-grow p-4 lg:p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">MY SHOPPING BAG</h1>
        <hr className="mb-4" />
        <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">PRODUCT</span>
          <div className="flex gap-16">
            <span className="text-sm text-gray-500 dark:text-gray-400">PRICE</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">TOTAL</span>
          </div>
        </div>

        <div className="space-y-8">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-10 h-10 md:w-20 md:h-20 object-cover"
              />
              <div className="flex-grow">
                <h3 className="sm:text-xs md:font-medium md:text-lg text-gray-900 dark:text-white">{item.name}</h3>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <p>ITEM NO: {item.itemNo}</p>
                  <p>SIZE: {item.size}</p>
                  <p>COLOR: {item.color}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span>QTY:</span>
                    <div className="flex items-center border border-gray-300 dark:border-gray-600">
                      <button 
                        onClick={() => updateQuantity(item.id, item.qty - 1)}
                        className="px-2 py-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        -
                      </button>
                      <span className="px-2 py-1">{item.qty}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.qty + 1)}
                        className="px-2 py-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 mt-2 text-sm">
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    REMOVE
                  </button>
                  <span className="text-gray-300 dark:text-gray-600">|</span>
                  <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                    EDIT
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end mr-6">
                  {item.originalPrice && (
                    <span className="text-gray-400 line-through text-sm">
                      ${item.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-gray-900 dark:text-white">${item.price.toFixed(2)}</span>
                </div>
              <div className="text-right flex flex-col items-end gap-2">
                <div className="text-gray-900 dark:text-white">
                  ${(item.price * item.qty).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full lg:w-80 bg-gray-50 dark:bg-neutral-900 px-6 py-4 lg:py-10">
        <h2 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">SUMMARY</h2>

        <div className="mb-6">
          <p className="text-sm mb-2 text-gray-700 dark:text-gray-300">Do you have a promo code?</p>
          <div className="flex">
            <input
              type="text"
              className="flex-grow p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none"
            />
            <button className="px-4 py-2 bg-black dark:bg-gray-900 text-white text-sm">
              APPLY
            </button>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-700 dark:text-gray-300">SUBTOTAL</span>
            <span className="text-gray-900 dark:text-white">${calculateSubtotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700 dark:text-gray-300">Shipping</span>
            <span className="text-gray-900 dark:text-white">TBD</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700 dark:text-gray-300">Sales Tax</span>
            <span className="text-gray-900 dark:text-white">TBD</span>
          </div>
          <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <span className="font-bold text-gray-900 dark:text-white">ESTIMATED TOTAL</span>
            <span className="font-bold text-gray-900 dark:text-white">${calculateSubtotal().toFixed(2)}</span>
          </div>
        </div>

        <button className="w-full bg-black dark:bg-white dark:text-black border text-white py-3 mb-4">
          CHECKOUT
        </button>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Need help? Call us at 1-877-707-6272
        </p>
      </div>
    </div>
  );
};

export default Cart;