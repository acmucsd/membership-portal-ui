import React from 'react';
import { PublicOrderPickupEvent } from '../../../types';
import StoreHeader from '../StoreHeader';

import './style.less';

interface AdminPreparePageProps {
  pickupEvent?: PublicOrderPickupEvent | undefined;
}

const AdminPreparePage: React.FC<AdminPreparePageProps> = (props) => {
  const { pickupEvent } = props;

  return (
    <>
      <StoreHeader breadcrumb breadcrumbLocation="/store/admin" />
      <div className="admin-prepare-page">Admin Prepare Page, pickupEvent={JSON.stringify(pickupEvent)}</div>
    </>
  );
};

export default AdminPreparePage;
