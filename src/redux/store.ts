import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import adminSlice from '../admin/adminSlice';
import authSlice from '../auth/authSlice';
import EventReducer from '../event/eventReducer';
import LeaderboardReducer from '../leaderboard/leaderboardReducer';
import ProfileReducer from '../profile/profileReducer';
import storeSlice, { subscriber as storeSubscriber } from '../store/storeSlice';

export const store = configureStore({
  reducer: {
    store: storeSlice,
    admin: adminSlice,
    auth: authSlice,
    event: EventReducer,
    leaderboard: LeaderboardReducer,
    profile: ProfileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const observeStore = <T>(selector: (state: RootState) => T, onChange: (state: T) => void) => {
  let currentState;

  const handleChange = () => {
    const nextState = selector(store.getState());
    if (nextState !== currentState) {
      currentState = nextState;
      onChange(currentState);
    }
  };

  const unsubscribe = store.subscribe(handleChange);
  handleChange();
  return unsubscribe;
};

observeStore(storeSubscriber.selector, storeSubscriber.onChange);
