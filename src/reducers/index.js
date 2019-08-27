import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import BannerReducer from './BannerReducer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    banner: BannerReducer,
  });
