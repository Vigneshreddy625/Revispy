import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWishlistItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/backend/api/v1/wishlist`);
      setWishlistItems(response.data.data);
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  const addWishlistItem = async (productId) => {
    try {
      await axios.post(
        `/backend/api/v1/wishlist`,
        { productId },
        { headers: { 'Content-Type': 'application/json' } }
      );
      fetchWishlistItems();
      toast.success("Item added to wishlist.");
    } catch (err) {
      setError(err.response?.data || err.message);
      toast.error("Failed to add item to wishlist.");
    }
  };

  const removeWishlistItem = async (productId) => {
    setLoading(true);
    try {
      await axios.delete(`/backend/api/v1/wishlist`, {
        headers: { 'Content-Type': 'application/json' },
        data: { productId },
      });
      setWishlistItems((prevItems) => prevItems.filter((item) => item._id !== productId));
      toast.success("Item removed from wishlist.");
    } catch (err) {
      setError(err.response?.data || err.message);
      toast.error("Failed to remove item from wishlist.");
      fetchWishlistItems();
    } finally {
      setLoading(false);
    }
  };

  const value = {
    wishlistItems,
    loading,
    error,
    addWishlistItem,
    removeWishlistItem,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => useContext(WishlistContext);
