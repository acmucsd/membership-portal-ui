import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { CartItem, PublicOrderPickupEvent } from '../../../types';
import CartDisplay from '../CartDisplay';
import Config from '../../../config';
import { history } from '../../../redux_store';
import StoreButton from '../StoreButton';
import StoreDropdown from '../StoreDropdown';
import StoreHeader from '../StoreHeader';
import { fetchService, notify } from '../../../utils';
import './style.less';

type CheckoutPageProps = {
  cart: CartItem[];
  getFuturePickup: Function;
  clearCart: Function;
};

interface ItemAPIData {
  option: string;
  quantity: number;
}

interface APIData {
  order: ItemAPIData[];
  pickupEvent: string;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, getFuturePickup, clearCart }) => {
  const [pickupEvents, setPickupEvents] = useState<PublicOrderPickupEvent[]>([]);
  const [eventUUID, setEventUUID] = useState('');

  useEffect(() => {
    getFuturePickup().then((resultEvents) => {
      setPickupEvents(resultEvents);
    });
  }, [getFuturePickup]);

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
            const url = `${Config.API_URL}${Config.routes.store.order}`;
            try {
              const result = await fetchService(url, 'POST', 'json', {
                requiresAuthorization: true,
                payload: JSON.stringify(inputData),
              });
              clearCart();
              history.push(`/store/order/${result.order.uuid}`);
            } catch (error: any) {
              notify('Order placement error', error.message);
              history.push('/store/cart');
            }
          }}
        />
      </div>
    </>
  );
};

export default CheckoutPage;
