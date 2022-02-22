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
import requireStoreAccess from './auth/containers/requireStoreAccess';
import OrderPage from './store/containers/OrderPage';
import OrdersPage from './store/containers/OrdersPage';
import StoreAdminPage from './store/containers/StoreAdminPage';
import AdminCollectionPage from './store/containers/AdminCollectionPage';
import AdminItemPage from './store/containers/AdminItemPage';
import AdminPreparePage from './store/containers/AdminPreparePage';
import AdminFulfillPage from './store/containers/AdminFulfillPage';
import AdminQuantitiesPage from './store/containers/AdminQuantitiesPage';
import AdminPickupPage from './store/containers/AdminPickupPage';

import ThemeProvider from './styles/ThemeContext/themeProvider';

const store = configureStore();

const App = () => {
  ReactGA.initialize('UA-165975388-1');
  ReactGA.pageview('/');

  return (
    <div>
      <Provider store={store}>
        <ThemeProvider>
          <ConnectedRouter history={history}>
            <Switch>
              <Route exact path="/about" component={requireAuth(AboutPage)} />
              <Route exact path="/admin" component={requireAdminAuth(AdminPage)} />
              <Route exact path="/admin/editEvent/:uuid" component={requireAuth(EditEventPage)} />
              <Route exact path="/admin/awardPoints" component={requireAdminAuth(AwardPointsPage)} />
              <Route exact path="/admin/createEvent" component={requireAuth(CreateEventPage)} />
              <Route exact path="/admin/addAttendance" component={requireAuth(AddAttendancePage)} />
              <Route exact path="/authenticate-email" component={AuthPage} />
              <Route exact path="/bread" component={BreadPage} />
              <Route exact path="/checkin" component={requireAuth(CheckInHandler)} />
              <Route exact path="/discord" component={requireAuth(DiscordPage)} />
              <Route exact path="/forgot-password" component={PasswordPage} />
              <Route exact path="/leaderboard" component={requireAuth(LeaderPage)} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/profile" component={requireAuth(ProfilePage)} />
              <Route exact path="/profile/:uuid" component={requireAuth(ProfilePage)} />
              <Route exact path="/editProfile" component={requireAuth(ProfileUpdatePage)} />
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/resetPassword/:code" component={ResetPage} />
              <Route exact path="/store" component={requireAuth(requireStoreAccess(StorePage))} />
              <Route exact path="/store/item/:uuid" component={requireAuth(requireStoreAccess(ItemPage))} />
              <Route exact path="/store/cart" component={requireAuth(requireStoreAccess(CartPage))} />
              <Route exact path="/store/checkout" component={requireAuth(requireStoreAccess(CheckoutPage))} />
              <Route exact path="/store/order/:uuid" component={requireAuth(requireStoreAccess(OrderPage))} />
              <Route exact path="/store/orders" component={requireAuth(requireStoreAccess(OrdersPage))} />
              <Route exact path="/store/admin" component={requireStoreAccess(StoreAdminPage)} />
              <Route exact path="/store/admin/collection" component={requireStoreAccess(AdminCollectionPage)} />
              <Route exact path="/store/admin/collection/:uuid" component={requireStoreAccess(AdminCollectionPage)} />
              <Route exact path="/store/admin/item" component={requireStoreAccess(AdminItemPage)} />
              <Route exact path="/store/admin/item/:uuid" component={requireStoreAccess(AdminItemPage)} />
              <Route exact path="/store/admin/pickup" component={requireStoreAccess(AdminPickupPage)} />
              <Route exact path="/store/admin/pickup/:uuid" component={requireStoreAccess(AdminPickupPage)} />
              <Route exact path="/store/admin/prepare" component={requireStoreAccess(AdminPreparePage)} />
              <Route exact path="/store/admin/prepare/:uuid" component={requireStoreAccess(AdminPreparePage)} />
              <Route exact path="/store/admin/fulfill" component={requireStoreAccess(AdminFulfillPage)} />
              <Route exact path="/store/admin/fulfill/:uuid" component={requireStoreAccess(AdminFulfillPage)} />
              <Route exact path="/store/admin/quantities" component={requireStoreAccess(AdminQuantitiesPage)} />
              <Route exact path="/verifyEmail/:code" component={EmailVerficationPage} />
              <Route exact path="/resendEmailVerification" component={requireAuth(ResendEmailVerificationPage)} />
              <Route exact path="/" component={requireAuth(HomePage)} />
              <Route path="/" component={requireAuth(ErrorPage)} />
            </Switch>
          </ConnectedRouter>
        </ThemeProvider>
      </Provider>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
