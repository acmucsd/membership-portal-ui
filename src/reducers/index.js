import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import BannerReducer from './BannerReducer';
import UserReducer from './UserReducer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    banner: BannerReducer,
    user: UserReducer,
  });
