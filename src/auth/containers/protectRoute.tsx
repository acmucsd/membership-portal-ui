/* eslint-disable react/jsx-props-no-spreading */
import React, { ComponentType, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import history from '../../history';
import PageLayout from '../../layout/containers/PageLayout';
import { useAppDispatch } from '../../redux/store';
import { UserState } from '../../types';
import { notify } from '../../utils';
import { authSelector, verifyToken } from '../authSlice';

export enum WithRouteOptions {
  ADMIN,
  AUTHENTICATED,
  STORE,
}

const redirectHome = (option: WithRouteOptions) => {
  switch (option) {
    case WithRouteOptions.ADMIN: {
      history.replace('/');
      break;
    }
    case WithRouteOptions.STORE: {
      notify('Store Requirement', 'You need a verified account with an @ucsd.edu address to use the store. Visit your profile to update your email.');
      history.replace('/');
      break;
    }
    default:
  }
};

const withRoute = <T extends object>(Component: ComponentType<T>, option: WithRouteOptions) => (props: T) => {
  const {
    authenticated,
    isAdmin,
    profile: { state, email },
  } = useSelector(authSelector);
  const dispatch = useAppDispatch();
  const { search, pathname } = history.location;

  switch (option) {
    case WithRouteOptions.ADMIN: {
      useEffect(() => {
        (async () => {
          // check if authenticated, if not, then verify the token
          if (!authenticated) await dispatch(verifyToken({ search, pathname })).unwrap();

          // if not an admin, redirect
          if (!isAdmin) redirectHome(option);
        })();
      }, [authenticated, dispatch, isAdmin, pathname, search]);

      // TODO: Make redirecting screen and return that if not authenticated.
      return <Component {...props} />;
    }
    case WithRouteOptions.AUTHENTICATED: {
      useEffect(() => {
        // check if authenticated, if not, then verify the token
        if (!authenticated) {
          dispatch(verifyToken({ search, pathname }));
        }
      }, [authenticated, dispatch, pathname, search]);

      if (authenticated) return <Component {...props} />;

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
          if (state === UserState.PENDING || !(emailDomain === 'ucsd.edu' || emailDomain === 'acmucsd.org')) {
            redirectHome(option);
          } else {
            setPermitted(true);
          }
        }
      }, [state, email]);

      if (permitted) return <Component {...props} />;

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

export default withRoute;
