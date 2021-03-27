import React from 'react';
import { connect } from 'react-redux';
import ProfilePage from '../components/ProfilePage';
import PageLayout from '../../layout/containers/PageLayout';
import { fetchUser } from '../../auth/authActions';

interface ProfilePageContainerProps {
  user: {
    uuid: string;
  };
}

const ProfilePageContainer: React.FC<ProfilePageContainerProps> = (props) => {
  const { user } = props;

  return (
    <PageLayout>
      <ProfilePage user={user} />
    </PageLayout>
  );
};

const mapStateToProps = (state: { [key: string]: any }) => ({
  user: state.auth,
});

export default connect(mapStateToProps, { fetchUser })(ProfilePageContainer);
