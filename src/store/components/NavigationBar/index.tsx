import { Button } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import CreditsDisplay from '../CreditsDisplay';

import BackArrow from '../../../assets/icons/back-arrow.svg';
import CartIcon from '../../../assets/icons/cart-icon.svg';

import './style.less';

interface NavigationBarProps {
  home: boolean;
  balance: number;
  cartSize: number;
}

const NavigationBar: React.FC<NavigationBarProps> = (props) => {
  const { home, balance, cartSize } = props;

  const history = useHistory();
  return (
    <div className="navigation-bar">
      {home ? (
        <h1 className="store-title">Diamond Outfitters</h1>
      ) : (
        <button className="breadcrumbs" type="button" onClick={() => history.push('/store')}>
          <img className="breadcrumb-arrow" src={BackArrow} alt="Back Arrow" />
          <p className="breadcrumb-text">Back to Shopping</p>
        </button>
      )}
      <div className="right-group">
        <CreditsDisplay value={balance} />
        <Button className="checkout-button" onClick={() => history.push('/store/cart')}>
          Check Out
          <div className="cart-pics">
            <img className="cart-icon" src={CartIcon} alt="Cart Icon" />
            {cartSize !== 0 && <div className="cart-badge">{cartSize}</div>}
          </div>
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: { [key: string]: any }) => ({
  cart: state.store.cart,
});

export default connect(mapStateToProps, {})(NavigationBar);
