import React from 'react';
import { CreditCard } from 'lucide-react';
import OrderSummary from './OrderSummary';

const CartSummary = ({
  calculateSubtotal,
  calculateTotal,
  calculateTax,
  promoCode,
  setPromoCode,
  discount,
  promoError,
  applyPromoCode,
  shippingMethod,
  setShippingMethod,
  shippingCosts,
  setIsCheckingOut,
  navigate
}) => {
  return (
    <div className="w-full lg:w-96 bg-gray-50 dark:bg-neutral-900 px-6 py-6 lg:py-10">
      <h2 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">SUMMARY</h2>

      <div className="mb-6">
        <p className="text-sm mb-2 text-gray-700 dark:text-gray-300">Do you have a promo code?</p>
        <div className="flex">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-grow p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none"
            placeholder="Enter code"
          />
          <button
            onClick={applyPromoCode}
            className="px-4 py-2 bg-black dark:bg-gray-900 text-white text-sm"
          >
            APPLY
          </button>
        </div>
        {promoError && <p className="text-red-500 text-xs mt-1">{promoError}</p>}
        {discount > 0 && <p className="text-green-600 text-xs mt-1">Discount applied!</p>}
        {shippingMethod === 'free' && <p className="text-green-600 text-xs mt-1">Free shipping applied!</p>}
      </div>

      <div className="mb-6">
        <p className="text-sm mb-2 text-gray-700 dark:text-gray-300">Shipping Method</p>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={shippingMethod === 'standard'}
              onChange={() => setShippingMethod('standard')}
            />
            <span className="text-sm text-gray-900 dark:text-white">Standard Delivery (3-5 days) - Rs.{shippingCosts.standard.toFixed(2)}</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={shippingMethod === 'express'}
              onChange={() => setShippingMethod('express')}
            />
            <span className="text-sm text-gray-900 dark:text-white">Express Delivery (1-2 days) - Rs.{shippingCosts.express.toFixed(2)}</span>
          </label>
          {shippingMethod === 'free' && (
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={shippingMethod === 'free'}
                onChange={() => {}}
              />
              <span className="text-sm text-gray-900 dark:text-white">Free Shipping - Rs.0.00</span>
            </label>
          )}
        </div>
      </div>

      <OrderSummary
        calculateSubtotal={calculateSubtotal}
        calculateTotal={calculateTotal}
        calculateTax={calculateTax}
        discount={discount}
        shippingMethod={shippingMethod}
        shippingCosts={shippingCosts}
      />

      <button
        onClick={() => setIsCheckingOut(true)}
        className="w-full bg-black dark:bg-white dark:text-black text-white py-3 mb-4 flex items-center justify-center gap-2"
      >
        <CreditCard size={16} />
        PROCEED TO CHECKOUT
      </button>
      <button
        onClick={() => navigate('/home')}
        className="w-full bg-gray-200 dark:bg-gray-800 dark:text-white text-black py-3"
      >
        CONTINUE SHOPPING
      </button>
    </div>
  );
};

export default CartSummary;