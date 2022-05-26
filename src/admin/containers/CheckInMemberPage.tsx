import React from 'react';
import { connect } from 'react-redux';

import PageLayout from '../../layout/containers/PageLayout';
import EventSelectPage from '../components/EventSelectPage';

const CheckInMemberPageContainer: React.FC = () => {
  return (
    <PageLayout>
      <EventSelectPage />
    </PageLayout>
  );
};

export default connect(null, {})(CheckInMemberPageContainer);
