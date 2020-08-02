import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import AuthReducer from './AuthReducer';
import EventsReducer from './EventsReducer';
import LeaderboardReducer from './LeaderboardReducer';
import RegisterReducer from './RegisterReducer';
import UserReducer from './UserReducer';
import PasswordReducer from './passwordReducer';
import ProfileReducer from './ProfileReducer';
import StoreReducer from './StoreReducer';

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    auth: AuthReducer,
    events: EventsReducer,
    leaderboard: LeaderboardReducer,
    register: RegisterReducer,
    user: UserReducer,
    pass: PasswordReducer,
    profile: ProfileReducer,
    store: StoreReducer,
  });
