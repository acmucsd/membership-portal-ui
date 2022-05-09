import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { Route, Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import './styles/reset.less';

/* Admin Container Pages */
import AddAttendancePage from './admin/containers/AddAttendancePage';
import AdminPage from './admin/containers/AdminPage';
import AwardPointsPage from './admin/containers/AwardPointsPage';
import CreateEventPage from './admin/containers/CreateEventPage';
import EditEventPage from './admin/containers/EditEventPage';
import AuthPage from './auth/containers/AuthPage';
import EmailVerficationPage from './auth/containers/EmailVerificationPage';
import LoginPage from './auth/containers/LoginPage';
import PasswordPage from './auth/containers/PasswordPage';
import protectRoute, { WithRouteOptions } from './auth/containers/protectRoute';
import RegisterPage from './auth/containers/RegisterPage';
import ResendEmailVerificationPage from './auth/containers/ResendEmailVerificationPage';
import ResetPage from './auth/containers/ResetPage';
import CheckInHandler from './event/containers/CheckInHandler';
import history from './history';
import BreadPage from './layout/components/BreadPage';
import AboutPage from './layout/containers/AboutPage';
import DiscordPage from './layout/containers/DiscordPage';
import ErrorPage from './layout/containers/ErrorPage';
import HomePage from './layout/containers/HomePage';
import LeaderPage from './leaderboard/containers/LeaderPage';
import ProfilePage from './profile/containers/ProfilePage';
import ProfileUpdatePage from './profile/containers/ProfileUpdatePage';
import { store } from './redux/store';
import AdminCollectionPage from './store/containers/AdminCollectionPage';
import AdminFulfillPage from './store/containers/AdminFulfillPage';
import AdminItemPage from './store/containers/AdminItemPage';
import AdminPickupPage from './store/containers/AdminPickupPage';
import AdminPreparePage from './store/containers/AdminPreparePage';
import AdminQuantitiesPage from './store/containers/AdminQuantitiesPage';
import CartPage from './store/containers/CartPage';
import CheckoutPage from './store/containers/CheckoutPage';
import ItemPage from './store/containers/ItemPage';
import OrderPage from './store/containers/OrderPage';
import OrdersPage from './store/containers/OrdersPage';
import StoreAdminPage from './store/containers/StoreAdminPage';
import StorePage from './store/containers/StorePage';

import ThemeProvider from './styles/ThemeContext/themeProvider';

const App = () => {
  ReactGA.initialize('UA-165975388-1');
  ReactGA.pageview('/');

  return (
    <Provider store={store}>
      <MantineProvider>
        <NotificationsProvider>
          <ThemeProvider>
            <Router history={history}>
              <Switch>
                <Route exact path="/about" component={protectRoute(AboutPage, WithRouteOptions.AUTHENTICATED)} />
                <Route exact path="/admin" component={protectRoute(AdminPage, WithRouteOptions.ADMIN)} />
                <Route exact path="/admin/editEvent/:uuid" component={protectRoute(EditEventPage, WithRouteOptions.AUTHENTICATED)} />
                <Route exact path="/admin/awardPoints" component={protectRoute(AwardPointsPage, WithRouteOptions.ADMIN)} />
                <Route exact path="/admin/createEvent" component={protectRoute(CreateEventPage, WithRouteOptions.AUTHENTICATED)} />
                <Route exact path="/admin/addAttendance" component={protectRoute(AddAttendancePage, WithRouteOptions.AUTHENTICATED)} />
                <Route exact path="/authenticate-email" component={AuthPage} />
                <Route exact path="/bread" component={BreadPage} />
                <Route exact path="/checkin" component={protectRoute(CheckInHandler, WithRouteOptions.AUTHENTICATED)} />
                <Route exact path="/discord" component={protectRoute(DiscordPage, WithRouteOptions.AUTHENTICATED)} />
                <Route exact path="/forgot-password" component={PasswordPage} />
                <Route exact path="/leaderboard" component={protectRoute(LeaderPage, WithRouteOptions.AUTHENTICATED)} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/profile" component={protectRoute(ProfilePage, WithRouteOptions.AUTHENTICATED)} />
                <Route exact path="/profile/:uuid" component={protectRoute(ProfilePage, WithRouteOptions.AUTHENTICATED)} />
                <Route exact path="/editProfile" component={protectRoute(ProfileUpdatePage, WithRouteOptions.AUTHENTICATED)} />
                <Route exact path="/register" component={RegisterPage} />
                <Route exact path="/resetPassword/:code" component={ResetPage} />
                <Route
                  exact
                  path="/store"
                  component={protectRoute(protectRoute(StorePage, WithRouteOptions.STORE), WithRouteOptions.AUTHENTICATED)}
                />
                <Route
                  exact
                  path="/store/item/:uuid"
                  component={protectRoute(protectRoute(ItemPage, WithRouteOptions.STORE), WithRouteOptions.AUTHENTICATED)}
                />
                <Route
                  exact
                  path="/store/cart"
                  component={protectRoute(protectRoute(CartPage, WithRouteOptions.STORE), WithRouteOptions.AUTHENTICATED)}
                />
                <Route
                  exact
                  path="/store/checkout"
                  component={protectRoute(protectRoute(CheckoutPage, WithRouteOptions.STORE), WithRouteOptions.AUTHENTICATED)}
                />
                <Route
                  exact
                  path="/store/order/:uuid"
                  component={protectRoute(protectRoute(OrderPage, WithRouteOptions.STORE), WithRouteOptions.AUTHENTICATED)}
                />
                <Route
                  exact
                  path="/store/orders"
                  component={protectRoute(protectRoute(OrdersPage, WithRouteOptions.STORE), WithRouteOptions.AUTHENTICATED)}
                />
                <Route exact path="/store/admin" component={protectRoute(StoreAdminPage, WithRouteOptions.STORE)} />
                <Route exact path="/store/admin/collection" component={protectRoute(AdminCollectionPage, WithRouteOptions.STORE)} />
                <Route exact path="/store/admin/collection/:uuid" component={protectRoute(AdminCollectionPage, WithRouteOptions.STORE)} />
                <Route exact path="/store/admin/item" component={protectRoute(AdminItemPage, WithRouteOptions.STORE)} />
                <Route exact path="/store/admin/item/:uuid" component={protectRoute(AdminItemPage, WithRouteOptions.STORE)} />
                <Route exact path="/store/admin/pickup" component={protectRoute(AdminPickupPage, WithRouteOptions.STORE)} />
                <Route exact path="/store/admin/pickup/:uuid" component={protectRoute(AdminPickupPage, WithRouteOptions.STORE)} />
                <Route exact path="/store/admin/prepare" component={protectRoute(AdminPreparePage, WithRouteOptions.STORE)} />
                <Route exact path="/store/admin/prepare/:uuid" component={protectRoute(AdminPreparePage, WithRouteOptions.STORE)} />
                <Route exact path="/store/admin/fulfill" component={protectRoute(AdminFulfillPage, WithRouteOptions.STORE)} />
                <Route exact path="/store/admin/fulfill/:uuid" component={protectRoute(AdminFulfillPage, WithRouteOptions.STORE)} />
                <Route exact path="/store/admin/quantities" component={protectRoute(AdminQuantitiesPage, WithRouteOptions.STORE)} />
                <Route exact path="/verifyEmail/:code" component={EmailVerficationPage} />
                <Route exact path="/resendEmailVerification" component={protectRoute(ResendEmailVerificationPage, WithRouteOptions.AUTHENTICATED)} />
                <Route exact path="/" component={protectRoute(HomePage, WithRouteOptions.AUTHENTICATED)} />
                <Route path="/" component={protectRoute(ErrorPage, WithRouteOptions.AUTHENTICATED)} />
              </Switch>
            </Router>
          </ThemeProvider>
        </NotificationsProvider>
      </MantineProvider>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
