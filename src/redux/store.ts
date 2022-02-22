import { configureStore } from '@reduxjs/toolkit';
import storeSlice, { subscriber as storeSubscriber } from '../store/storeSlice';

export const store = configureStore({
  reducer: {
    store: storeSlice,
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
