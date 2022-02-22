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
  const { deleteItem } = props;

  const [item, setItem] = useState<PublicMerchItem>();
  const [collections, setCollections] = useState<PublicMerchCollection[]>([]);

  useEffect(() => {
    if (uuid) {
      props
        .fetchItem(uuid)
        .then((value) => {
          setItem(value);
        })
        .catch((reason) => {
          notify('API Error', reason.message || reason);
        });
    }

    props
      .fetchCollections()
      .then((value) => {
        setCollections(value);
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

export default connect(null, { fetchItem, fetchCollections, deleteItem: deleteItemConnect })(AdminItemPageContainer);
