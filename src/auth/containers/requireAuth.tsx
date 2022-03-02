/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import history from '../../history';
import { useAppDispatch } from '../../redux/store';
import { authSelector, verifyToken } from '../authSlice';

const withAuth =
  <T,>(Component: React.ComponentType<T>) =>
  (props: T) => {
    const { authenticated } = useSelector(authSelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
      // check if authenticated, if not, then verify the token
      if (!authenticated) {
        const { search, pathname } = history.location;
        dispatch(verifyToken({ search, pathname }));
      }
    }, [authenticated, dispatch]);

    if (authenticated) {
      return <Component {...props} />;
    }

    // TODO: Make redirecting screen and return that if not authenticated.
    return null;
  };

export default withAuth;
