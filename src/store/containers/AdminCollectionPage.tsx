import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchCollection, deleteCollection } from '../storeActions';
import { PublicMerchCollection } from '../../types';
import { notify } from '../../utils';

import PageLayout from '../../layout/containers/PageLayout';
import AdminCollectionPage from '../components/AdminCollectionPage';

const AdminCollectionPageContainer: React.FC = () => {
  const params: { [key: string]: any } = useParams();
  const { uuid } = params;

  const [collection, setCollection] = useState<PublicMerchCollection>();

  useEffect(() => {
    if (uuid) {
      fetchCollection(uuid)
        .then((value) => {
          setCollection(value);
        })
        .catch((reason) => {
          notify('API Error', reason.message || reason);
        });
    }
  }, [uuid]);

  return (
    <PageLayout>
      <AdminCollectionPage collection={collection} deleteCollection={deleteCollection} />
    </PageLayout>
  );
};

export default AdminCollectionPageContainer;
