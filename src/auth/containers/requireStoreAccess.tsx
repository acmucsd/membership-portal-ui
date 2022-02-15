import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { notify } from '../../utils';
import PageLayout from '../../layout/containers/PageLayout';
import { UserState } from '../../types';
import history from '../../history';

const withStoreAccess = (Component: React.FC) => (props: { [key: string]: any }) => {
  const { state, redirectHome, email } = props;

  const [permitted, setPermitted] = useState(false);

  useEffect(() => {
    const emailDomain = email?.split('@')[1];
    if (email) {
      if (state === UserState.PENDING || !(emailDomain === 'ucsd.edu' || emailDomain === 'acmucsd.org')) {
        notify(
          'Store Requirement',
          'You need a verified account with an @ucsd.edu address to use the store. Visit your profile to update your email.',
        );
        history.replace('/');
      } else {
        setPermitted(true);
      }
    }
  }, [state, email, redirectHome]);

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

const mapStateToProps = (state: { [key: string]: any }) => ({
  state: state.auth.profile.state,
  email: state.auth.profile.email,
});

const requireStoreAccess = compose<React.FC>(connect(mapStateToProps), withStoreAccess);

export default requireStoreAccess;
