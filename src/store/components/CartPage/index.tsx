import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';

import CartDisplay from '../CartDisplay';
import StoreHeader from '../StoreHeader';

import { ReactComponent as DiamondIcon } from '../../../assets/icons/diamond-icon.svg';
import { CartItem, PublicMerchItemOption } from '../../../types';

import './style.less';
import StoreButton from '../StoreButton';

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

  const renderTotalPrice = () => {
    const getDiscountedPrice = ({ price, discountPercentage }: PublicMerchItemOption) => price * (1 - discountPercentage / 100);
    const total = cart.reduce((sum, { option, quantity }) => sum + getDiscountedPrice(option) * quantity, 0);
    return (
      <div className="total-price-container">
        <Typography className="total-price-label">Total:</Typography>
        <DiamondIcon className="total-price-icon" />
        <Typography className="total-price">{total.toLocaleString()}</Typography>
      </div>
    );
  };

  const onCheckoutButtonClick = () => {
    verifyCart(() => setIsCheckoutLocked(true));
  };

  return (
    <>
      <StoreHeader breadcrumb breadcrumbTitle="Shopping" breadcrumbLocation="/store" showBalance />
      <div className="cart-page-container">
        <div className="cart-page">
          <CartDisplay items={cart} />
          {renderTotalPrice()}
          <StoreButton type="primary" size="large" text="Checkout" disabled={isCheckoutLocked} onClick={onCheckoutButtonClick} />
        </div>
      </div>
    </>
  );
};

export default CartPage;
