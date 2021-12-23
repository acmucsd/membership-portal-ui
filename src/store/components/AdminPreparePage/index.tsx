import { Table } from 'antd';
import moment from 'moment';
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

  const merchData: Record<string, { quantity: number; name: string; variantType: string; variantValue: string }> = {};
  pickupEvent.orders?.forEach((order) => {
    order.items.forEach((item) => {
      merchData[`${item.uuid}${item.option.metadata?.type}${item.option.metadata?.value}`] = merchData[
        `${item.uuid}${item.option.metadata?.type}${item.option.metadata?.value}`
      ] ?? {
        quantity: 0,
        name: item.uuid,
        variantType: item.option.metadata?.type,
        variantValue: item.option.metadata?.value,
      };
      merchData[`${item.uuid}${item.option.metadata?.type}${item.option.metadata?.value}`].quantity += item.option.quantity;
    });
  });

  return (
    <>
      <StoreHeader breadcrumb breadcrumbLocation="/store/admin/prepare" />
      <div className="admin-prepare-page">
        <h1 className="admin-prepare-page-title">Prepare Orders</h1>
        <h3 className="admin-prepare-page-subtitle">
          Pickup Event: {moment(pickupEvent.start).format('dddd, MMMM Do, YYYY [from] ha [to] ')}
          {moment(pickupEvent.end).format('ha')} at Geisel
        </h3>
        <h2 className="admin-prepare-page-secondary">Summary of Items</h2>
        <Table
          pagination={false}
          className="admin-prepare-page-table"
          size="small"
          dataSource={Object.values(merchData).map((data) => ({
            itemDisplay: (
              <>
                <h2>{data.name}</h2>
                <h3>
                  {data.variantType}: {data.variantValue}
                </h3>
              </>
            ),
            quantity: data.quantity,
          }))}
          columns={[
            {
              title: 'Item',
              dataIndex: 'itemDisplay',
              key: 'itemDisplay',
            },
            {
              title: 'Quantity',
              dataIndex: 'quantity',
              key: 'quantity',
            },
          ]}
        />
        <h2 className="admin-prepare-page-secondary">User Breakdown</h2>
        <Table
          pagination={false}
          className="admin-prepare-page-table"
          size="small"
          dataSource={pickupEvent.orders?.map((event) => ({
            user: event.user,
            items: (
              <ul>
                {event.items.map((curr) => (
                  <li>
                    Item Name Lost ({curr.option.metadata?.type}: {curr.option.metadata?.value}) x {curr.option.quantity}
                  </li>
                ))}
              </ul>
            ),
          }))}
          columns={[
            {
              title: 'User',
              dataIndex: 'user',
              key: 'user',
            },
            {
              title: 'Items',
              dataIndex: 'items',
              key: 'items',
            },
          ]}
        />
      </div>
    </>
  );
};

export default AdminPreparePage;
