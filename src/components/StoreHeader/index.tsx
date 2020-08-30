import React from 'react';
import { Link } from 'react-router-dom';

import './style.less';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

interface StoreHeaderProps {
  title: object;
  points: number;
  cartItems: number;
  hideCart?: boolean;
  handleGoBack: object;
}

const StoreHeader: React.FC<StoreHeaderProps> = (props) => {
  const { title, points, cartItems, hideCart } = props;
  return (
    <div className="store-header">
      {title}
      <div className="point-checkout">
        <p className="points">{numberWithCommas(points)}</p>
        {!hideCart ? <CartLink cartItems={cartItems} /> : ''}
      </div>
    </div>
  );
};

interface CartLinkProps {
  cartItems: number;
}

const CartLink: React.FC<CartLinkProps> = (props) => {
  const { cartItems } = props;
  return (
    <Link to="/cart" className="cart-link">
      Checkout
      <span className="cart-icon">
        {cartItems > 0 ? <span className="cart-quantity">{cartItems}</span> : ''}
      </span>
    </Link>
  );
};

export default StoreHeader;
