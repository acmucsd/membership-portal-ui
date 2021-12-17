import React from 'react';
import StoreHeader from '../StoreHeader';

import './style.less';

const StoreAdminPage: React.FC = () => {
  return (
    <>
      <StoreHeader title="Diamond Outfitters: Admin Page" />
      <div className="store-admin-page">Store Admin Page</div>
    </>
  );
};

export default StoreAdminPage;
