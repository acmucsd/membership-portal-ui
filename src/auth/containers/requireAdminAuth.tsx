import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import history from '../../history';

import { verifyToken } from '../authActions';

const withAdminAuth = (Component: React.FC) => (props: { [key: string]: any }) => {
  const { authenticated, isAdmin } = props;

  useEffect(() => {
    // check if authenticated, if not, then verify the token
    if (!authenticated) {
      // using then here because state doesn't update in right order
      verifyToken(history.location.search, history.location.pathname)
        .then((data: { [key: string]: any }) => {
          if (!data.admin) {
            // if not an admin, redirect
            history.push('/');
          }
        })
        .catch(() => {});
    } else if (!isAdmin) {
      // if not an admin, redirect
      history.push('/');
    }
  }, [authenticated, isAdmin]);

  // TODO: Make redirecting screen and return that if not authenticated.
  return <Component />;
};

const mapStateToProps = (state: { [key: string]: any }) => ({
  authenticated: state.auth.authenticated,
  isAdmin: state.auth.admin,
});

const requireAdminAuth = compose<React.FC>(connect(mapStateToProps), withAdminAuth);

export default requireAdminAuth;
