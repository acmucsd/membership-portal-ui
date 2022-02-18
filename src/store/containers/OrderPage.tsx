import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { fetchOrder, fetchFuturePickupEvents, rescheduleOrder, cancelOrder } from '../storeActions';
import { PublicOrderWithItems, PublicOrderPickupEvent } from '../../types';
import { notify } from '../../utils';

import PageLayout from '../../layout/containers/PageLayout';
import OrderPage from '../components/OrderPage';

const OrderPageContainer: React.FC = () => {
  const params: { [key: string]: any } = useParams();
  const history = useHistory();
  const { uuid } = params;

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
  }, [uuid]);

  return (
    <PageLayout>
      <OrderPage order={order} pickupEvents={pickupEvents} rescheduleOrder={rescheduleOrder} cancelOrder={cancelOrder} />
    </PageLayout>
  );
};

export default OrderPageContainer;
