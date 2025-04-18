import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
axios.defaults.baseURL = API_URL;

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/products/`);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [], 
    loading: false, 
    error: null, 
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true; 
        state.error = null; 
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false; 
        state.items = action.payload; 
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false; 
        state.error = action.payload || action.error.message; 
      });
  },
});

export default productSlice.reducer;
export const { clearErrors } = productSlice.actions;