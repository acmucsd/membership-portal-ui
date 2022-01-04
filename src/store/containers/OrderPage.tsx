import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import {
  fetchOrder as fetchOrderConnected,
  fetchFuturePickupEvents as fetchFuturePickupEventsConnected,
  rescheduleOrder as rescheduleOrderConnected,
  cancelOrder as cancelOrderConnected,
} from '../storeActions';
import { PublicOrderWithItems, PublicOrderPickupEvent } from '../../types';
import { notify } from '../../utils';

import PageLayout from '../../layout/containers/PageLayout';
import OrderPage from '../components/OrderPage';

interface OrderPageContainerProps {
  fetchOrder: Function;
  fetchFuturePickupEvents: Function;
  rescheduleOrder: Function;
  cancelOrder: Function;
}

const OrderPageContainer: React.FC<OrderPageContainerProps> = (props) => {
  const params: { [key: string]: any } = useParams();
  const history = useHistory();
  const { uuid } = params;
  const { fetchOrder, fetchFuturePickupEvents, rescheduleOrder, cancelOrder } = props;

  if (!uuid) {
    history.push('/store');
  }

  const [order, setOrder] = useState<PublicOrderWithItems>();
  const [pickupEvents, setPickupEvents] = useState<Array<PublicOrderPickupEvent>>();

  useEffect(() => {
    fetchOrder(uuid)
      .then((value) => {
        setOrder(value);
      })
      .catch((reason) => {
        notify('API Error', reason.message || reason);
      });
    fetchFuturePickupEvents()
      .then((value) => {
        setPickupEvents(value);
      })
      .catch((reason) => {
        notify('API Error', reason.message || reason);
      });
  }, [fetchOrder, fetchFuturePickupEvents, uuid]);

  return (
    <PageLayout>
      <OrderPage order={order} pickupEvents={pickupEvents} rescheduleOrder={rescheduleOrder} cancelOrder={cancelOrder} />
    </PageLayout>
  );
};

export default connect(() => ({}), {
  fetchOrder: fetchOrderConnected,
  fetchFuturePickupEvents: fetchFuturePickupEventsConnected,
  rescheduleOrder: rescheduleOrderConnected,
  cancelOrder: cancelOrderConnected,
})(OrderPageContainer);
