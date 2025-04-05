import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";
const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
axios.defaults.baseURL = API_URL;

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/v1/cart/add`, { productId });
      toast.success("Item added to cart!");
      return response.data;
    } catch (err) {
        toast.error(err.response?.data?.message || "Add to cart failed");
      return rejectWithValue(err.response?.data?.message || "Add to cart failed");
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/v1/cart/update`, { productId, quantity });
      return response.data;
    } catch (err) {
        toast.error(err.response?.data?.message || "Update quantity failed");
      return rejectWithValue(err.response?.data?.message || "Update quantity failed");
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/v1/cart/remove/${productId}`);
      toast.success("Item removed from cart!");
      return response.data;
    } catch (err) {
        toast.error(err.response?.data?.message || "Remove item failed");
      return rejectWithValue(err.response?.data?.message || "Remove item failed");
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/v1/cart/clear`);
      return response.data;
    } catch (err) {
        toast.error(err.response?.data?.message || "Remove item failed");
      return rejectWithValue(err.response?.data?.message || "Clear cart failed");
    }
  }
);

export const applyPromoCode = createAsyncThunk(
  "cart/applyPromoCode",
  async ({ code, discount, discountType }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/v1/cart/promo`, { code, discount, discountType });
      toast.success("Promocode applied!");
      return response.data;
    } catch (err) {
        toast.error(err.response?.data?.message || "Apply promo failed");
      return rejectWithValue(err.response?.data?.message || "Apply promo failed");
    }
  }
);

export const updateShipping = createAsyncThunk(
  "cart/updateShipping",
  async ({ method }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/v1/cart/shipping`, { method });
      return response.data;
    } catch (err) {
        toast.error(err.response?.data?.message || "Update shipping failed");
      return rejectWithValue(err.response?.data?.message || "Update shipping failed");
    }
  }
);

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/cart/`);
      return response.data;
    } catch (err) {
        toast.error(err.response?.data?.message || "Remove item failed");
      return rejectWithValue(err.response?.data?.message || "Fetch cart failed");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetCartState: (state) => {
      state.cart = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const actions = [
      fetchCart,
      addToCart,
      updateCartItem,
      removeFromCart,
      clearCart,
      applyPromoCode,
      updateShipping,
    ];

    actions.forEach((action) => {
      builder
        .addCase(action.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(action.fulfilled, (state, action) => {
          state.loading = false;
          state.cart = action.payload;
        })
        .addCase(action.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    });
  },
});

export const { resetCartState } = cartSlice.actions;
export default cartSlice.reducer;