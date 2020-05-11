import React from 'react';
import { connect } from 'react-redux';
import ProfilePage from '../components/ProfilePage';
import PageLayout from './PageLayout';
import { fetchUser } from '../actions/userActions';

const ProfilePageContainer = (props) => {
  return (
    <PageLayout>
      <ProfilePage user={props.user} />
    </PageLayout>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { fetchUser })(ProfilePageContainer);
