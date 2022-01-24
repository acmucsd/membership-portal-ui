import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

import { PublicOrder } from '../../../types';
import { toProperCase } from '../../../utils';
import StoreHeader from '../StoreHeader';

import './style.less';

interface OrdersPageProps {
  orders: PublicOrder[] | undefined;
}

const OrdersPage: React.FC<OrdersPageProps> = (props) => {
  const { orders } = props;

  return (
    <>
      <StoreHeader />
      <div className="orders-page">
        {orders
          ?.sort((a, b) => moment(b.orderedAt).diff(moment(a.orderedAt)))
          .map((order) => {
            return (
              <div className="order-entry" key={order.uuid}>
                <Link to={`./order/${order.uuid}`}>
                  <h1>Order (Status: {toProperCase(order.status)})</h1>
                </Link>
                <h3>Purchase Date: {moment(order.orderedAt).format('MMMM Do, YYYY')}</h3>
                <h3>Pickup Date: {moment(order.pickupEvent.start).format('MMMM Do, YYYY')}</h3>
              </div>
            );
          })}
        {(!orders || orders.length === 0) && <p>No orders found! Visit the shop to place an order.</p>}
      </div>
    </>
  );
};

export default OrdersPage;
