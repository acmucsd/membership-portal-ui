import React, { useEffect } from 'react';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';
import { notify } from '../utils';

const withStandardAccess = (Component: React.FC) => (props: { [key: string]: any }) => {
  useEffect(() => {
    if (props.state === 'PENDING') {
      props.redirectHome();
    }
  }, []);

  // TODO: Make redirecting screen and return that if not authenticated.
  return <Component />;
};

const mapStateToProps = (state: { [key: string]: any }) => ({
  state: state.user.profile.state,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  redirectHome: () => {
    notify('You need to verify your email first before accessing the ACM Store!', '');
    dispatch(replace('/'));
  },
});

const requireStandardAccess = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStandardAccess,
);

export default requireStandardAccess;
