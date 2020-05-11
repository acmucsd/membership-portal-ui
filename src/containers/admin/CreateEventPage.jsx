import React from 'react';
import { connect } from 'react-redux';

import CreateEventPage from '../../components/admin/CreateEventPage';
import PageLayout from '../PageLayout';

const CreateEventPageContainer = () => {
  return (
    <PageLayout>
      <CreateEventPage />
    </PageLayout>
  );
};

export default connect(null, {})(CreateEventPageContainer);
