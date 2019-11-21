import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore, { history } from './store';

import './styles/reset.less';
import AboutPage from './containers/AboutPage';
import AdminPage from './containers/AdminPage';
import AuthPage from './containers/AuthPage';
import HomePage from './containers/HomePage';
import LeaderPage from './containers/LeaderPage';
import LoginPage from './containers/LoginPage';
import PasswordPage from './containers/PasswordPage';
import ResetPage from './containers/ResetPage';
import ProfilePage from './containers/ProfilePage';
import RegisterPage from './containers/RegisterPage';
import StorePage from './containers/StorePage';
import requireAuth from './containers/requireAuth';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <>
        <Switch>
          <Route exact path="/about" component={requireAuth(AboutPage)} />
          <Route exact path="/admin" component={requireAuth(AdminPage)} />
          <Route exact path="/authenticate-email" component={AuthPage} />
          <Route exact path="/forgot-password" component={PasswordPage} />
          <Route exact path="/leaderboard" component={requireAuth(LeaderPage)} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/profile" component={requireAuth(ProfilePage)} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/resetPassword/:code" component={ResetPage} />
          <Route exact path="/store" component={requireAuth(StorePage)} />
          <Route path="/" component={requireAuth(HomePage)} />
        </Switch>
      </>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
