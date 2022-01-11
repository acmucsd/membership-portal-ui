import React from 'react';

import PageLayout from '../../layout/containers/PageLayout';
import StorePage from '../components/StorePage';

const StorePageContainer: React.FC = () => {
  return (
    <PageLayout>
      <StorePage />
    </PageLayout>
  );
};

export default StorePageContainer;
