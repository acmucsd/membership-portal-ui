import React from 'react';
import PageLayout from '../../layout/containers/PageLayout';
import AwardPointsPage from '../components/AwardPointsPage';

const AwardPointsPageContainer: React.FC = () => {
  return (
    <PageLayout>
      <AwardPointsPage />
    </PageLayout>
  );
};

export default AwardPointsPageContainer;
