/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../types';
import { loadCart, saveCart } from './localStorage';
import * as utils from './utils';
import { withLogout } from '../auth/authSlice';
import type { RootState } from '../redux/store';

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

export const fetchCollection = withLogout(utils.fetchCollection, 'store/fetchCollection');
export const fetchCollections = withLogout(utils.fetchCollections, 'store/fetchCollections');
export const deleteCollection = withLogout(utils.deleteCollection, 'store/deleteCollection');
export const fetchItem = withLogout(utils.fetchItem, 'store/fetchItem');
export const deleteItem = withLogout(utils.deleteItem, 'store/deleteItem');
export const createItemOption = withLogout(utils.createItemOption, 'store/createItemOption');
export const deleteItemOption = withLogout(utils.deleteItemOption, 'store/deleteItemOption');
export const fetchOrders = withLogout(utils.fetchOrders, 'store/fetchOrders');
export const fetchOrder = withLogout(utils.fetchOrder, 'store/fetchOrder');
export const fulfillOrder = withLogout(utils.fulfillOrder, 'store/fulfillOrder');
export const rescheduleOrder = withLogout(utils.rescheduleOrder, 'store/rescheduleOrder');
export const cancelOrder = withLogout(utils.cancelOrder, 'store/cancelOrder');
export const cancelAllOrders = withLogout(utils.cancelAllOrders, 'store/cancelAllOrders');
export const fetchPickupEvent = withLogout(utils.fetchPickupEvent, 'store/fetchPickupEvent');
export const fetchPastPickupEvents = withLogout(utils.fetchPastPickupEvents, 'store/fetchPastPickupEvents');
export const fetchFuturePickupEvents = withLogout(utils.fetchFuturePickupEvents, 'store/fetchFuturePickupEvents');
export const completePickupEvent = withLogout(utils.completePickupEvent, 'store/completePickupEvent');
export const deletePickupEvent = withLogout(utils.deletePickupEvent, 'store/deletePickupEvent');
export const cancelPickupEvent = withLogout(utils.cancelPickupEvent, 'store/cancelPickupEvent');

export const cartSelector = (state: RootState) => state.store.cart;

export const { addToCart, editInCart, removeFromCart, clearCart } = storeSlice.actions;
export default storeSlice.reducer;
