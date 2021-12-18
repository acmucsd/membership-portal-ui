import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { PublicOrderPickupEvent } from '../../../types';

import StoreButton from '../StoreButton';
import StoreDropdown from '../StoreDropdown';
import StoreHeader from '../StoreHeader';

import './style.less';

interface AdminPickupPageProps {
  pickupEvent?: PublicOrderPickupEvent | undefined;
  pickupEvents: PublicOrderPickupEvent[] | undefined;
}

const AdminPickupPage: React.FC<AdminPickupPageProps> = (props) => {
  const { pickupEvent, pickupEvents = [] } = props;

  const [uuid, setUuid] = useState<string>();
  const [createMode, setCreateMode] = useState<boolean>();

  if (createMode) {
    return (
      <>
        <StoreHeader breadcrumb breadcrumbLocation="/store/admin" />
        <div className="admin-pickup-page">Admin Pickup Page - Create</div>
      </>
    );
  }

  if (!pickupEvent) {
    return (
      <>
        <StoreHeader breadcrumb breadcrumbLocation="/store/admin" />
        <div className="admin-pickup-page">
          <p className="admin-pickup-page-title">Manage Pickup Events</p>
          <p className="admin-pickup-page-hint">Select a pickup event to edit:</p>
          <StoreDropdown
            options={pickupEvents.map((event) => ({ label: event.title, value: event.uuid }))}
            onChange={(option) => {
              setUuid(option.value);
            }}
          />
          {uuid ? (
            <Link to={`/store/admin/pickup/${uuid}`}>
              <StoreButton type="primary" size="large" text="Continue" />
            </Link>
          ) : (
            <StoreButton type="primary" size="large" text="Continue" disabled />
          )}
          <div className="admin-pickup-page-divider" />
          <StoreButton
            type="primary"
            size="large"
            text="Create New Event"
            onClick={() => {
              setCreateMode(true);
            }}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <StoreHeader breadcrumb breadcrumbLocation="/store/admin/pickup" />
      <div className="admin-pickup-page">Admin Pickup Page, pickupEvent={JSON.stringify(pickupEvent)}</div>
    </>
  );
};

export default AdminPickupPage;
