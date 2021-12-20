import React from 'react';

import { PublicOrder } from '../../../types';

import './style.less';

interface OrdersPageProps {
  orders: PublicOrder[] | undefined;
}

const OrdersPage: React.FC<OrdersPageProps> = (props) => {
  const { orders } = props;

  return <div className="orders-page">Orders Page, orders={JSON.stringify(orders)}</div>;
};

export default OrdersPage;
