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
  updateCartItemOptimistic,
  removeFromCartOptimistic,
  removeFromCart,
} from '../../redux/Cart/cartSlice';
import LoadingScreen from '../Items/LoadingScreen';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart, loading, error } = useSelector((state) => state.cart);

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [promoError, setPromoError] = useState('');

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (!cart && loading.fetch) return <LoadingScreen />;
  if (error) return <p className="text-red-500">{error}</p>;

  if (!cart || !cart.items || cart.items.length === 0) {
    return <EmptyCart navigate={navigate} />;
  }

  const handleUpdateQuantity = (cartItemId, newQty) => {
    const item = cart.items.find((i) => i._id === cartItemId);
    if (!item || newQty < 1) return;

    dispatch(updateCartItemOptimistic({ productId: item.product._id, quantity: newQty }));

    dispatch(updateCartItem({ productId: item.product._id, quantity: newQty }));
  };

  const handleRemoveItem = (cartItemId) => {
    const item = cart.items.find((i) => i._id === cartItemId);
    if (!item) return;
    dispatch(removeFromCartOptimistic(item.product._id));
    dispatch(removeFromCart(item.product._id));
  };

  const applyPromoCode = () => {
    const code = cart.promoCode?.code?.toUpperCase();
    if (code === 'SAVE10' || code === 'FREESHIP') {
      setPromoError('');
    } else {
      setPromoError('Invalid promo code');
    }
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
      calculateSubtotal={cart.subtotal}
      calculateTotal={cart.total}
      calculateTax={cart.tax}
      discount={cart.promoCode.discount}
      shippingCosts={cart.shipping.cost}
      setIsCheckingOut={setIsCheckingOut}
    />
  ) : (
    <div className="w-full lg:min-w-[1024px] min-h-screen flex flex-col lg:flex-row gap-8 bg-white dark:bg-black mt-2">
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
          <div className="flex gap-24">
            <span className="hidden md:flex text-sm text-gray-500 dark:text-gray-400">PRICE</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">TOTAL</span>
          </div>
        </div>

        <CartItems
          cartItems={cart.items}
          loading={loading}
          updateQuantity={handleUpdateQuantity}
          removeItem={handleRemoveItem}
        />
      </div>

    <CartSummary
      cartItems={cart.items}
      cart={cart}
      setPromoCode={() => {}}
      promoError={promoError}
      applyPromoCode={applyPromoCode}
      setIsCheckingOut={setIsCheckingOut}
      navigate={navigate}
    />

    </div>
  );
};

export default Cart;
