import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore, { history } from './store';

import './styles/reset.less';
import AboutPage from './containers/AboutPage';
import HomePage from './containers/HomePage';
import LeaderPage from './containers/LeaderPage';
import LoginPage from './containers/LoginPage';
import StorePage from './containers/StorePage';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/about" component={AboutPage} />
            <Route exact path="/leaderboard" component={LeaderPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/store" component={StorePage} />
          </Switch>
        </>
      </ConnectedRouter>
    </Provider>
  );
***REMOVED***

ReactDOM.render(<App />, document.getElementById('root'));
