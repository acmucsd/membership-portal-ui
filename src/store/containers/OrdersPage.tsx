import React, { useEffect, useState } from 'react';
import { PublicOrder } from '../../api';
import PageLayout from '../../layout/containers/PageLayout';
import { notify } from '../../utils';
import OrdersPage from '../components/OrdersPage';
import { fetchOrders } from '../utils';

interface OrdersPageContainerProps {}

const OrdersPageContainer: React.FC<OrdersPageContainerProps> = () => {
  const [orders, setOrders] = useState<Array<PublicOrder>>();

  useEffect(() => {
    fetchOrders()
      .then(setOrders)
      .catch((reason) => {
        notify('API Error', reason.message || reason);
      });
  }, []);

  return (
    <PageLayout>
      <OrdersPage orders={orders} />
    </PageLayout>
  );
};

export default OrdersPageContainer;
