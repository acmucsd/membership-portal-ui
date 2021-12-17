import React from 'react';
import { PublicOrderPickupEvent } from '../../../types';
import StoreHeader from '../StoreHeader';

import './style.less';

interface AdminFulfillPageProps {
  pickupEvent?: PublicOrderPickupEvent | undefined;
}

const AdminFulfillPage: React.FC<AdminFulfillPageProps> = (props) => {
  const { pickupEvent } = props;

  return (
    <>
      <StoreHeader breadcrumb breadcrumbLocation="/store/admin" />
      <div className="admin-fulfill-page">Admin Fulfill Page, pickupEvent={JSON.stringify(pickupEvent)}</div>
    </>
  );
};

export default AdminFulfillPage;
