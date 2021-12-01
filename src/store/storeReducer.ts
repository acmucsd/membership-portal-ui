import { AnyAction } from 'redux';
import { CART_ADD, CART_EDIT, CART_REMOVE } from './storeTypes';
import { CartItem } from '../types';

const initialState = {
  error: false,
  cart: JSON.parse(localStorage.getItem('cart') || '{}'),
};

const StoreReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case CART_ADD: {
      const { optionUUID, quantity }: CartItem = action.payload;

      if (!optionUUID || quantity < 1) {
        return state;
      }

      const newCart = { ...state.cart };

      if (newCart[optionUUID]) {
        // Item exists, no need to save item data
        newCart[optionUUID].quantity += quantity;
      } else {
        // Item doesn't exist, need to save item data
        newCart[optionUUID] = action.payload;
      }

      localStorage.setItem('cart', JSON.stringify(newCart));

      const newState = { ...initialState, cart: newCart };

      return newState;
    }
    case CART_EDIT: {
      const { optionUUID, quantity }: CartItem = action.payload;

      if (!optionUUID) {
        return state;
      }

      const newCart = { ...state.cart };

      if (quantity > 0) {
        newCart[optionUUID].quantity = quantity;
      } else {
        delete newCart[optionUUID];
      }

      localStorage.setItem('cart', JSON.stringify(newCart));

      const newState = { ...initialState, cart: newCart };

      return newState;
    }
    case CART_REMOVE: {
      const { optionUUID }: CartItem = action.payload;

      if (!optionUUID) {
        return state;
      }

      const newCart = { ...state.cart };

      delete newCart[optionUUID];

      localStorage.setItem('cart', JSON.stringify(newCart));

      const newState = { ...initialState, cart: newCart };

      return newState;
    }
    default:
      return state;
  }
};

export default StoreReducer;
