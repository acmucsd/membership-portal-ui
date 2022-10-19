import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { fetchOrders } from '../storeActions';
import { PublicOrder } from '../../types';
import { notify } from '../../utils';

import PageLayout from '../../layout/containers/PageLayout';
import OrdersPage from '../components/OrdersPage';

interface OrdersPageContainerProps {
  fetchOrders: Function;
}

const OrdersPageContainer: React.FC<OrdersPageContainerProps> = (props) => {
  const { fetchOrders: fetchOrdersFunction } = props;

  const [orders, setOrders] = useState<Array<PublicOrder>>();

  useEffect(() => {
    fetchOrdersFunction()
      .then((value) => {
        setOrders(value);
      })
      .catch((reason) => {
        notify('API Error', reason.message || reason);
      });
  }, [props]);

  return (
    <PageLayout>
      <OrdersPage orders={orders} />
    </PageLayout>
  );
};

export default connect(() => ({}), { fetchOrders })(OrdersPageContainer);
