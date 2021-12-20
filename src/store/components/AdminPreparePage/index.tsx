import React, { useState } from 'react';

import { PublicOrderPickupEvent } from '../../../types';

import StoreButton from '../StoreButton';
import StoreDropdown from '../StoreDropdown';
import StoreHeader from '../StoreHeader';

import './style.less';

interface AdminPreparePageProps {
  pickupEvent?: PublicOrderPickupEvent | undefined;
  pickupEvents: PublicOrderPickupEvent[] | undefined;
}

const AdminPreparePage: React.FC<AdminPreparePageProps> = (props) => {
  const { pickupEvent, pickupEvents = [] } = props;

  const [uuid, setUuid] = useState<string>();

  if (!pickupEvent) {
    return (
      <>
        <StoreHeader breadcrumb breadcrumbLocation="/store/admin" />
        <div className="admin-prepare-page">
          <p className="admin-prepare-page-title">Prepare Orders</p>
          <p className="admin-prepare-page-hint">Select a pickup event to begin preparation for:</p>
          <StoreDropdown
            options={pickupEvents.map((event) => ({ label: event.title, value: event.uuid }))}
            onChange={(option) => {
              setUuid(option.value);
            }}
          />
          <StoreButton type="primary" size="large" text="Continue" link={`/store/admin/prepare/${uuid}`} disabled={!uuid} />
        </div>
      </>
    );
  }

  return (
    <>
      <StoreHeader breadcrumb breadcrumbLocation="/store/admin/prepare" />
      <div className="admin-prepare-page">Admin Prepare Page, pickupEvent={JSON.stringify(pickupEvent)}</div>
    </>
  );
};

export default AdminPreparePage;
