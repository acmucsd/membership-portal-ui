import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PageLayout from './PageLayout';

import ResendEmailVerificationPage from '../components/ResendEmailVerificationPage';

const ResendEmailVerificationContainer = props => {

  return (
    <PageLayout>
      <ResendEmailVerificationPage
        email={props.user.profile.email}
      />
    </PageLayout>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { }
)(ResendEmailVerificationContainer);
