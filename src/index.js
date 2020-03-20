import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore, { history } from './store';

import './styles/reset.less';
import AboutPage from './containers/AboutPage';

/* Admin Container Pages */
import AdminPage from './containers/AdminPage';
import AwardPointsPage from './containers/admin/AwardPointsPage';
import EditEventPage from './containers/EditEventPage';
import CreateEventPage from './containers/admin/CreateEventPage';

import AuthPage from './containers/AuthPage';
import HomePage from './containers/HomePage';
import LeaderPage from './containers/LeaderPage';
import LoginPage from './containers/LoginPage';
import PasswordPage from './containers/PasswordPage';
import ResetPage from './containers/ResetPage';
import ProfilePage from './containers/ProfilePage';
import ProfileUpdatePage from './containers/ProfileUpdatePage';
import RegisterPage from './containers/RegisterPage';
import StorePage from './containers/StorePage';
import requireAuth from './containers/requireAuth';
import requireAdminAuth from './containers/requireAdminAuth';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <>
          <Switch>
            <Route exact path="/about" component={requireAuth(AboutPage)} />
            <Route exact path="/admin" component={requireAdminAuth(AdminPage)} />
            <Route exact path="/admin/editEvent/:uuid" component={requireAdminAuth(EditEventPage)} />
            <Route exact path="/admin/awardPoints" component={requireAdminAuth(AwardPointsPage)} />
            <Route exact path="/admin/createEvent" component={requireAdminAuth(CreateEventPage)} />
            <Route exact path="/authenticate-email" component={AuthPage} />
            <Route exact path="/forgot-password" component={PasswordPage} />
            <Route exact path="/leaderboard" component={requireAuth(LeaderPage)} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/profile" component={requireAuth(ProfilePage)} />
            <Route exact path="/profile/:uuid" component={requireAuth(ProfilePage)} />
            <Route exact path="/editProfile" component={requireAuth(ProfileUpdatePage)} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/resetPassword/:code" component={ResetPage} />
            <Route exact path="/store" component={requireAuth(StorePage)} />
            <Route path="/" component={requireAuth(HomePage)} />
          </Switch>
        </>
      </ConnectedRouter>
    </Provider>
  );
***REMOVED***

ReactDOM.render(<App />, document.getElementById('root'));
