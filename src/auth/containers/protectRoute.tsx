/* eslint-disable react/jsx-props-no-spreading */
import React, { ComponentType, useContext, useEffect, useState } from 'react';
import { UserAccessType, UserState } from '../../api';
import { AppContext } from '../../context';
import history from '../../history';
import PageLayout from '../../layout/containers/PageLayout';
import { notify } from '../../utils';
import { verifyToken } from '../utils';

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
  const { authenticated, user: { accessType, email, state  } } = useContext(AppContext);
  
  const { search, pathname } = history.location;

  switch (option) {
    case WithRouteOptions.ADMIN: {
      useEffect(() => {
        (async () => {
          // check if authenticated, if not, then verify the token
          if (!authenticated) await verifyToken(search, pathname);

          // if not an admin, redirect
          if (accessType !== UserAccessType.ADMIN) redirectHome(option);
        })();
      }, [authenticated, pathname, search]);

      // TODO: Make redirecting screen and return that if not authenticated.
      return <Component {...props} />;
    }
    case WithRouteOptions.AUTHENTICATED: {
      useEffect(() => {
        // check if authenticated, if not, then verify the token
        if (!authenticated) {
          verifyToken(search, pathname);
        }
      }, [authenticated, pathname, search]);

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
