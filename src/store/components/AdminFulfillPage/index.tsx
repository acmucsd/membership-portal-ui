import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import moment from 'moment';
import { Modal } from 'antd';

import { fulfillOrder, completePickupEvent } from '../../storeActions';
import { OrderStatus, PublicOrderPickupEvent, PublicOrderForFulfillment } from '../../../types';
import { notify, parseOrderStatus } from '../../../utils';

import StoreButton from '../StoreButton';
import StoreCheckbox from '../StoreCheckbox';
import StoreDropdown from '../StoreDropdown';
import StoreHeader from '../StoreHeader';

import './style.less';

interface AdminFulfillPageProps {
  pickupEvent?: PublicOrderPickupEvent | undefined;
  pickupEvents?: PublicOrderPickupEvent[] | undefined;
}

const AdminFulfillPage: React.FC<AdminFulfillPageProps> = (props) => {
  const { pickupEvent: pickupEventIn, pickupEvents = [] } = props;

  const [uuid, setUuid] = useState<string>();
  const [pickupEvent, setPickupEvent] = useState<PublicOrderPickupEvent>();
  const [selectedOrder, setSelectedOrder] = useState<PublicOrderForFulfillment>();
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setPickupEvent(pickupEventIn);
  }, [pickupEventIn]);

  const handleFinishPickup = () => {
    completePickupEvent(pickupEvent?.uuid)
      .then(() => {
        setShowModal(false);
        notify('Success!', 'Pickup Event is Over');
        history.push('/store/admin');
      })
      .catch((reason) => {
        setShowModal(false);
        notify('API Error', reason.message || reason);
      });
  };

  if (!pickupEvent) {
    return (
      <>
        <StoreHeader breadcrumb breadcrumbLocation="/store/admin" />
        <div className="admin-fulfill-page">
          <div className="admin-fulfill-page-left">
            <p className="admin-fulfill-page-title">Fufill Orders</p>
            <p className="admin-fulfill-page-hint">Select a pickup event to begin fulfillment for:</p>
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
            <StoreButton type="primary" size="medium" text="Continue" link={`/store/admin/fulfill/${uuid}`} disabled={!uuid} />
          </div>
        </div>
      </>
    );
  }

  let orderInfo = <></>;
  if (selectedOrder) {
    orderInfo = (
      <div className="admin-fulfill-page-right">
        <h2 className="title">
          {selectedOrder?.user.firstName} {selectedOrder?.user.lastName}&apos;s Order
        </h2>
        <p>
          <span role="img" aria-label="Warning">
            ⚠️
          </span>{' '}
          Once you fulfill an order, you can never unfulfill it.
        </p>
        <br />
        {selectedOrder.items.map((item, idx) => (
          <div className="order-item" key={idx}>
            <StoreCheckbox
              checked={item.fulfilled || item.needsFulfillment}
              disabled={item.fulfilled}
              onChange={(e) => {
                const modifiedItems = [...selectedOrder.items];
                modifiedItems[idx].needsFulfillment = e.target.checked;
                setSelectedOrder({ ...selectedOrder, items: modifiedItems });
              }}
            />
            <span className="item-name">
              {item.option.item.itemName}
              {item.option.metadata ? ` - ${item.option.metadata.type}: ${item.option.metadata.value}` : ''}
            </span>
          </div>
        ))}
        <StoreButton
          text="Save"
          onClick={() => {
            fulfillOrder(
              selectedOrder.uuid,
              selectedOrder.items.filter((item) => item.needsFulfillment).map((item) => ({ uuid: item.uuid, notes: item.notes })),
            )
              .then((newOrder) => {
                setPickupEvent({
                  ...pickupEvent,
                  orders: [...(pickupEvent.orders ?? [])].map((order) => (selectedOrder.uuid === order.uuid ? newOrder : order)),
                });
                notify('Success!', 'Order has been updated');
                setSelectedOrder(undefined);
              })
              .catch((reason) => {
                notify('API Error', reason.message || reason);
              });
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
          <h3 className="admin-fulfill-page-dates">
            from {moment(pickupEvent.start).format('MMM D[,] LT')} to {moment(pickupEvent.end).format('MMM D[,] LT')}
          </h3>
          <h3 className="admin-fulfill-page-orders-list-title">Select Order:</h3>
          <div className="admin-fulfill-page-orders-list">
            {pickupEvent.orders
              ?.filter((order) => {
                return order.status !== OrderStatus.CANCELLED;
              })
              .sort((a, b) => {
                const aName = `${a.user.firstName} ${a.user.lastName}`;
                const bName = `${b.user.firstName} ${b.user.lastName}`;

                return aName.localeCompare(bName);
              })
              .map((order, key) => (
                <button
                  type="button"
                  className={`admin-fulfill-page-order${selectedOrder?.uuid === order.uuid ? ' selected' : ''}`}
                  onClick={() => {
                    if (selectedOrder && selectedOrder.uuid === order.uuid) {
                      setSelectedOrder(undefined);
                    } else {
                      setSelectedOrder({ ...order, items: order.items.map((item) => ({ ...item, needsFulfillment: false })) });
                    }
                  }}
                  key={key}
                >
                  {order.user.firstName} {order.user.lastName} ({parseOrderStatus(order.status)})
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
          <Modal visible={showModal} onCancel={() => setShowModal(false)} onOk={handleFinishPickup}>
            This will end the pickup event forever. Any unfulfilled orders will be marked as missed, and any partially fulfilled orders will be
            eligble to be rescheduled or cancelled. Are you sure you want to proceed?
          </Modal>
        </div>
        {orderInfo}
      </div>
    </>
  );
};

export default AdminFulfillPage;
