import React from 'react';
import DiscordPage from '../components/DiscordPage';
import PageLayout from './PageLayout';

const DiscordPageContainer: React.FC = () => {
  return (
    <PageLayout>
      <DiscordPage />
    </PageLayout>
  );
};

export default DiscordPageContainer;
