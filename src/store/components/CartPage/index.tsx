import { Button, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { ReactComponent as DiamondIcon } from '../../../assets/icons/diamond-icon.svg';
import { CartItem, PublicMerchItemOption } from '../../../types';
import CartDisplay from '../CartDisplay';
import NavigationBar from '../NavigationBar';
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
    <div className="cart-page-container">
      <NavigationBar />
      <div className="cart-page">
        <CartDisplay items={cart} />
        {renderTotalPrice()}
        <Button className="checkout-button" disabled={isCheckoutLocked} onClick={onCheckoutButtonClick}>
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
