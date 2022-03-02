import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import history from '../../history';
import { useAppDispatch } from '../../redux/store';
import { authSelector, verifyToken } from '../authSlice';

const redirectHome = () => history.replace('/');

const withAdminAuth = (Component: React.FC) => () => {
  const { isAdmin, authenticated } = useSelector(authSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      // check if authenticated, if not, then verify the token
      if (!authenticated) {
        const { search, pathname } = history.location;
        await dispatch(verifyToken({ search, pathname }));
      }

      // if not an admin, redirect
      if (!isAdmin) {
        redirectHome();
      }
    })();
  }, [authenticated, dispatch, isAdmin]);

  // TODO: Make redirecting screen and return that if not authenticated.
  return <Component />;
};

export default withAdminAuth;
