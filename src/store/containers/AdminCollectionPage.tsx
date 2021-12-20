import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchCollection } from '../storeActions';
import { PublicMerchCollection } from '../../types';
import { notify } from '../../utils';

import PageLayout from '../../layout/containers/PageLayout';
import AdminCollectionPage from '../components/AdminCollectionPage';

interface AdminCollectionPageContainerProps {
  fetchCollection: Function;
}

const AdminCollectionPageContainer: React.FC<AdminCollectionPageContainerProps> = (props) => {
  const params: { [key: string]: any } = useParams();
  const { uuid } = params;

  const [collection, setCollection] = useState<PublicMerchCollection>();

  useEffect(() => {
    if (uuid) {
      props
        .fetchCollection(uuid)
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
      <AdminCollectionPage collection={collection} />
    </PageLayout>
  );
};

export default connect(() => ({}), { fetchCollection })(AdminCollectionPageContainer);