/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../types';
import { loadCart, saveCart } from './localStorage';

const initialState = {
  error: false,
  cart: loadCart(),
};

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    addToCart(state, { payload }: PayloadAction<CartItem>) {
      const {
        option: { uuid },
        quantity,
      } = payload;

      if (quantity < 1) return;

      if (uuid in state.cart) state.cart[uuid].quantity += quantity;
      else state.cart[uuid] = payload;
    },
    editInCart(state, { payload }: PayloadAction<CartItem>) {
      const {
        option: { uuid },
        quantity,
      } = payload;

      if (!(uuid in state.cart)) return;

      if (quantity < 1) delete state.cart[uuid];
      else state.cart[uuid].quantity = quantity;
    },
    removeFromCart(state, { payload }: PayloadAction<CartItem>) {
      const {
        option: { uuid },
      } = payload;

      if (uuid in state.cart) delete state.cart[uuid];
    },
    clearCart(state) {
      state.cart = {};
    },
  },
});

export const subscriber = {
  selector: (store) => store.store.cart,
  onChange: saveCart,
};

export const { addToCart, editInCart, removeFromCart, clearCart } = storeSlice.actions;
export default storeSlice.reducer;
