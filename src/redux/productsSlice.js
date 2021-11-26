import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCategoriesOrProducts } from '../firebase/firebase.database';

const initialState = {
  category: localStorage.getItem('currentCategory') || '',
  menuCategoriesList: [],
  productList: [],
  menuCategoriesListStatus: 'idle',
  productListStatus: 'idle',
  error: null
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (category) => {
  const response = await getCategoriesOrProducts(category);
  return response;
});

export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
  const categoriesList = await getCategoriesOrProducts('productCategories');
  return categoriesList;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state, action) => {
        state.menuCategoriesListStatus = 'pending'
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.menuCategoriesListStatus = 'fulfilled'
        state.menuCategoriesList = action.payload;
      })
      .addCase(fetchProducts.pending, (state, action) => {
        state.productListStatus = 'pending';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productListStatus = 'fulfilled';
        state.productList = action.payload;
      });
  }
});

export const { setCategory } = productsSlice.actions;

export default productsSlice.reducer;
