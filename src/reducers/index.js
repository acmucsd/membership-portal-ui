import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import AuthReducer from './AuthReducer';
import BannerReducer from './BannerReducer';
import EventsReducer from './EventsReducer';
import LeaderboardReducer from './LeaderboardReducer';
import UserReducer from './UserReducer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    auth: AuthReducer,
    banner: BannerReducer,
    events: EventsReducer,
    leaderboard: LeaderboardReducer,
    user: UserReducer,
  });
