import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
axios.defaults.baseURL = API_URL;

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/v1/orders/place`, orderPayload);
      return response.data; 
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Order creation failed" 
      );
    }
  }
);

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (params, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams(params).toString();
      const response = await axios.get(`/api/v1/orders?${query}`);
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    totalOrders: 0,
    currentPage: 1,
    totalPages: 0,
    limit: 10,
    status: "idle", 
    createOrderStatus: "idle", 
    error: null, 
    createOrderError: null, 
    newlyCreatedOrder: null, 
  },
  reducers: {
    resetCreateOrderStatus: (state) => {
      state.createOrderStatus = "idle";
      state.createOrderError = null;
      state.newlyCreatedOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Reducers for fetchOrders
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload.data; 
        state.totalOrders = action.payload.pagination.totalOrders;
        state.currentPage = action.payload.pagination.currentPage;
        state.totalPages = action.payload.pagination.totalPages;
        state.limit = action.payload.pagination.limit;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.orders = []; 
        state.totalOrders = 0;
        state.currentPage = 1;
        state.totalPages = 0;
      })
      .addCase(createOrder.pending, (state) => {
        state.createOrderStatus = "loading";
        state.createOrderError = null;
        state.newlyCreatedOrder = null; 
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.createOrderStatus = "succeeded";
        state.newlyCreatedOrder = action.payload.order || action.payload; 

        // OPTIONAL: If you want to immediately add the new order to the list
        // without refetching, you can do so here. Be mindful of pagination if you do.
        // state.orders.unshift(state.newlyCreatedOrder);
        // state.totalOrders++;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.createOrderStatus = "failed";
        state.createOrderError = action.payload;
        state.newlyCreatedOrder = null; 
      });
  },
});

export const { resetCreateOrderStatus } = ordersSlice.actions; 
export default ordersSlice.reducer;