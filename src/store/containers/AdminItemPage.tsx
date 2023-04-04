import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchItem, fetchCollections, deleteItem as deleteItemConnect } from '../storeActions';
import { PublicMerchCollection, PublicMerchItem } from '../../types';
import { notify } from '../../utils';

import PageLayout from '../../layout/containers/PageLayout';
import AdminItemPage from '../components/AdminItemPage';

interface AdminItemPageContainerProps {
  fetchItem: Function;
  fetchCollections: Function;
  deleteItem: Function;
}

const AdminItemPageContainer: React.FC<AdminItemPageContainerProps> = (props) => {
  const params: { [key: string]: any } = useParams();
  const { uuid } = params;
  const { deleteItem, fetchItem: fetchItemFunction, fetchCollections: fetchCollectionsFunction } = props;

  const [item, setItem] = useState<PublicMerchItem>();
  const [collections, setCollections] = useState<PublicMerchCollection[]>([]);

  useEffect(() => {
    fetchCollectionsFunction()
      .then((collection) => {
        setCollections(collection);
        if (uuid) {
          fetchItemFunction(uuid)
            .then((value) => {
              setItem(value);
            })
            .catch((reason) => {
              notify('API Error', reason.message || reason);
            });
        }
      })
      .catch((reason) => {
        notify('API Error', reason.message || reason);
      });
  }, [props, uuid]);

  return (
    <PageLayout>
      <AdminItemPage item={item} collections={collections} deleteItem={deleteItem} />
    </PageLayout>
  );
};

export default connect(() => ({}), { fetchItem, fetchCollections, deleteItem: deleteItemConnect })(AdminItemPageContainer);
