import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getCategoriesOrProducts } from '../firebase/firebase.database';

interface ProductsState {
  category: string,
  menuCategoriesList: any[],
  productList: any[],
  menuCategoriesListStatus: string,
  productListStatus: string,
  error: string
}

const initialState: ProductsState = {
  category: localStorage.getItem('currentCategory') || '',
  menuCategoriesList: [],
  productList: [],
  menuCategoriesListStatus: 'idle',
  productListStatus: 'idle',
  error: ''
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (category: string) => {
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
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.menuCategoriesListStatus = 'pending'
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.menuCategoriesListStatus = 'fulfilled'
        state.menuCategoriesList = action.payload;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.productListStatus = 'pending';
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.productListStatus = 'fulfilled';
        state.productList = action.payload;
      });
  }
});

export const { setCategory } = productsSlice.actions;

export default productsSlice.reducer;
