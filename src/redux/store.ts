import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authSlice from '../auth/authSlice';
import eventSlice from '../event/eventSlice';
import leaderboardSlice from '../leaderboard/leaderboardSlice';
import profileSlice from '../profile/profileSlice';
import storeSlice, { subscriber as storeSubscriber } from '../store/storeSlice';

export const store = configureStore({
  reducer: {
    store: storeSlice,
    auth: authSlice,
    event: eventSlice,
    leaderboard: leaderboardSlice,
    profile: profileSlice,
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
