import React from 'react';
import HomePage from '../components/HomePage';
import PageLayout from './PageLayout';

const HomePageContainer: React.FC = () => {
  return (
    <PageLayout>
      <HomePage />
    </PageLayout>
  );
};

export default HomePageContainer;
