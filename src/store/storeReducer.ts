import { AnyAction } from 'redux';
import { CART_ADDITION } from './storeTypes';

const initialState = {
  error: false,
  cart: new Map(),
};

const StoreReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case CART_ADDITION: {
      const newCart = new Map(state.cart);

      const { uuid, quantity } = action.payload;

      if (newCart.has(uuid)) {
        newCart.set(uuid, newCart.get(uuid) + quantity);
      } else {
        newCart.set(uuid, quantity);
      }

      const newState = { ...initialState, cart: newCart };

      return newState;
    }
    default:
      return state;
  }
};

export default StoreReducer;
