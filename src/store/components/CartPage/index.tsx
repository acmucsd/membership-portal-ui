import { Button, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { ReactComponent as DiamondIcon } from '../../../assets/icons/diamond-icon.svg';
import { MerchandiseItemOptionModel } from '../../../types';
import CartDisplay from '../CartDisplay';
import NavigationBar from '../NavigationBar';
import './style.less';

type Cart = {
  item: MerchandiseItemOptionModel;
  quantity: number;
}[];

type CartPageProps = {
  cart: Cart;
  verifyCart: (onFail: () => void) => void;
};
const CartPage: React.FC<CartPageProps> = ({ cart, verifyCart }) => {
  const [isCheckoutLocked, setIsCheckoutLocked] = useState(false);

  // unlock checkout if cart is modified
  useEffect(() => {
    setIsCheckoutLocked(false);
  }, [cart]);

  const getTotal = (items: Cart) => items.reduce((sum, { item: { price }, quantity }) => sum + price * quantity, 0);

  const renderTotalPrice = (total: number) => {
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
        {renderTotalPrice(getTotal(cart))}
        <Button className="checkout-button" disabled={isCheckoutLocked} onClick={onCheckoutButtonClick}>
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
