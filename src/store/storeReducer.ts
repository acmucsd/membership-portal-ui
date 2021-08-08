import { AnyAction } from 'redux';
import {} from './storeTypes';

const initialState = {
  error: false,
  cart: [{}, {}],
};

const StoreReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default StoreReducer;
