import React from 'react';
import { Link } from 'react-router-dom';

import BreadcrumbArrow from '../../../assets/icons/breadcrumb-arrow.svg';
import CartIcon from '../../../assets/icons/cart-icon.svg';

import DiamondDisplay from '../DiamondDisplay';

import './style.less';

interface StoreHeaderProps {
  breadcrumb?: boolean;
  breadcrumbTitle?: string;
  breadcrumbLocation?: string;
  showBalance?: boolean;
  showCart?: boolean;
}

const StoreHeader: React.FC<StoreHeaderProps> = (props) => {
  const { breadcrumb, breadcrumbTitle, breadcrumbLocation, showBalance, showCart } = props;

  return (
    <div className="store-header">
      {breadcrumb ? (
        <div className="store-heder-breadcrumb">
          <img className="store-header-breadcrumb-arrow" src={BreadcrumbArrow} alt="Breadcrumb Arrow" />
          <span className="store-header-breadcrumb-text">
            <Link to={breadcrumbLocation || ''}>{`Back${breadcrumbTitle ? ` to ${breadcrumbTitle}` : ''}`}</Link>
          </span>
        </div>
      ) : (
        <span className="store-header-title">Diamond Outfitters</span>
      )}
      {showBalance || showCart ? (
        <div className="store-header-right">
          {showBalance && <DiamondDisplay prefix="Balance: " value={5000} />}
          {showCart ? (
            <Link to="/store/cart">
              <div className="store-header-cart">
                <span className="store-header-cart-text"> Cart</span>
                <div className="store-header-cart-pics">
                  <img className="store-headercart-icon" src={CartIcon} alt="Cart Icon" />
                  {2 - 1 !== 0 && <div className="store-header-cart-badge">1{/* {cartSize} */}</div>}
                </div>
              </div>
            </Link>
          ) : (
            <span className="store-header-cart-placeholder" />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default StoreHeader;
