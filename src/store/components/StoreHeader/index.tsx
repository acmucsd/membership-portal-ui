import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BreadcrumbArrow from '../../../assets/icons/breadcrumb-arrow.svg';
import CartIcon from '../../../assets/icons/cart-icon.svg';
import { authSelector } from '../../../auth/authSlice';
import DiamondDisplay from '../DiamondDisplay';
import './style.less';

interface StoreHeaderProps {
  breadcrumb?: boolean;
  breadcrumbTitle?: string;
  breadcrumbLocation?: string;
  showBalance?: boolean;
  showCart?: boolean;
  title?: string;
}

const StoreHeader: React.FC<StoreHeaderProps> = (props) => {
  const { breadcrumb, breadcrumbTitle, breadcrumbLocation, showBalance, showCart, title = 'Diamond Outfitters' } = props;
  const {
    profile: { credits },
  } = useSelector(authSelector);

  return (
    <div className="store-header">
      {breadcrumb ? (
        <Link to={breadcrumbLocation || ''}>
          <div className="store-heder-breadcrumb">
            <img className="store-header-breadcrumb-arrow" src={BreadcrumbArrow} alt="Breadcrumb Arrow" />
            <span className="store-header-breadcrumb-text">{`Back${breadcrumbTitle ? ` to ${breadcrumbTitle}` : ''}`}</span>
          </div>
        </Link>
      ) : (
        <span className="store-header-title">{title}</span>
      )}
      {showBalance || showCart ? (
        <div className="store-header-right">
          {showBalance && <DiamondDisplay prefix="Balance: " value={credits} />}
          {showCart && (
            <Link to="/store/cart">
              <div className="store-header-cart">
                <img className="store-header-cart-icon" src={CartIcon} alt="Cart Icon" />
                <span className="store-header-cart-text">Cart</span>
              </div>
            </Link>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default StoreHeader;
