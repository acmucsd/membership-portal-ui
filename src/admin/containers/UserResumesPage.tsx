// user resumes page container to be imported in index.tsx
import React from 'react';
import { connect } from 'react-redux';

import UserResumesPage from '../components/UserResumesPage';
import PageLayout from '../../layout/containers/PageLayout';

const UserResumesPageContainer: React.FC = () => {
  return (
    <PageLayout>
      <UserResumesPage />
    </PageLayout>
  );
};

export default connect(null, {})(UserResumesPageContainer);
