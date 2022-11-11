import React, { useEffect, useState } from 'react';

import { CartItem } from '../../../types';

import CartDisplay from '../CartDisplay';
import StoreButton from '../StoreButton';
import StoreHeader from '../StoreHeader';

import './style.less';

type CartPageProps = {
  cart: CartItem[];
  verifyCart: (onFail: () => void) => void;
};

const CartPage: React.FC<CartPageProps> = ({ cart, verifyCart }) => {
  const [isCheckoutLocked, setIsCheckoutLocked] = useState(false);

  // unlock checkout if cart is modified
  useEffect(() => {
    setIsCheckoutLocked(false);
  }, [cart]);

  const onCheckoutButtonClick = () => {
    verifyCart(() => setIsCheckoutLocked(true));
  };

  return (
    <>
      <StoreHeader breadcrumb breadcrumbTitle="Shopping" breadcrumbLocation="/store" showBalance />
      <div className="cart-page">
        <CartDisplay items={cart} />
        <StoreButton type="primary" size="large" text="Checkout" disabled={isCheckoutLocked} onClick={onCheckoutButtonClick} />
      </div>
    </>
  );
};

export default CartPage;
