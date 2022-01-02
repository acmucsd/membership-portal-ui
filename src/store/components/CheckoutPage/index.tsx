import React, { useEffect, useState } from 'react';
import { CartItem } from '../../../types';
import CartDisplay from '../CartDisplay';
import StoreButton from '../StoreButton';
import StoreDropdown from '../StoreDropdown';
import StoreHeader from '../StoreHeader';

type CheckoutPageProps = {
  cart: CartItem[];
  getFuturePickup: (onFail: () => void) => void;
};

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, getFuturePickup }) => {
  const [pickupEvents, setPickupEvents] = useState([]);
  useEffect(() => {
    getFuturePickup(() => {});
    setPickupEvents([]);
  }, [getFuturePickup]);
  return (
    <>
      <StoreHeader breadcrumb breadcrumbTitle="Cart" breadcrumbLocation="/store/cart" showBalance />
      <div className="cart-page">
        <CartDisplay items={cart} writable={false} />
        <StoreDropdown options={pickupEvents} />
        <StoreButton text="Place Order" />
      </div>
    </>
  );
};

export default CheckoutPage;
