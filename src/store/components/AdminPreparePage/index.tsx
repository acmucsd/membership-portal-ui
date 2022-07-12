import React, { useState } from 'react';
import { Table } from 'antd';
import moment from 'moment';
import { OrderStatus, PublicOrderPickupEvent } from '../../../api';
import { PublicOrderItemWithQuantity } from '../../../types';
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
            placeholder="Select a pickup event..."
            options={pickupEvents
              .sort((a, b) => moment(a.start).diff(moment(b.start)))
              .map((event) => ({
                label: `${event.title} from ${moment(event.start).format('MMM D[,] LT')} to ${moment(event.end).format('MMM D[,] LT')}`,
                value: event.uuid,
              }))}
            onChange={(option) => {
              setUuid(option.value);
            }}
          />
          <StoreButton type="primary" size="medium" text="Continue" link={`/store/admin/prepare/${uuid}`} disabled={!uuid} />
        </div>
      </>
    );
  }

  const merchData: Record<string, { quantity: number; name: string; variantType: string; variantValue: string }> = {};
  pickupEvent.orders
    ?.filter((order) => order.status !== OrderStatus.CANCELLED)
    .forEach((order) => {
      order.items.forEach((item) => {
        merchData[item.option.uuid] = merchData[`${item.option.uuid}`] ?? {
          quantity: 0,
          name: item.option.item.itemName,
          variantType: item.option.metadata?.type,
          variantValue: item.option.metadata?.value,
        };
        merchData[item.option.uuid].quantity += 1;
      });
    });

  return (
    <>
      <StoreHeader breadcrumb breadcrumbLocation="/store/admin/prepare" />
      <div className="admin-prepare-page">
        <h1 className="admin-prepare-page-title">Prepare Orders</h1>
        <h3 className="admin-prepare-page-subtitle">
          Pickup Event: {moment(pickupEvent.start).format('dddd, MMMM Do, YYYY [from] ha [to] ')}
          {moment(pickupEvent.end).format('ha')} at {pickupEvent.title}
        </h3>
        <h2 className="admin-prepare-page-secondary">Summary of Items</h2>
        <Table
          pagination={false}
          className="admin-prepare-page-table"
          size="small"
          rowKey="uuid"
          dataSource={Object.values(merchData)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((data) => {
              const hasVariant = data.variantType && data.variantValue;

              return {
                uuid: data.name,
                itemDisplay: (
                  <>
                    <h2>{data.name}</h2>
                    {hasVariant && <h3>{`${data.variantType}: ${data.variantValue}`}</h3>}
                  </>
                ),
                quantity: data.quantity,
              };
            })}
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
          rowKey="uuid"
          dataSource={pickupEvent.orders
            ?.filter((order) => order.status !== OrderStatus.CANCELLED)
            .sort((a, b) => {
              const nameA = `${a.user.firstName} ${a.user.lastName}`;
              const nameB = `${b.user.firstName} ${b.user.lastName}`;

              return nameA.localeCompare(nameB);
            })
            .map((order) => {
              const itemMap = new Map<string, PublicOrderItemWithQuantity>();

              order.items.forEach((item) => {
                const existingItem = itemMap.get(item.option.uuid);

                if (existingItem) {
                  existingItem.quantity += 1;

                  itemMap.set(existingItem.option.uuid, existingItem);
                } else {
                  itemMap.set(item.option.uuid, { ...item, quantity: 1 });
                }
              });

              const updatedItems = Array.from(itemMap, ([, value]) => value);

              return {
                uuid: order.uuid,
                user: `${order.user.firstName} ${order.user.lastName}`,
                items: (
                  <ul>
                    {updatedItems
                      .sort((a, b) => {
                        return a.option.item.itemName.localeCompare(b.option.item.itemName);
                      })
                      .map((item) => (
                        <li key={item.uuid}>
                          {item.quantity} x {item.option.item.itemName}
                          {item.option.metadata && ` (${item.option.metadata?.type}: ${item.option.metadata?.value})`}
                        </li>
                      ))}
                  </ul>
                ),
              };
            })}
          columns={[
            {
              title: 'User',
              dataIndex: 'user',
              key: 'user',
              className: 'user',
            },
            {
              title: 'Items',
              dataIndex: 'items',
              key: 'items',
              className: 'items',
            },
          ]}
        />
      </div>
    </>
  );
};

export default AdminPreparePage;
