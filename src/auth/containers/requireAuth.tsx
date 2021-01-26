import React, { useEffect } from 'react';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';

import { verifyToken } from '../authActions';

const withAuth = (Component: React.FC) => (props: { [key: string]: any }) => {
  const { authenticated, pathname, search } = props;

  useEffect(() => {
    // check if authenticated, if not, then verify the token
    if (!authenticated) {
      props.verify()(search, pathname);
    }
  }, [authenticated, props, search, pathname]);

  if (authenticated) {
    return <Component />;
  }

  // TODO: Make redirecting screen and return that if not authenticated.
  return null;
};

const mapStateToProps = (state: { [key: string]: any }) => ({
  authenticated: state.auth.authenticated,
  pathname: state.router.location.pathname,
  search: state.router.location.search,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  redirectLogin: () => {
    dispatch(replace('/login'));
  },
  verify: () => {
    return verifyToken(dispatch);
  },
});
const requireAuth = compose(connect(mapStateToProps, mapDispatchToProps), withAuth);

export default requireAuth;
