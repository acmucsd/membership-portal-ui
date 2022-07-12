import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PublicMerchCollection } from '../../api';
import PageLayout from '../../layout/containers/PageLayout';
import { useAppDispatch } from '../../redux/store';
import { notify } from '../../utils';
import AdminCollectionPage from '../components/AdminCollectionPage';
import { deleteCollection, fetchCollection } from '../utils';

interface AdminCollectionPageContainerProps {}

const AdminCollectionPageContainer: React.FC<AdminCollectionPageContainerProps> = () => {
  const params: { [key: string]: any } = useParams();
  const { uuid } = params;

  const [collection, setCollection] = useState<PublicMerchCollection>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (uuid) {
      fetchCollection(uuid)
        .then(setCollection)
        .catch((reason) => {
          notify('API Error', reason.message || reason);
        });
    }
  }, [dispatch, uuid]);

  return (
    <PageLayout>
      <AdminCollectionPage collection={collection} deleteCollection={deleteCollection} />
    </PageLayout>
  );
};

export default AdminCollectionPageContainer;
