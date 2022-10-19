import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchCollection, deleteCollection as deleteCollectionConnect } from '../storeActions';
import { PublicMerchCollection } from '../../types';
import { notify } from '../../utils';

import PageLayout from '../../layout/containers/PageLayout';
import AdminCollectionPage from '../components/AdminCollectionPage';

interface AdminCollectionPageContainerProps {
  fetchCollection: Function;
  deleteCollection: Function;
}

const AdminCollectionPageContainer: React.FC<AdminCollectionPageContainerProps> = (props) => {
  const params: { [key: string]: any } = useParams();
  const { uuid } = params;
  const { deleteCollection, fetchCollection: fetchCollectionFunction } = props;

  const [collection, setCollection] = useState<PublicMerchCollection>();

  useEffect(() => {
    if (uuid) {
      fetchCollectionFunction(uuid)
        .then((value) => {
          setCollection(value);
        })
        .catch((reason) => {
          notify('API Error', reason.message || reason);
        });
    }
  }, [props, uuid]);

  return (
    <PageLayout>
      <AdminCollectionPage collection={collection} deleteCollection={deleteCollection} />
    </PageLayout>
  );
};

export default connect(() => ({}), { fetchCollection, deleteCollection: deleteCollectionConnect })(AdminCollectionPageContainer);
