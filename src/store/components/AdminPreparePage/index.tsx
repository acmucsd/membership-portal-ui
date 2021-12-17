import React from 'react';
import { PublicOrderPickupEvent } from '../../../types';

import './style.less';

interface AdminPreparePageProps {
  pickupEvent?: PublicOrderPickupEvent | undefined;
}

const AdminPreparePage: React.FC<AdminPreparePageProps> = (props) => {
  const { pickupEvent } = props;

  return <div className="admin-prepare-page">Admin Prepare Page, pickupEvent={JSON.stringify(pickupEvent)}</div>;
};

export default AdminPreparePage;
