import React from 'react';

import { PublicOrder } from '../../../types';

import './style.less';

interface OrderPageProps {
  order: PublicOrder | undefined;
}

const OrderPage: React.FC<OrderPageProps> = (props) => {
  const { order } = props;

  return <div className="order-page">Order Page, order={JSON.stringify(order)}</div>;
};

export default OrderPage;
