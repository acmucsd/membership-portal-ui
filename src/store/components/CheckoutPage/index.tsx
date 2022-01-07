import React, { useEffect, useState } from 'react';
import { CartItem } from '../../../types';
import CartDisplay from '../CartDisplay';
import Config from '../../../config';
import { history } from '../../../redux_store';
import StoreButton from '../StoreButton';
import StoreDropdown from '../StoreDropdown';
import StoreHeader from '../StoreHeader';
import { fetchService, notify } from '../../../utils';

type CheckoutPageProps = {
  cart: CartItem[];
  getFuturePickup: (onFail: () => void) => Promise<any>;
};

interface ItemAPIData {
  option: string;
  quantity: number;
}

interface APIData {
  order: ItemAPIData[];
  pickupEvent: string;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, getFuturePickup }) => {
  const [pickupEvents, setPickupEvents] = useState({});
  const [eventUUID, setEventUUID] = useState('');
  useEffect(() => {
    const updateEvents = async () => {
      const resultEvents = await getFuturePickup(() => {});
      setPickupEvents(resultEvents);
    };
    updateEvents();
  }, [getFuturePickup]);
  return (
    <>
      <StoreHeader breadcrumb breadcrumbTitle="Cart" breadcrumbLocation="/store/cart" showBalance />
      <div className="cart-page">
        <CartDisplay items={cart} writable={false} />
        <StoreDropdown
          options={Object.keys(pickupEvents)}
          onChange={(option) => {
            setEventUUID(pickupEvents[option.value]);
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
              history.push(`/store/order/${result.order.uuid}`);
            } catch (error) {
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
