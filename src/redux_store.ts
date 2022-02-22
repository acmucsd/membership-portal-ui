import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';

import createRootReducer from './redux_reducers';

export default function configureStore(preloadedState?: { [key: string]: any }) {
  const store = createStore(
    createRootReducer(), // root reducer with router state
    preloadedState,
    compose(applyMiddleware(thunk)),
  );
  return store;
}
