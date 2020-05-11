import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PageLayout from './PageLayout';

import ResendEmailVerificationPage from '../components/ResendEmailVerificationPage';

const ResendEmailVerificationContainer = (props) => {
  const { user } = props;

  return (
    <PageLayout>
      <ResendEmailVerificationPage email={user.profile.email} />
    </PageLayout>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

ResendEmailVerificationContainer.propTypes = {
  user: PropTypes.shape({
    profile: PropTypes.shape({
      email: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, {})(ResendEmailVerificationContainer);
