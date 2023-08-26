import React, { useEffect, useState } from 'react';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';

import { notify } from '../../utils';
import { verifyToken } from '../authActions';
import PageLayout from '../../layout/containers/PageLayout';
import { UserState } from '../../types';

export enum WithRouteOptions {
  ADMIN,
  AUTHENTICATED,
  STORE,
}

const withRoute = (Component: React.FC, option: WithRouteOptions, rejectRoute: string) => (props: { [key: string]: any }) => {
  const { authenticated, pathname, search, verify, redirect, isAdmin, state, email } = props;
  switch (option) {
    case WithRouteOptions.ADMIN: {
      useEffect(() => {
        // check if authenticated, if not, then verify the token
        if (!authenticated) {
          // using then here because state doesn't update in right order
          verify()(search, pathname)
            .then((data: { [key: string]: any }) => {
              if (!data.admin) {
                // if not an admin, redirect
                redirect(rejectRoute);
              }
            })
            .catch(() => {});
        } else if (!isAdmin) {
          // if not an admin, redirect
          redirect(rejectRoute);
        }
      }, [authenticated, isAdmin, verify, redirect, search, pathname]);

      // TODO: Make redirecting screen and return that if not authenticated.
      return <Component />;
    }
    case WithRouteOptions.AUTHENTICATED: {
      useEffect(() => {
        // check if authenticated, if not, then verify the token
        if (!authenticated) {
          verify()(search, pathname);
        }
      }, [authenticated, verify, search, pathname]);

      if (authenticated) {
        return <Component />;
      }

      // TODO: Make redirecting screen and return that if not authenticated.
      return (
        <PageLayout>
          <div />
        </PageLayout>
      );
    }
    case WithRouteOptions.STORE: {
      const [permitted, setPermitted] = useState(false);
      useEffect(() => {
        const emailDomain = email?.split('@')[1];
        if (email) {
          if (state === UserState.PENDING || !(emailDomain === 'ucsd.edu' || emailDomain === 'sdsu.edu' || emailDomain === 'berkeley.edu' || emailDomain === 'stanford.edu' || emailDomain === 'mit.edu' || emailDomain === 'ucla.edu' || emailDomain === 'acmucsd.org')) {
            notify(
              'Store Requirement',
              'You need a verified account with an @ucsd.edu address (or from a better school) to use the store. Visit your profile to update your email.',
            );
            redirect(rejectRoute);
          } else {
            setPermitted(true);
          }
        }
      }, [state, email, redirect]);
      if (permitted) {
        return <Component />;
      }

      return (
        <PageLayout>
          <div />
        </PageLayout>
      );
    }
    default:
      return (
        <PageLayout>
          <div />
        </PageLayout>
      );
  }
};

const mapStateToProps = (state: { [key: string]: any }) => ({
  authenticated: state.auth.authenticated,
  pathname: state.router.location.pathname,
  search: state.router.location.search,
  isAdmin: state.auth.admin,
  state: state.auth.profile.state,
  email: state.auth.profile.email,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  redirect: (rejectRoute: string) => {
    dispatch(replace(rejectRoute));
  },
  verify: () => {
    return verifyToken(dispatch);
  },
});

const protectRoute = compose<React.FC>(connect(mapStateToProps, mapDispatchToProps), withRoute);

export default protectRoute;
