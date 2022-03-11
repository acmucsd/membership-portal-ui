import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import history from '../../history';
import PageLayout from '../../layout/containers/PageLayout';
import { UserState } from '../../types';
import { notify } from '../../utils';
import { authSelector } from '../authSlice';

const redirectHome = () => {
  notify('Store Requirement', 'You need a verified account with an @ucsd.edu address to use the store. Visit your profile to update your email.');
  history.replace('/');
};

const withStoreAccess = (Component: React.FC) => () => {
  const {
    profile: { email, state },
  } = useSelector(authSelector);
  const [permitted, setPermitted] = useState(false);

  useEffect(() => {
    const emailDomain = email?.split('@')[1];
    if (email) {
      if (state === UserState.PENDING || !(emailDomain === 'ucsd.edu' || emailDomain === 'acmucsd.org')) {
        redirectHome();
      } else {
        setPermitted(true);
      }
    }
  }, [email, state]);

  // TODO: Make redirecting screen and return that if not authenticated.
  if (permitted) {
    return <Component />;
  }

  return (
    <PageLayout>
      <div />
    </PageLayout>
  );
};

export default withStoreAccess;
