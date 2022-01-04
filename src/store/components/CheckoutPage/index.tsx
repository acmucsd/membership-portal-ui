import React, { useEffect, useState } from 'react';
import { CartItem } from '../../../types';
import CartDisplay from '../CartDisplay';
import StoreButton from '../StoreButton';
import StoreDropdown from '../StoreDropdown';
import StoreHeader from '../StoreHeader';

type CheckoutPageProps = {
  cart: CartItem[];
  getFuturePickup: (onFail: () => void) => Promise<any>;
};

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, getFuturePickup }) => {
  const [pickupEvents, setPickupEvents] = useState({});
  const [eventUUID, setEventUUID] = useState(undefined);
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
        <StoreButton text="Place Order" disabled={eventUUID === undefined} />
      </div>
    </>
  );
};

export default CheckoutPage;
