import React from 'react';
import PageLayout from '../../layout/containers/PageLayout';
import ProfilePage from '../components/ProfilePage';

const ProfilePageContainer: React.FC = () => {
  return (
    <PageLayout>
      <ProfilePage />
    </PageLayout>
  );
};

export default ProfilePageContainer;
