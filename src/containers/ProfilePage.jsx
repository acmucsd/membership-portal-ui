import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfilePage from '../components/ProfilePage';
import PageLayout from './PageLayout';
import { fetchUser } from '../actions/userActions';

const ProfilePageContainer = (props) => {
  const { user } = props;

  return (
    <PageLayout>
      <ProfilePage user={user} />
    </PageLayout>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

ProfilePageContainer.propTypes = {
  user: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, { fetchUser })(ProfilePageContainer);
