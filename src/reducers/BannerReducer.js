import { FETCH_BANNER } from '../actions/types';

const initialState = {
  url: '',
***REMOVED***

const BannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BANNER:
      return {
        ...state,
        url: action.payload,
      ***REMOVED***
    default:
      return state;
  }
***REMOVED***

export default BannerReducer;
