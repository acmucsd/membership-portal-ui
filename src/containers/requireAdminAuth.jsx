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

      // using then here because state doesn't update in right order
      props.verify()().then((data) => {
        if (!data.admin) {
          // if not an admin, redirect
          props.redirectHome();
        }
***REMOVED***.catch((error) => {

***REMOVED***
    }
  }, []);

  // TODO: Make redirecting screen and return that if not authenticated.
  return <Component {...props} />;
***REMOVED***

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
});

const mapDispatchToProps = dispatch => ({
  redirectHome: () => {
    dispatch(replace('/'));
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
