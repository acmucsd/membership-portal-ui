import React, { useEffect, useState } from 'react';
import { PublicMerchCollection } from '../../api';
import PageLayout from '../../layout/containers/PageLayout';
import { notify } from '../../utils';
import AdminQuantitiesPage from '../components/AdminQuantitiesPage';
import { fetchCollections } from '../utils';

const AdminQuantitiesPageContainer: React.FC = () => {
  const [collections, setCollections] = useState<PublicMerchCollection[]>();

  useEffect(() => {
    fetchCollections()
      .then(setCollections)
      .catch((reason) => {
        notify('API Error', reason.message || reason);
      });
  }, []);

  return (
    <PageLayout>
      <AdminQuantitiesPage collections={collections} />
    </PageLayout>
  );
};

export default AdminQuantitiesPageContainer;
