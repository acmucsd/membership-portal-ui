import React from 'react';
import CartDisplay from '../CartDisplay';
import NavigationBar from '../NavigationBar';

const CheckoutPage: React.FC = () => {
  return (
    <div className="cart-page">
      <NavigationBar />
      <CartDisplay items={[]} />
    </div>
  );
};

export default CheckoutPage;