import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import AwardPointsPage from '../../components/admin/AwardPointsPage';
import PageLayout from '../PageLayout';

const AwardPointsPageContainer = props => {
  return (
    <PageLayout>
      <AwardPointsPage />
    </PageLayout>
  );
};

export default connect(
  null,
  {}
)(AwardPointsPageContainer);
