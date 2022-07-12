import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import history from '../../../history';
import { getErrorMessage, notify } from '../../../utils';
import { cartSelector, clearCart, fetchFuturePickupEvents } from '../../utils';
import CartDisplay from '../CartDisplay';
import StoreButton from '../StoreButton';
import StoreDropdown from '../StoreDropdown';
import StoreHeader from '../StoreHeader';
import './style.less';
import { PublicOrderPickupEvent } from '../../../api';
import backend from '../../../backend';

interface ItemAPIData {
  option: string;
  quantity: number;
}

interface APIData {
  order: ItemAPIData[];
  pickupEvent: string;
}

const CheckoutPage: React.FC = () => {
  const [pickupEvents, setPickupEvents] = useState<PublicOrderPickupEvent[]>([]);
  const [eventUUID, setEventUUID] = useState('');
  const cart = Object.values(useSelector(cartSelector));

  useEffect(() => {
    fetchFuturePickupEvents().then(setPickupEvents);
  }, []);

  return (
    <>
      <StoreHeader breadcrumb breadcrumbTitle="Cart" breadcrumbLocation="/store/cart" showBalance />
      <div className="checkout-page">
        <CartDisplay items={cart} writable={false} />
        <StoreDropdown
          placeholder="Select a pickup event..."
          options={pickupEvents
            .sort((a, b) => moment(a.start).diff(moment(b.start)))
            .map((event) => ({
              label: `${event.title} from ${moment(event.start).format('MMM D[,] LT')} to ${moment(event.end).format('MMM D[,] LT')}`,
              value: event.uuid,
            }))}
          onChange={(option) => {
            setEventUUID(option.value);
          }}
        />
        <StoreButton
          text="Place Order"
          disabled={eventUUID === ''}
          onClick={async () => {
            const inputData: APIData = { order: [], pickupEvent: eventUUID };
            cart.forEach((item) => {
              inputData.order.push({ option: item.option.uuid, quantity: item.quantity });
            });
            try {
              const data = await backend.placeMerchOrder(inputData);
              clearCart();
              history.push(`/store/order/${data.order.uuid}`);
            } catch (error: any) {
              notify('Order placement error', getErrorMessage(error));
              history.push('/store/cart');
            }
          }}
        />
      </div>
    </>
  );
};

export default CheckoutPage;
