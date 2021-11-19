import React from 'react';

import CartDisplay from '../CartDisplay';
import NavigationBar from '../NavigationBar';

import './style.less';

const CartPage = () => {
  return (
    <div className="cart-page">
      <NavigationBar />
      <CartDisplay items={[]} />
    </div>
  );
};

export default CartPage;