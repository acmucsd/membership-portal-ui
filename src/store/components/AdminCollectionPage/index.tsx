import React from 'react';
import { PublicMerchCollection } from '../../../types';
import StoreHeader from '../StoreHeader';

import './style.less';

interface AdminCollectionPageProps {
  collection?: PublicMerchCollection | undefined;
}

const AdminCollectionPage: React.FC<AdminCollectionPageProps> = (props) => {
  const { collection } = props;

  return (
    <>
      <StoreHeader breadcrumb breadcrumbLocation="/store" />
      <div className="admin-collection-page">Admin Collection Page, collection={JSON.stringify(collection)}</div>
    </>
  );
};

export default AdminCollectionPage;
