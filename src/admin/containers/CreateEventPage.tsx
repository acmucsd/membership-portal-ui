import React from 'react';
import PageLayout from '../../layout/containers/PageLayout';
import CreateEventPage from '../components/CreateEventPage';

const CreateEventPageContainer: React.FC = () => {
  return (
    <PageLayout>
      <CreateEventPage />
    </PageLayout>
  );
};

export default CreateEventPageContainer;
