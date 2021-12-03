import { createSlice } from '@reduxjs/toolkit';

interface CartSlice {
  cartItems: any[];
  numberOfCartItems: number;
}

const initialState: CartSlice = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')?? 'null') || [] as any[],
  numberOfCartItems: Number.parseInt(localStorage.getItem('numberOfCartItems')?? '0'),
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
        localStorage.setItem('numberOfCartItems', state.numberOfCartItems.toString());
      }
    },
    clearCart(state) {
      state.cartItems = [] as any[];
      state.numberOfCartItems = 0;
    }
  }
});

export const { addToCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
