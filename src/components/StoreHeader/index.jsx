import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.less';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const StoreHeader = (props) => {
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

const CartLink = (props) => {
  const { cartItems } = props;
  return (
    <Link to="/cart" className="cart-link">
      Checkout
      <span className="cart-icon">
        {cartItems > 0 ? (
          <span className="cart-quantity">{cartItems}</span>
        ) : (
          ''
        )}
      </span>
    </Link>
  );
};

StoreHeader.propTypes = {
  title: PropTypes.string.isRequired,
  points: PropTypes.string.isRequired,
  cartItems: PropTypes.number.isRequired,
  hideCart: PropTypes.bool,
};

StoreHeader.defaultProps = {
  hideCart: true,
};

CartLink.propTypes = {
  cartItems: PropTypes.number.isRequired,
};

export default StoreHeader;
// TODO add proptypes
