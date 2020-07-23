import _ from 'lodash';

import { AnyAction } from 'redux';
import {
  FETCH_COLLECTIONS,
  COLLECTION_ERROR
} from '../actions/types';

const initialState = {
  collections: [],
  error: null,
};

const StoreReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case FETCH_COLLECTIONS:
      if (_.isEqual(state.collections, action.payload)) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        collections: action.payload,
      };
    case COLLECTION_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default StoreReducer;
