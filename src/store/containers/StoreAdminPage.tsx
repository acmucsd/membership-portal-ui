import React from 'react';

import PageLayout from '../../layout/containers/PageLayout';
import StoreAdminPage from '../components/StoreAdminPage';

const StoreAdminPageContainer: React.FC = () => {
  return (
    <PageLayout>
      <StoreAdminPage />
    </PageLayout>
  );
};

export default StoreAdminPageContainer;
