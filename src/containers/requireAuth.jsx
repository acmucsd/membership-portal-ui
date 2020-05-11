import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';
import { notify } from '../utils';

import { verifyToken } from '../actions/authActions';

const withAuth = (Component) => (props) => {
  useEffect(() => {
    // check if authenticated, if not, then verify the token
    if (!props.authenticated) {
      props.verify()();
    }
  }, []);

  // TODO: Make redirecting screen and return that if not authenticated.
  return <Component {...props} />;
};

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
});

const mapDispatchToProps = (dispatch) => ({
  redirectLogin: () => {
    dispatch(replace('/login'));
  },
  verify: () => {
    return verifyToken(dispatch);
  },
});
const requireAuth = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuth
);

export default requireAuth;
