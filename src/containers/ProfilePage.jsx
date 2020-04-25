import React from 'react';
import ProfilePage from '../components/ProfilePage';
import PageLayout from './PageLayout';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/userActions';
const ProfilePageContainer = props => {
  return (
    <PageLayout>
      <ProfilePage user={props.user} />
    </PageLayout>
  );
***REMOVED***
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, { fetchUser })(ProfilePageContainer);
