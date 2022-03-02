import React, { useEffect, useState } from 'react';
import PageLayout from '../../layout/containers/PageLayout';
import { useAppDispatch } from '../../redux/store';
import { PublicOrder } from '../../types';
import { notify } from '../../utils';
import OrdersPage from '../components/OrdersPage';
import { fetchOrders } from '../storeSlice';

interface OrdersPageContainerProps {}

const OrdersPageContainer: React.FC<OrdersPageContainerProps> = () => {
  const [orders, setOrders] = useState<Array<PublicOrder>>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrders())
      .unwrap()
      .then((value) => {
        setOrders(value);
      })
      .catch((reason) => {
        notify('API Error', reason.message || reason);
      });
  }, [dispatch]);

  return (
    <PageLayout>
      <OrdersPage orders={orders} />
    </PageLayout>
  );
};

export default OrdersPageContainer;
