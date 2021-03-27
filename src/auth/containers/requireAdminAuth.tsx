import React, { useEffect } from 'react';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';

import { verifyToken } from '../authActions';

const withAdminAuth = (Component: React.FC) => (props: { [key: string]: any }) => {
  const { authenticated, verify, redirectHome } = props;

  useEffect(() => {
    // check if authenticated, if not, then verify the token
    if (!authenticated) {
      // using then here because state doesn't update in right order
      verify()()
        .then((data: { [key: string]: any }) => {
          if (!data.admin) {
            // if not an admin, redirect
            redirectHome();
          }
        })
        .catch(() => {});
    }
  }, [authenticated, verify, redirectHome]);

  // TODO: Make redirecting screen and return that if not authenticated.
  return <Component />;
};

const mapStateToProps = (state: { [key: string]: any }) => ({
  authenticated: state.auth.authenticated,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  redirectHome: () => {
    dispatch(replace('/'));
  },
  verify: () => {
    return verifyToken(dispatch);
  },
});
const requireAdminAuth = compose(connect(mapStateToProps, mapDispatchToProps), withAdminAuth);

export default requireAdminAuth;
