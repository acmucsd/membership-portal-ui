import React, { useEffect, useState } from 'react';

import { fetchCollections } from '../storeActions';
import { PublicMerchCollection } from '../../types';
import { notify } from '../../utils';

import PageLayout from '../../layout/containers/PageLayout';
import AdminQuantitiesPage from '../components/AdminQuantitiesPage';

const AdminQuantitiesPageContainer: React.FC = () => {
  const [collections, setCollections] = useState<PublicMerchCollection[]>();

  useEffect(() => {
    fetchCollections()
      .then((value) => {
        setCollections(value);
      })
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
