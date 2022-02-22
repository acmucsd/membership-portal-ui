import React, { useState } from 'react';
import { Button } from 'antd';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { OrderStatus, PublicOrderWithItems, PublicOrderPickupEvent } from '../../../types';
import { notify, parseOrderStatus } from '../../../utils';

import OrderDisplay from '../OrderDisplay';
import StoreButton from '../StoreButton';
import StoreDropdown from '../StoreDropdown';
import StoreHeader from '../StoreHeader';

import './style.less';

interface OrderPageProps {
  order: PublicOrderWithItems | undefined;
  pickupEvents: PublicOrderPickupEvent[] | undefined;
  rescheduleOrder: Function;
  cancelOrder: Function;
}

const OrderPage: React.FC<OrderPageProps> = (props) => {
  const { order, pickupEvents = [], rescheduleOrder, cancelOrder } = props;
  const history = useHistory();

  const [selecting, setSelecting] = useState<boolean>(false);
  const [selectedPickup, setSelectedPickup] = useState<string>('');

  if (!order) {
    return null;
  }

  const { uuid, status, orderedAt, pickupEvent, items } = order;

  const showPickup = !(status === OrderStatus.PARTIALLY_FULFILLED || status === OrderStatus.PICKUP_CANCELLED || status === OrderStatus.PICKUP_MISSED);

  let actionable = true;

  if (status === OrderStatus.CANCELLED || status === OrderStatus.FULFILLED) {
    actionable = false;
  } else if (status === OrderStatus.PLACED && new Date() > moment(pickupEvent.start).subtract(2, 'days').toDate()) {
    actionable = false;
  }

  return (
    <>
      <StoreHeader breadcrumb breadcrumbLocation="../orders" />
      <div className="order-page">
        <h1>Order (Status: {parseOrderStatus(status)})</h1>
        <h3>
          <span className="emphasized">Purchase Date:</span> {moment(orderedAt).format('MMMM Do, YYYY')}
        </h3>
        {selecting && (
          <>
            <StoreDropdown
              placeholder="Select a pickup event..."
              options={pickupEvents
                .sort((a, b) => moment(a.start).diff(moment(b.start)))
                .map((event) => ({
                  label: `${event.title} from ${moment(event.start).format('MMM D[,] LT')} to ${moment(event.end).format('MMM D[,] LT')}`,
                  value: event.uuid,
                }))}
              onChange={(option) => {
                setSelectedPickup(option.value);
              }}
            />
            <div className="order-page-buttons">
              <Button
                className="order-page-button"
                type="link"
                onClick={() => {
                  setSelecting(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className="order-page-button"
                type="link"
                onClick={() => {
                  rescheduleOrder(uuid, selectedPickup)
                    .then(() => {
                      setSelecting(false);
                      history.go(0); // Refresh page to fetch updated order data
                    })
                    .catch((reason) => {
                      notify('API Error', reason.message || reason);
                      setSelecting(false);
                    });
                }}
                disabled={!selectedPickup}
              >
                Select
              </Button>
            </div>
          </>
        )}
        {showPickup && (
          <h3>
            <span className="emphasized">Pickup Event: </span>
            {moment(pickupEvent.start).format('MMMM Do, YYYY [from] h:mm a [to] ') + moment(pickupEvent.end).format('h:mm a ')}
            at {pickupEvent.title}
          </h3>
        )}
        {actionable && !selecting && (
          <div className="order-page-buttons">
            <StoreButton
              type="primary"
              size="medium"
              text="Reschedule Order"
              onClick={() => {
                setSelecting(true);
              }}
            />
            <StoreButton
              type="danger"
              size="medium"
              text="Cancel Order"
              onClick={() => {
                cancelOrder(uuid)
                  .then(() => {
                    history.go(0); // Refresh page to fetch updated order data
                  })
                  .catch((reason) => {
                    notify('API Error', reason.message || reason);
                  });
              }}
            />
          </div>
        )}
        <OrderDisplay items={items} />
      </div>
    </>
  );
};

export default OrderPage;
