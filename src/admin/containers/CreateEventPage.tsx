import React from 'react';

import CreateEventPage from '../components/CreateEventPage';
import PageLayout from '../../layout/containers/PageLayout';

const CreateEventPageContainer: React.FC = () => {
  return (
    <PageLayout>
      <CreateEventPage />
    </PageLayout>
  );
};

export default CreateEventPageContainer;
