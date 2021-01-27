import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import ReactGA from 'react-ga';

import createRootReducer from './redux_reducers';

export const history = createBrowserHistory();
history.listen((location) => ReactGA.pageview(location.pathname));

export default function configureStore(preloadedState?: { [key: string]: any }) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        thunk,
      ),
    ),
  );
  return store;
}
