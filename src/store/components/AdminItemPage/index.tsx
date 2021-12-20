import React from 'react';
import { PublicMerchItem } from '../../../types';
import StoreHeader from '../StoreHeader';

import './style.less';

interface AdminItemPageProps {
  item?: PublicMerchItem | undefined;
}

const AdminItemPage: React.FC<AdminItemPageProps> = (props) => {
  const { item } = props;

  return (
    <>
      <StoreHeader breadcrumb breadcrumbLocation="/store" />
      <div className="admin-item-page">Admin Item Page, item={JSON.stringify(item)}</div>
    </>
  );
};

export default AdminItemPage;
