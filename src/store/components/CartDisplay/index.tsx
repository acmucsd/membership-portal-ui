import React from 'react';

import { PublicMerchItemOption } from '../../../types';

interface CartDisplayProps {
  writable?: boolean;
  items: {
    item: PublicMerchItemOption;
    quantity: number;
  }[];
}

const CartDisplay: React.FC<CartDisplayProps> = (props) => {
  const { writable = false, items } = props;

  return (
    <div className="cart-display">
      Cart Display, Writable: {`${writable}`}, Items: {`${JSON.stringify(items)}`}
    </div>
  );
};

export default CartDisplay;
