import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmptyCart from './EmptyCart';
import CartItems from './CartItems';
import CartSummary from './CartSummary';
import Checkout from './Checkout';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCart,
  updateCartItem,
  removeFromCart,
} from '../../redux/Cart/cartSlice';
import LoadingScreen from '../Items/LoadingScreen';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart, loading, error } = useSelector((state) => state.cart);

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [promoError, setPromoError] = useState('');

  const shippingCosts = {
    standard: 5.99,
    express: 15.99,
    free: 0,
  };

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (loading) return <LoadingScreen />;
  if (error) return <p className="text-red-500">{error}</p>;

  if (!cart || !cart.items || cart.items.length === 0) {
    return <EmptyCart navigate={navigate} />;
  }

  const handleUpdateQuantity = (cartItemId, newQty) => {
    const item = cart.items.find((i) => i._id === cartItemId);
    if (!item || newQty < 1) return;
    dispatch(updateCartItem({ productId: item.product._id, quantity: newQty }));
  };

  const handleRemoveItem = (cartItemId) => {
    const item = cart.items.find((i) => i._id === cartItemId);
    if (!item) return;
    dispatch(removeFromCart(item.product._id));
  };

  const calculateSubtotal = () => {
    return cart.items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };

  const calculateTax = (subtotal) => subtotal * 0.07;

  const applyPromoCode = () => {
    const code = cart.promoCode?.code?.toUpperCase();
    if (code === 'SAVE10' || code === 'FREESHIP') {
      setPromoError('');
    } else {
      setPromoError('Invalid promo code');
    }
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = cart.promoCode?.discount || 0;
    const tax = calculateTax(subtotal - discount);
    const shipping =
      shippingCosts[cart.shipping.method.toLowerCase()] ??
      shippingCosts.standard;
    return subtotal - discount + tax + shipping;
  };

  return isCheckingOut ? (
    <Checkout
    cartItems={cart.items.map((item) => ({
      id: item._id, 
      name: item.product.title,
      image: item.product.image,
      itemNo: item.product._id.slice(-6),
      color: item.product.colors[0]?.name || 'Default',
      qty: item.quantity,
      price: item.product.price,
      originalPrice: item.product.originalPrice,
    }))}
      calculateSubtotal={calculateSubtotal}
      calculateTotal={calculateTotal}
      calculateTax={calculateTax}
      discount={cart.promoCode.discount}
      shippingMethod={cart.shipping.method}
      shippingCosts={shippingCosts}
      setIsCheckingOut={setIsCheckingOut}
    />
  ) : (
    <div className="w-full min-h-screen flex flex-col lg:flex-row gap-8 bg-white dark:bg-black mt-2">
      <div className="flex-grow p-4 lg:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            MY SHOPPING BAG ({cart.items.length})
          </h1>
          <button className="text-sm text-gray-600 dark:text-gray-400 hover:underline">
            Save for later
          </button>
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
          cartItems={cart.items.map((item) => ({
            id: item._id, 
            name: item.product.title,
            image: item.product.image,
            itemNo: item.product._id.slice(-6),
            color: item.product.colors[0]?.name || 'Default',
            qty: item.quantity,
            price: item.product.price,
            originalPrice: item.product.originalPrice,
          }))}
          updateQuantity={handleUpdateQuantity}
          removeItem={handleRemoveItem}
        />
      </div>

      <CartSummary
        cartItems={cart.items}
        calculateSubtotal={calculateSubtotal}
        calculateTotal={calculateTotal}
        calculateTax={calculateTax}
        promoCode={cart.promoCode.code || ''}
        setPromoCode={() => {}}
        discount={cart.promoCode.discount}
        promoError={promoError}
        applyPromoCode={applyPromoCode}
        shippingMethod={cart.shipping.method}
        setShippingMethod={() => {}}
        shippingCosts={shippingCosts}
        setIsCheckingOut={setIsCheckingOut}
        navigate={navigate}
      />
    </div>
  );
};

export default Cart;
