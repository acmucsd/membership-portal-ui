import React from 'react';
import AboutPage from '../components/AboutPage';
import PageLayout from './PageLayout';

const AboutPageContainer: React.FC = () => {
  return (
    <PageLayout>
      <AboutPage />
    </PageLayout>
  );
};

export default AboutPageContainer;
