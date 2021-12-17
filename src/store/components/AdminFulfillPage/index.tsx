import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { PublicOrderPickupEvent } from '../../../types';

import StoreButton from '../StoreButton';
import StoreDropdown from '../StoreDropdown';
import StoreHeader from '../StoreHeader';

import './style.less';

interface AdminFulfillPageProps {
  pickupEvent?: PublicOrderPickupEvent | undefined;
  pickupEvents?: PublicOrderPickupEvent[] | undefined;
}

const AdminFulfillPage: React.FC<AdminFulfillPageProps> = (props) => {
  const { pickupEvent, pickupEvents = [] } = props;

  const [uuid, setUuid] = useState<string>();

  if (!pickupEvent) {
    return (
      <>
        <StoreHeader breadcrumb breadcrumbLocation="/store/admin" />
        <div className="admin-fulfill-page">
          <p className="admin-fulfill-page-title">Prepare Orders</p>
          <p className="admin-fulfill-page-hint">Select a pickup event to begin fulfillment for:</p>
          <StoreDropdown
            options={pickupEvents.map((event) => event.uuid)}
            onChange={(option) => {
              setUuid(option.value);
            }}
          />
          {uuid ? (
            <Link to={`/store/admin/fulfill/${uuid}`}>
              <StoreButton type="primary" size="large" text="Continue" />
            </Link>
          ) : (
            <StoreButton type="primary" size="large" text="Continue" disabled />
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <StoreHeader breadcrumb breadcrumbLocation="/store/admin/fulfill" />
      <div className="admin-fulfill-page">Admin Prepare Page, pickupEvent={JSON.stringify(pickupEvent)}</div>
    </>
  );
};

export default AdminFulfillPage;
