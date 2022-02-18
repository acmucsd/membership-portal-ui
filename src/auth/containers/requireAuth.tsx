import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import history from '../../history';

import { verifyToken } from '../authActions';

const withAuth = (Component: React.FC) => (props: { [key: string]: any }) => {
  const { authenticated, verify } = props;

  useEffect(() => {
    // check if authenticated, if not, then verify the token
    if (!authenticated) {
      verifyToken(history.location.search, history.location.pathname);
    }
  }, [authenticated, verify]);

  if (authenticated) {
    return <Component />;
  }

  // TODO: Make redirecting screen and return that if not authenticated.
  return null;
};

const mapStateToProps = (state: { [key: string]: any }) => ({
  authenticated: state.auth.authenticated,
});

const requireAuth = compose<React.FC>(connect(mapStateToProps), withAuth);

export default requireAuth;
