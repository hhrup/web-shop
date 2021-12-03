import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './cartSlice';
import userReducer from './userSlice';
import productsSliceReducer from './productsSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    products: productsSliceReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;