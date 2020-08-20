import React from 'react';
import './style.less';
import CheckoutCart from '../../../containers/store/CheckoutCart';

const CheckoutPage = () => {
  return (
    <div className="Checkout-page">
      <CheckoutCart />
    </div>
  );
};

export default CheckoutPage;
