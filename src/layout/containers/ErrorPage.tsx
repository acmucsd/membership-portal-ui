import React from 'react';
import ErrorPage from '../components/ErrorPage';
import PageLayout from './PageLayout';

const ErrorPageContainer: React.FC = () => {
  return (
    <PageLayout>
      <ErrorPage />
    </PageLayout>
  );
};

export default ErrorPageContainer;
