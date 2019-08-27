import { FETCH_BANNER } from '../actions/types';

const initialState = {
  url: '',
};

const BannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BANNER:
      return {
        ...state,
        url: action.payload,
      };
    default:
      return state;
  }
};

export default BannerReducer;
