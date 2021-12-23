import moment from 'moment';
import React, { useState } from 'react';

import { Modal } from 'antd';
import { PublicOrder, PublicOrderPickupEvent } from '../../../types';

import StoreButton from '../StoreButton';
import StoreCheckbox from '../StoreCheckbox';
import StoreDropdown from '../StoreDropdown';
import StoreHeader from '../StoreHeader';
import Config from '../../../config';
import { fetchService, notify } from '../../../utils';

import './style.less';

interface AdminFulfillPageProps {
  pickupEvent?: PublicOrderPickupEvent | undefined;
  pickupEvents?: PublicOrderPickupEvent[] | undefined;
}

const AdminFulfillPage: React.FC<AdminFulfillPageProps> = (props) => {
  const { pickupEvent, pickupEvents = [] } = props;

  const [uuid, setUuid] = useState<string>();
  const [selectedOrder, setSelectedOrder] = useState<PublicOrder>();
  const [showModal, setShowModal] = useState(false);

  if (!pickupEvent) {
    return (
      <>
        <StoreHeader breadcrumb breadcrumbLocation="/store/admin" />
        <div className="admin-fulfill-page">
          <div className="admin-fulfill-page-left">
            <p className="admin-fulfill-page-title">Fufill Orders</p>
            <p className="admin-fulfill-page-hint">Select a pickup event to begin fulfillment for:</p>
            <StoreDropdown
              options={pickupEvents.map((event) => ({ label: event.title, value: event.uuid }))}
              onChange={(option) => {
                setUuid(option.value);
              }}
            />
            <StoreButton type="primary" size="large" text="Continue" link={`/store/admin/fulfill/${uuid}`} disabled={!uuid} />
          </div>
        </div>
      </>
    );
  }

  const startMoment = moment(pickupEvent.start);
  const endMoment = moment(pickupEvent.end);

  let orderInfo = <></>;
  if (selectedOrder) {
    orderInfo = (
      <div className="admin-fulfill-page-right">
        <h2 className="title">{selectedOrder?.user}&apos;s order</h2>
        <p>
          <span role="img" aria-label="Warning">
            ⚠️
          </span>{' '}
          Once you fulfill an order, you can never unfulfill it
        </p>
        <br />
        {selectedOrder.items.map((item, idx) => (
          <>
            <StoreCheckbox
              checked={item.fulfilled}
              disabled={item.fulfilled}
              onChange={(e) => {
                const modifiedItems = [...selectedOrder.items];
                modifiedItems[idx].fulfilled = e.target.checked;
                setSelectedOrder({ ...selectedOrder, items: modifiedItems });
              }}
            />
            <span className="item-name">{item.option.quantity} x Missing Item Title</span>
          </>
        ))}
        <StoreButton
          text="Save"
          onClick={async () => {
            const url = `${Config.API_URL}${Config.routes.store.order}/${selectedOrder.uuid}/fulfill`;

            try {
              await fetchService(url, 'POST', 'json', {
                requiresAuthorization: true,
                payload: JSON.stringify({
                  items: selectedOrder.items.filter((item) => item.fulfilled).map((item) => ({ uuid: item.uuid, notes: item.notes })),
                }),
              });
              notify('Success!', 'Order has been updated');
            } catch (e) {
              notify('API Error', (e as any).message);
            }
          }}
        />
      </div>
    );
  }

  return (
    <>
      <StoreHeader breadcrumb breadcrumbLocation="/store/admin/fulfill" />
      <div className="admin-fulfill-page">
        <div className="admin-fulfill-page-left">
          <h1 className="admin-fulfill-page-title">Fulfill Orders</h1>
          <h3 className="admin-fulfill-page-secondary description">{startMoment.format('dddd, MMMM Do, YYYY')}</h3>
          <h3 className="admin-fulfill-page-secondary description">
            {startMoment.format('[from] ha [to] ')}
            {endMoment.format('ha')}
          </h3>
          <h3 className="admin-fulfill-page-secondary title">Select Order</h3>
          <div className="admin-fulfill-page-orders-box-orders-list">
            {pickupEvent.orders?.map((order, key) => (
              <button
                type="button"
                className={selectedOrder && selectedOrder.uuid === order.uuid ? 'selected-order' : ''}
                onClick={() => {
                  if (selectedOrder && selectedOrder.uuid === order.uuid) {
                    setSelectedOrder(undefined);
                  } else {
                    setSelectedOrder(order);
                  }
                }}
              >
                <h4 key={key}>{order.user}</h4>
              </button>
            ))}
          </div>
          <StoreButton
            text="Finish Pickup Event"
            type="danger"
            onClick={async () => {
              setShowModal(true);
            }}
          />
          <Modal
            visible={showModal}
            onCancel={() => setShowModal(false)}
            onOk={async () => {
              setShowModal(false);
              const url = `${Config.API_URL}${Config.routes.store.order}/pickup/${pickupEvent.uuid}/complete`;

              try {
                await fetchService(url, 'POST', 'json', {
                  requiresAuthorization: true,
                });
                notify('Success!', 'Pickup Event is Over');
              } catch (e) {
                notify('API Error', (e as any).message);
              }
            }}
          >
            This will end the pickup event forever. Did you mean to do this?
          </Modal>
        </div>
        {orderInfo}
      </div>
    </>
  );
};

export default AdminFulfillPage;
