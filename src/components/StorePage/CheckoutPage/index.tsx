import { Table, Button, Input } from 'antd';
import React, { useEffect, useState } from 'react';
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
