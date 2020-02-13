import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';
import { notify } from '../utils';

import { verifyToken } from '../actions/authActions';

const withAdminAuth = Component => props => {
  useEffect(() => {
    // check if authenticated, if not, then verify the token
    if (!props.authenticated) {
      props.verify()().then((data) => {
        console.log(data);
        console.log(props.state)
        if (!props.isAdmin) {
          // if not an admin, redirect
          console.log("NOT ADMIN");
          //dispatch(replace('/'));
        }
      }).catch((error) => {

      })
    }
  });

  // TODO: Make redirecting screen and return that if not authenticated.
  return <Component {...props} />;
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  isAdmin: state.auth.isAdmin,
  state: state
});

const mapDispatchToProps = dispatch => ({
  redirectLogin: () => {
    dispatch(replace('/login'));
  },
  verify: () => {
    return verifyToken(dispatch);
  }
});
const requireAdminAuth = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAdminAuth
)

export default requireAdminAuth;
