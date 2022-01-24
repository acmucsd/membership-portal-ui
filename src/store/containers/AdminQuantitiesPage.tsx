import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { fetchCollections as fetchCollectionsConnection } from '../storeActions';
import { PublicMerchCollection } from '../../types';
import { notify } from '../../utils';

import PageLayout from '../../layout/containers/PageLayout';
import AdminQuantitiesPage from '../components/AdminQuantitiesPage';

interface AdminQuantitiesPageContainerProps {
  fetchCollections: Function;
}

const AdminQuantitiesPageContainer: React.FC<AdminQuantitiesPageContainerProps> = (props) => {
  const [collections, setCollections] = useState<PublicMerchCollection[]>();

  useEffect(() => {
    props
      .fetchCollections()
      .then((value) => {
        setCollections(value);
      })
      .catch((reason) => {
        notify('API Error', reason.message || reason);
      });
  }, [props]);

  return (
    <PageLayout>
      <AdminQuantitiesPage collections={collections} />
    </PageLayout>
  );
};

export default connect(() => ({}), { fetchCollections: fetchCollectionsConnection })(AdminQuantitiesPageContainer);
