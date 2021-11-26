import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
  numberOfCartItems: Number.parseInt(localStorage.getItem('numberOfCartItems')) || 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      // action payload is/should be product object
      const product = action.payload;

      if (state.cartItems.find(element => element.id === product.id))
        alert('Product already in cart!');
      else {
        state.cartItems.push(product);
        state.numberOfCartItems = state.cartItems.length;

        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        localStorage.setItem('numberOfCartItems', state.numberOfCartItems);
      }
    },
    clearCart(state, action) {
      state.cartItems = [];
      state.numberOfCartItems = 0;
    }
  }
});

export const { addToCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
