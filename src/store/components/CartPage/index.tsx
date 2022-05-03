import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { cartSelector } from '../../storeSlice';
import CartDisplay from '../CartDisplay';
import StoreButton from '../StoreButton';
import StoreHeader from '../StoreHeader';
import './style.less';

type CartPageProps = {
  verifyCart: (onFail: () => void) => void;
};

const CartPage: React.FC<CartPageProps> = ({ verifyCart }) => {
  const [isCheckoutLocked, setIsCheckoutLocked] = useState(false);
  const cart = Object.values(useSelector(cartSelector));

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
        <CartDisplay items={cart} writable />
        <StoreButton type="primary" size="large" text="Checkout" disabled={isCheckoutLocked} onClick={onCheckoutButtonClick} />
      </div>
    </>
  );
};

export default CartPage;
