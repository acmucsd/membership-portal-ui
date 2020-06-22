import React from 'react';
import { connect } from 'react-redux';
import ProfilePage from '../components/ProfilePage';
import PageLayout from './PageLayout';
import { fetchUser } from '../actions/userActions';

interface ProfilePageContainerProps {
  user: {
    uuid: string,
  },
};

const ProfilePageContainer: React.FC<ProfilePageContainerProps> = (props) => {
  const { user } = props;

  return (
    <PageLayout>
      <ProfilePage user={user} />
    </PageLayout>
  );
};

const mapStateToProps = (state: {[key: string]: any}) => ({
  user: state.user,
});

export default connect(mapStateToProps, { fetchUser })(ProfilePageContainer);
