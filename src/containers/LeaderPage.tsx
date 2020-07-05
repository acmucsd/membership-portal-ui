import React from 'react';

import LeaderPage from '../components/LeaderPage';
import PageLayout from './PageLayout';

const LeaderPageContainer: React.FC = () => {
  return (
    <PageLayout>
      <LeaderPage />
    </PageLayout>
  );
};

export default LeaderPageContainer;
