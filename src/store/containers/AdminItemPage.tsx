import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PublicMerchCollection, PublicMerchItem } from '../../api';
import PageLayout from '../../layout/containers/PageLayout';
import { useAppDispatch } from '../../redux/store';
import { notify } from '../../utils';
import AdminItemPage from '../components/AdminItemPage';
import { fetchCollections, fetchItem } from '../utils';

interface AdminItemPageContainerProps {
  deleteItem: Function;
}

const AdminItemPageContainer: React.FC<AdminItemPageContainerProps> = (props) => {
  const params: { [key: string]: any } = useParams();
  const { uuid } = params;
  const { deleteItem } = props;

  const [item, setItem] = useState<PublicMerchItem>();
  const [collections, setCollections] = useState<PublicMerchCollection[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (uuid) {
      fetchItem(uuid)
        .then(setItem)
        .catch((reason) => {
          notify('API Error', reason.message || reason);
        });
    }

    fetchCollections()
      .then(setCollections)
      .catch((reason) => {
        notify('API Error', reason.message || reason);
      });
  }, [dispatch, uuid]);

  return (
    <PageLayout>
      <AdminItemPage item={item} collections={collections} deleteItem={deleteItem} />
    </PageLayout>
  );
};

export default AdminItemPageContainer;
