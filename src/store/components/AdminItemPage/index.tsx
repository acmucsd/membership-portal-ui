import React from 'react';
import { PublicMerchItem } from '../../../types';

import './style.less';

interface AdminItemPageProps {
  item?: PublicMerchItem | undefined;
}

const AdminItemPage: React.FC<AdminItemPageProps> = (props) => {
  const { item } = props;

  return <div className="admin-item-page">Admin Item Page, item={JSON.stringify(item)}</div>;
};

export default AdminItemPage;
