import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import AdminReducer from './admin/adminReducer';
import AuthReducer from './auth/authReducer';
import EventReducer from './event/eventReducer';
import LeaderboardReducer from './leaderboard/leaderboardReducer';
import ProfileReducer from './profile/profileReducer';
// import StoreReducer from './store/storeReducer';
import StoreReducer from './store/storeSlice';

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    admin: AdminReducer,
    auth: AuthReducer,
    event: EventReducer,
    leaderboard: LeaderboardReducer,
    profile: ProfileReducer,
    store: StoreReducer,
  });
