import React, { useState, useEffect } from 'react';
import { ShoppingBag, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EmptyCart from './EmptyCart';
import CartItems from './CartItems';
import CartSummary from './CartSummary';
import Checkout from './Checkout';
import OrderSummary from './OrderSummary';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'FERGUS STRAP AUTOMATIC 42MM',
      itemNo: '798483117334',
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
      color: 'BLACK MULTI',
      qty: 1,
      price: 598.00,
      image: 'https://eske.in/cdn/shop/files/BA-507-BottleGreen-Cosmos_1.png?v=1738410138'
    },
    {
      id: 3,
      name: 'BAKER 36MM',
      itemNo: '798483929149',
      color: 'BLACK',
      qty: 1,
      price: 195.00,
      image: 'https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000410501474001/ATFuMpNJU1-469680105001_1.jpg'
    }
  ]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const navigate = useNavigate();

  const shippingCosts = {
    standard: 5.99,
    express: 15.99,
    free: 0
  };

  const calculateTax = (subtotal) => {
    return subtotal * 0.07;
  };

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

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'SAVE10') {
      setDiscount(calculateSubtotal() * 0.1);
      setPromoError('');
    } else if (promoCode.toUpperCase() === 'FREESHIP') {
      setShippingMethod('free');
      setPromoError('');
    } else {
      setPromoError('Invalid promo code');
      setDiscount(0);
    }
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal - discount);
    const shipping = shippingCosts[shippingMethod];
    return subtotal - discount + tax + shipping;
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      setDiscount(0);
      setPromoCode('');
    }
  }, [cartItems]);

  if (cartItems.length === 0) {
    return <EmptyCart navigate={navigate} />;
  }

  if (isCheckingOut) {
    return (
      <Checkout
        cartItems={cartItems}
        calculateSubtotal={calculateSubtotal}
        calculateTotal={calculateTotal}
        calculateTax={calculateTax}
        discount={discount}
        shippingMethod={shippingMethod}
        shippingCosts={shippingCosts}
        setIsCheckingOut={setIsCheckingOut}
      />
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row gap-8 bg-white dark:bg-black mt-2">
      <div className="flex-grow p-4 lg:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">MY SHOPPING BAG ({cartItems.length})</h1>
          <button className="text-sm text-gray-600 dark:text-gray-400 hover:underline">Save for later</button>
        </div>
        <hr className="mb-4" />
        <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">PRODUCT</span>
          <div className="flex gap-16">
            <span className="hidden md:flex text-sm text-gray-500 dark:text-gray-400">PRICE</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">TOTAL</span>
          </div>
        </div>

        <CartItems
          cartItems={cartItems}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
        />
      </div>

      <CartSummary
        cartItems={cartItems}
        calculateSubtotal={calculateSubtotal}
        calculateTotal={calculateTotal}
        calculateTax={calculateTax}
        promoCode={promoCode}
        setPromoCode={setPromoCode}
        discount={discount}
        promoError={promoError}
        applyPromoCode={applyPromoCode}
        shippingMethod={shippingMethod}
        setShippingMethod={setShippingMethod}
        shippingCosts={shippingCosts}
        setIsCheckingOut={setIsCheckingOut}
        navigate={navigate}
      />
    </div>
  );
};

export default Cart;



