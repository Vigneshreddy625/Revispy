import React from 'react';

const OrderSummary = ({ calculateSubtotal, calculateTotal, calculateTax, discount, shippingMethod, shippingCosts }) => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal - discount);
    const shipping = shippingCosts[shippingMethod];
    const total = calculateTotal();

    return (
        <div className="mb-6">
            <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">Subtotal</span>
                <span className="text-sm text-gray-900 dark:text-white">Rs.{subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
                <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Discount</span>
                    <span className="text-sm text-green-600 dark:text-white">-Rs.{discount.toFixed(2)}</span>
                </div>
            )}
            <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">Tax</span>
                <span className="text-sm text-gray-900 dark:text-white">Rs.{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
                <span className="text-sm text-gray-700 dark:text-gray-300">Shipping</span>
                <span className="text-sm text-gray-900 dark:text-white">Rs.{shipping.toFixed(2)}</span>
            </div>
            <hr className="mb-4 border-gray-200 dark:border-gray-700" />
            <div className="flex justify-between">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">Rs.{total.toFixed(2)}</span>
            </div>
        </div>
    );
};

export default OrderSummary;
