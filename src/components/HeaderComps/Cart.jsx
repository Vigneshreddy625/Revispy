import React, { useState, useEffect } from 'react';
import { Trash2, ShoppingBag, CreditCard, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

  // Shipping costs
  const shippingCosts = {
    standard: 5.99,
    express: 15.99,
    free: 0
  };

  // Calculate tax (simplified version - 7% tax)
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
    // Sample promo codes
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

  // Calculate final total
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal - discount);
    const shipping = shippingCosts[shippingMethod];
    return subtotal - discount + tax + shipping;
  };

  // Check if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      // Reset discount if cart becomes empty
      setDiscount(0);
      setPromoCode('');
    }
  }, [cartItems]);

  // Empty cart message
  if (cartItems.length === 0) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 bg-white dark:bg-black">
        <ShoppingBag size={64} className="text-gray-400 mb-4" />
        <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Your shopping bag is empty</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Looks like you haven't added any items yet</p>
        <button className="px-6 py-3 bg-black dark:bg-white dark:text-black text-white flex items-center gap-2">
          <ChevronLeft size={16} />
          Continue Shopping
        </button>
      </div>
    );
  }

  // Checkout form
  if (isCheckingOut) {
    return (
      <div className="w-full min-h-screen flex flex-col lg:flex-row gap-8 bg-white dark:bg-black mt-2">
        <div className="flex-grow p-4 lg:p-8">
          <div className="flex items-center gap-2 mb-6">
            <button 
              onClick={() => setIsCheckingOut(false)}
              className="text-gray-600 dark:text-gray-400 flex items-center gap-1"
            >
              <ChevronLeft size={16} />
              <span>Back to cart</span>
            </button>
          </div>
          <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">CHECKOUT</h1>
          
          <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h2 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">First Name*</label>
                  <input className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Last Name*</label>
                  <input className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Address*</label>
                  <input className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">City*</label>
                  <input className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Zip Code*</label>
                  <input className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700" />
                </div>
              </div>
            </div>
            
            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h2 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Payment Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Card Number*</label>
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 p-2 gap-2">
                    <input className="flex-grow border-none outline-none bg-transparent" placeholder="xxxx xxxx xxxx xxxx" />
                    <CreditCard className="text-gray-400" size={20} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Expiration Date*</label>
                    <input className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700" placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">CVV*</label>
                    <input className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700" placeholder="123" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <button 
            className="w-full lg:w-auto mt-6 px-8 py-3 bg-black dark:bg-white dark:text-black text-white font-medium"
            onClick={() => alert("Order placed successfully!")}
          >
            PLACE ORDER
          </button>
        </div>
        
        <div className="w-full lg:w-80 bg-gray-50 dark:bg-neutral-900 px-6 py-4 lg:py-10">
          <h2 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">ORDER SUMMARY</h2>
          
          <div className="max-h-80 overflow-y-auto mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-3 mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover"
                />
                <div className="flex-grow">
                  <h3 className="text-sm text-gray-900 dark:text-white">{item.name}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Qty: {item.qty}</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Rs.{(item.price * item.qty).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-700 dark:text-gray-300">Subtotal</span>
              <span className="text-gray-900 dark:text-white">Rs.{calculateSubtotal().toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-Rs.{discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-700 dark:text-gray-300">Shipping</span>
              <span className="text-gray-900 dark:text-white">
                {shippingMethod === 'free' ? 'FREE' : `Rs.${shippingCosts[shippingMethod].toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700 dark:text-gray-300">Tax</span>
              <span className="text-gray-900 dark:text-white">
                Rs.{calculateTax(calculateSubtotal() - discount).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <span className="font-bold text-gray-900 dark:text-white">TOTAL</span>
              <span className="font-bold text-gray-900 dark:text-white">Rs.{calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
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
      </div>

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

        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-700 dark:text-gray-300">SUBTOTAL</span>
            <span className="text-gray-900 dark:text-white">Rs.{calculateSubtotal().toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>DISCOUNT</span>
              <span>-Rs.{discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-700 dark:text-gray-300">SHIPPING</span>
            <span className="text-gray-900 dark:text-white">
              {shippingMethod === 'free' ? 'FREE' : `Rs.${shippingCosts[shippingMethod].toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700 dark:text-gray-300">TAX</span>
            <span className="text-gray-900 dark:text-white">
              Rs.{calculateTax(calculateSubtotal() - discount).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <span className="font-bold text-gray-900 dark:text-white">ESTIMATED TOTAL</span>
            <span className="font-bold text-gray-900 dark:text-white">Rs.{calculateTotal().toFixed(2)}</span>
          </div>
        </div>

        <button 
          onClick={() => setIsCheckingOut(true)}
          className="w-full bg-black dark:bg-white dark:text-black text-white py-3 mb-4 flex items-center justify-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
        >
          <CreditCard size={16} />
          CHECKOUT
        </button>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-2">
          Need help? Call us at 1-877-707-6272
        </p>
        <button className="w-full border border-black dark:border-white text-black dark:text-white py-2 text-sm mb-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" onClick={() => navigate("/home")}>
          CONTINUE SHOPPING
        </button>
      </div>
    </div>
  );
};

export default Cart;