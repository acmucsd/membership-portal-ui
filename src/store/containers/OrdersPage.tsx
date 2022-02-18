import React, { useEffect, useState } from 'react';

import { fetchOrders } from '../storeActions';
import { PublicOrder } from '../../types';
import { notify } from '../../utils';

import PageLayout from '../../layout/containers/PageLayout';
import OrdersPage from '../components/OrdersPage';

const OrdersPageContainer: React.FC = () => {
  const [orders, setOrders] = useState<Array<PublicOrder>>();

  useEffect(() => {
    fetchOrders()
      .then((value) => {
        setOrders(value);
      })
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
