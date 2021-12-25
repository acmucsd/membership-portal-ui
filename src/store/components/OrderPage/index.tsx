import moment from 'moment';
import React from 'react';

import { CartItem, PublicMerchCollection, PublicOrder } from '../../../types';
import CartDisplay from '../CartDisplay';
import StoreHeader from '../StoreHeader';

import './style.less';

interface OrderPageProps {
  order: PublicOrder | undefined;
}

const OrderPage: React.FC<OrderPageProps> = (props) => {
  const { order } = props;

  return (
    <>
      <StoreHeader breadcrumb breadcrumbLocation="../orders" />
      <div className="order-page">
        <h1>Order</h1>
        <h3>Purchase Date: {moment(order?.orderedAt).format('MMMM Do, YYYY')}</h3>
        <h3 className="emphasized">
          Pickup Event:{' '}
          {moment(order?.pickupEvent.start).format('MMMM Do, YYYY [from] h:mm a [to] ') + moment(order?.pickupEvent.end).format('h:mm a ')}
          at {order?.pickupEvent.title}
        </h3>

        <CartDisplay
          writable={false}
          items={
            order?.items.map(
              (publicItem): CartItem => {
                const returnType: CartItem = {
                  option: publicItem.option,
                  quantity: publicItem.option.quantity || 1,
                  item: {
                    ...publicItem,
                    itemName: 'missing',
                    collection: {} as PublicMerchCollection,
                    description: 'missing',
                    picture: 'https://http.cat/404',
                    monthlyLimit: -1,
                    lifetimeLimit: -1,
                    hasVariantsEnabled: false,
                    options: [publicItem.option],
                  },
                };
                return returnType;
              },
            ) ?? []
          }
        />
      </div>
    </>
  );
};

export default OrderPage;
