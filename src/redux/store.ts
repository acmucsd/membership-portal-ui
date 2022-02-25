import { configureStore } from '@reduxjs/toolkit';
import AdminReducer from '../admin/adminReducer';
import AuthReducer from '../auth/authReducer';
import EventReducer from '../event/eventReducer';
import LeaderboardReducer from '../leaderboard/leaderboardReducer';
import ProfileReducer from '../profile/profileReducer';
import storeSlice, { subscriber as storeSubscriber } from '../store/storeSlice';

export const store = configureStore({
  reducer: {
    store: storeSlice,
    admin: AdminReducer,
    auth: AuthReducer,
    event: EventReducer,
    leaderboard: LeaderboardReducer,
    profile: ProfileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const observeStore = <T>(selector: (state: RootState) => T, onChange: (state: T) => void) => {
  let currentState;

  const handleChange = () => {
    const nextState = selector(store.getState());
    if (nextState !== currentState) {
      currentState = nextState;
      onChange(currentState);
    }
  };

  console.log('subscribing to store');
  const unsubscribe = store.subscribe(handleChange);
  handleChange();
  return unsubscribe;
};

observeStore(storeSubscriber.selector, storeSubscriber.onChange);
