import React from 'react';

import AwardPointsPage from '../components/AwardPointsPage';
import PageLayout from '../../layout/containers/PageLayout';

const AwardPointsPageContainer: React.FC = () => {
  return (
    <PageLayout>
      <AwardPointsPage />
    </PageLayout>
  );
};

export default AwardPointsPageContainer;
