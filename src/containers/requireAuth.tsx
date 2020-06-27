import React, { useEffect } from 'react';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';

import { verifyToken } from '../actions/authActions';

const withAuth = (Component: React.FC) => (props: { [key: string]: any }) => {
  useEffect(() => {
    // check if authenticated, if not, then verify the token
    if (!props.authenticated) {
      props.verify()();
    }
  }, []);

  // TODO: Make redirecting screen and return that if not authenticated.
  return <Component />;
};

const mapStateToProps = (state: { [key: string]: any }) => ({
  authenticated: state.auth.authenticated,
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
