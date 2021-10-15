import { AnyAction } from 'redux';
import { CART_ADD, CART_EDIT, CART_REMOVE } from './storeTypes';

const initialState = {
  error: false,
  cart: JSON.parse(localStorage.getItem('cart') || '{}'),
};

const StoreReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case CART_ADD: {
      const newCart = { ...state.cart };

      const { uuid, quantity } = action.payload;

      if (newCart[uuid]) {
        newCart[uuid] += quantity;
      } else {
        newCart[uuid] = quantity;
      }

      const newState = { ...initialState, cart: newCart };

      return newState;
    }
    case CART_EDIT: {
      const newCart = { ...state.cart };

      const { uuid, quantity } = action.payload;

      newCart[uuid] = quantity;

      const newState = { ...initialState, cart: newCart };

      return newState;
    }
    case CART_REMOVE: {
      const newCart = { ...state.cart };

      const { uuid } = action.payload;

      delete newCart[uuid];

      const newState = { ...initialState, cart: newCart };

      return newState;
    }
    default:
      return state;
  }
};

export default StoreReducer;
