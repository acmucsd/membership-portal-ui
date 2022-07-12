import React, { useEffect, useState } from 'react';
import { PublicMerchCollection } from '../../api';
import PageLayout from '../../layout/containers/PageLayout';
import { useAppDispatch } from '../../redux/store';
import { notify } from '../../utils';
import AdminQuantitiesPage from '../components/AdminQuantitiesPage';
import { fetchCollections } from '../utils';

const AdminQuantitiesPageContainer: React.FC = () => {
  const [collections, setCollections] = useState<PublicMerchCollection[]>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchCollections()
      .then(setCollections)
      .catch((reason) => {
        notify('API Error', reason.message || reason);
      });
  }, [dispatch]);

  return (
    <PageLayout>
      <AdminQuantitiesPage collections={collections} />
    </PageLayout>
  );
};

export default AdminQuantitiesPageContainer;
