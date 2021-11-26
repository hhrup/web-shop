import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './cartSlice';
import userReducer from './userSlice';
import productsSliceReducer from './productsSlice';

export default configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    products: productsSliceReducer,
  }
});