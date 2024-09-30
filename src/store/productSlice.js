// store/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  categories: [],
  products: [],
  selectedCategory: null,
  searchTerm: '',
  loading: false,
  error: null,
  totalProducts: 0,
  cart: [],
};

export const fetchCategories = createAsyncThunk('product/fetchCategories', async () => {
  const response = await axios.get('https://dummyjson.com/products/categories');
  return response.data;
});

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async ({ category, search, limit = 10, skip = 0 }, { getState }) => {
    let url = 'https://dummyjson.com/products';
    if (category) {
      url += `/category/${category}`;
    }
    const params = new URLSearchParams({
      limit: limit.toString(),
      skip: skip.toString(),
    });
    if (search) {
      params.append('q', search);
    }
    const response = await axios.get(`${url}?${params.toString()}`);
    console.log('API Response:', response.data); // Debug log
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.products = [];
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.products = [];
    },
    addToCart: (state, action) => {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.cart.find(item => item.id === productId);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        if (Array.isArray(action.payload.products)) {
          state.products = [...state.products, ...action.payload.products];
        } else if (typeof action.payload === 'object' && action.payload !== null) {
          state.products = [...state.products, action.payload];
        }
        state.totalProducts = action.payload.total || state.products.length;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setSelectedCategory,
  setSearchTerm,
  addToCart,
  removeFromCart,
  updateQuantity
} = productSlice.actions;

export default productSlice.reducer;