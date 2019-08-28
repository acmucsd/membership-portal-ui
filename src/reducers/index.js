import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import AuthReducer from './AuthReducer';
import BannerReducer from './BannerReducer';
import UserReducer from './UserReducer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    auth: AuthReducer,
    banner: BannerReducer,
    user: UserReducer,
  });
