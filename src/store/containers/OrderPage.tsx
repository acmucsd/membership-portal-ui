import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PageLayout from '../../layout/containers/PageLayout';
import { useAppDispatch } from '../../redux/store';
import { PublicOrderPickupEvent, PublicOrderWithItems } from '../../types';
import { notify } from '../../utils';
import OrderPage from '../components/OrderPage';
import { cancelOrder, fetchFuturePickupEvents, fetchOrder, rescheduleOrder } from '../storeSlice';

interface OrderPageContainerProps {}

const OrderPageContainer: React.FC<OrderPageContainerProps> = () => {
  const params: { [key: string]: any } = useParams();
  const history = useHistory();
  const { uuid } = params;

  if (!uuid) {
    history.push('/store');
  }

  const [order, setOrder] = useState<PublicOrderWithItems>();
  const [pickupEvents, setPickupEvents] = useState<Array<PublicOrderPickupEvent>>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrder(uuid))
      .unwrap()
      .then((value) => {
        setOrder(value);
      })
      .catch((reason) => {
        notify('API Error', reason.message || reason);
      });
    dispatch(fetchFuturePickupEvents())
      .unwrap()
      .then((value) => {
        setPickupEvents(value);
      })
      .catch((reason) => {
        notify('API Error', reason.message || reason);
      });
  }, [dispatch, uuid]);

  return (
    <PageLayout>
      <OrderPage order={order} pickupEvents={pickupEvents} rescheduleOrder={rescheduleOrder} cancelOrder={cancelOrder} />
    </PageLayout>
  );
};

export default OrderPageContainer;
