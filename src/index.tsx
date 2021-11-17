import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import ReactGA from 'react-ga';
import BreadPage from './layout/components/BreadPage';

import configureStore, { history } from './redux_store';

import './styles/reset.less';
import AboutPage from './layout/containers/AboutPage';

/* Admin Container Pages */
import AdminPage from './admin/containers/AdminPage';
import AwardPointsPage from './admin/containers/AwardPointsPage';
import EditEventPage from './admin/containers/EditEventPage';
import CreateEventPage from './admin/containers/CreateEventPage';
import AddAttendancePage from './admin/containers/AddAttendancePage';

import AuthPage from './auth/containers/AuthPage';
import CheckInHandler from './event/containers/CheckInHandler';
import DiscordPage from './layout/containers/DiscordPage';
import HomePage from './layout/containers/HomePage';
import LeaderPage from './leaderboard/containers/LeaderPage';
import LoginPage from './auth/containers/LoginPage';
import PasswordPage from './auth/containers/PasswordPage';
import ResetPage from './auth/containers/ResetPage';
import ProfilePage from './profile/containers/ProfilePage';
import ProfileUpdatePage from './profile/containers/ProfileUpdatePage';
import RegisterPage from './auth/containers/RegisterPage';
import CartPage from './store/containers/CartPage';
import CheckoutPage from './store/containers/CheckoutPage';
import ItemPage from './store/containers/ItemPage';
import StorePage from './store/containers/StorePage';
import ErrorPage from './layout/containers/ErrorPage';
import EmailVerficationPage from './auth/containers/EmailVerificationPage';
import ResendEmailVerificationPage from './auth/containers/ResendEmailVerificationPage';
import requireAuth from './auth/containers/requireAuth';
import requireAdminAuth from './auth/containers/requireAdminAuth';
import requireStandardAccess from './auth/containers/requireStandardAccess';

const store = configureStore();

const App = () => {
  ReactGA.initialize('UA-165975388-1');
  ReactGA.pageview('/');

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <>
          <Switch>
            <Route exact path="/about" component={requireAuth(AboutPage) as React.FC} />
            <Route exact path="/admin" component={requireAdminAuth(AdminPage) as React.FC} />
            <Route exact path="/admin/editEvent/:uuid" component={requireAdminAuth(EditEventPage) as React.FC} />
            <Route exact path="/admin/awardPoints" component={requireAdminAuth(AwardPointsPage) as React.FC} />
            <Route exact path="/admin/createEvent" component={requireAdminAuth(CreateEventPage) as React.FC} />
            <Route exact path="/admin/addAttendance" component={requireAdminAuth(AddAttendancePage) as React.FC} />
            <Route exact path="/authenticate-email" component={AuthPage} />
            <Route exact path="/bread" component={BreadPage} />
            <Route exact path="/checkin" component={requireAuth(CheckInHandler) as React.FC} />
            <Route exact path="/discord" component={requireAuth(DiscordPage) as React.FC} />
            <Route exact path="/forgot-password" component={PasswordPage} />
            <Route exact path="/leaderboard" component={requireAuth(LeaderPage) as React.FC} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/profile" component={requireAuth(ProfilePage) as React.FC} />
            <Route exact path="/profile/:uuid" component={requireAuth(ProfilePage) as React.FC} />
            <Route exact path="/editProfile" component={requireAuth(ProfileUpdatePage) as React.FC} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/resetPassword/:code" component={ResetPage} />
            <Route exact path="/store/cart" component={requireStandardAccess(requireAuth(CartPage)) as React.FC} />
            <Route exact path="/store/checkout" component={requireStandardAccess(requireAuth(CheckoutPage)) as React.FC} />
            <Route exact path="/store/item/:uuid" component={requireStandardAccess(requireAuth(ItemPage)) as React.FC} />
            <Route exact path="/store" component={requireStandardAccess(requireAuth(StorePage)) as React.FC} />
            <Route exact path="/verifyEmail/:code" component={EmailVerficationPage} />
            <Route exact path="/resendEmailVerification" component={requireAuth(ResendEmailVerificationPage) as React.FC} />
            <Route exact path="/" component={requireAuth(HomePage) as React.FC} />
            <Route path="/" component={requireAuth(ErrorPage) as React.FC} />
          </Switch>
        </>
      </ConnectedRouter>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
