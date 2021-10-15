import React from 'react';

import {} from '../../../types';

interface CartDisplayProps {
  writable?: boolean;
  items: { uuid: string }[];
}

const CartDisplay: React.FC<CartDisplayProps> = (props) => {
  const { writable = false } = props;

  return <div className="cart-display">Cart Display, Writable: {`${writable}`}</div>;
};

export default CartDisplay;
