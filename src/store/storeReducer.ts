import { AnyAction } from 'redux';
import { CART_ADD, CART_EDIT, CART_REMOVE } from './storeTypes';

const initialState = {
  error: false,
  cart: JSON.parse(localStorage.getItem('cart') || '{}'),
};

const StoreReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case CART_ADD: {
      const { uuid, quantity } = action.payload;

      if (!uuid || quantity < 1) {
        return state;
      }

      const newCart = { ...state.cart };

      if (newCart[uuid]) {
        newCart[uuid] += quantity;
      } else {
        newCart[uuid] = quantity;
      }

      const newState = { ...initialState, cart: newCart };

      return newState;
    }
    case CART_EDIT: {
      const { uuid, quantity } = action.payload;

      if (!uuid) {
        return state;
      }

      const newCart = { ...state.cart };

      if (quantity > 0) {
        newCart[uuid] = quantity;
      } else {
        delete newCart[uuid];
      }

      const newState = { ...initialState, cart: newCart };

      return newState;
    }
    case CART_REMOVE: {
      const { uuid } = action.payload;

      if (!uuid) {
        return state;
      }

      const newCart = { ...state.cart };

      delete newCart[uuid];

      const newState = { ...initialState, cart: newCart };

      return newState;
    }
    default:
      return state;
  }
};

export default StoreReducer;
