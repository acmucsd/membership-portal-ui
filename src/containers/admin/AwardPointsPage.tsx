import React from 'react';
import { connect } from 'react-redux';

import AwardPointsPage from '../../components/admin/AwardPointsPage';
import PageLayout from '../PageLayout';

const AwardPointsPageContainer: React.FC = () => {
  return (
    <PageLayout>
      <AwardPointsPage />
    </PageLayout>
  );
};

export default connect(null, {})(AwardPointsPageContainer);
