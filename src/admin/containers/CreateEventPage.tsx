import React from 'react';
import { connect } from 'react-redux';

import CreateEventPage from '../components/CreateEventPage';
import PageLayout from '../../layout/containers/PageLayout';

const CreateEventPageContainer: React.FC = () => {
  return (
    <PageLayout>
      <CreateEventPage />
    </PageLayout>
  );
};

export default connect(null, {})(CreateEventPageContainer);
