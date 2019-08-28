import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import AuthReducer from './AuthReducer';
import BannerReducer from './BannerReducer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    auth: AuthReducer,
    banner: BannerReducer,
  });
