import React, { useEffect, useState } from 'react';
import PageLayout from '../../layout/containers/PageLayout';
import { useAppDispatch } from '../../redux/store';
import { PublicMerchCollection } from '../../types';
import { notify } from '../../utils';
import AdminQuantitiesPage from '../components/AdminQuantitiesPage';
import { fetchCollections } from '../storeSlice';

const AdminQuantitiesPageContainer: React.FC = () => {
  const [collections, setCollections] = useState<PublicMerchCollection[]>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCollections())
      .unwrap()
      .then((value) => {
        setCollections(value);
      })
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
