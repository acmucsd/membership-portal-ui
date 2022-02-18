import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchItem, fetchCollections, deleteItem } from '../storeActions';
import { PublicMerchCollection, PublicMerchItem } from '../../types';
import { notify } from '../../utils';

import PageLayout from '../../layout/containers/PageLayout';
import AdminItemPage from '../components/AdminItemPage';

const AdminItemPageContainer: React.FC = () => {
  const params: { [key: string]: any } = useParams();
  const { uuid } = params;

  const [item, setItem] = useState<PublicMerchItem>();
  const [collections, setCollections] = useState<PublicMerchCollection[]>([]);

  useEffect(() => {
    if (uuid) {
      fetchItem(uuid)
        .then((value) => {
          setItem(value);
        })
        .catch((reason) => {
          notify('API Error', reason.message || reason);
        });
    }

    fetchCollections()
      .then((value) => {
        setCollections(value);
      })
      .catch((reason) => {
        notify('API Error', reason.message || reason);
      });
  }, [uuid]);

  return (
    <PageLayout>
      <AdminItemPage item={item} collections={collections} deleteItem={deleteItem} />
    </PageLayout>
  );
};

export default AdminItemPageContainer;
