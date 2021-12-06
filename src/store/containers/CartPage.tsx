import React from 'react';
import { connect } from 'react-redux';
import Config from '../../config';
import PageLayout from '../../layout/containers/PageLayout';
import { history } from '../../redux_store';
import { MerchandiseItemOptionModel } from '../../types';
import { fetchService, notify } from '../../utils';
import CartPage from '../components/CartPage';

type CartPageContainerProps = {
  cart: { item: MerchandiseItemOptionModel; quantity: number }[];
};

const CartPageContainer: React.FC<CartPageContainerProps> = ({ cart }) => {
  const verifyCart = async (onFailCallback: () => void) => {
    try {
      const url = `${Config.API_URL}${Config.routes.store.verification}`;
      const payload = Object.entries(cart).map(([option, quantity]) => ({ option, quantity }));
      await fetchService(url, 'POST', 'json', {
        requiresAuthorization: true,
        // payload: JSON.stringify({ order: payload }),
        payload: JSON.stringify(payload),
      });
      history.push('/store/checkout');
    } catch (error) {
      onFailCallback();
      notify('Cart Error', error.error);
    }
  };

  return (
    <PageLayout>
      <CartPage cart={cart} verifyCart={verifyCart} />
    </PageLayout>
  );
};

const mapStateToProps = (state: { [key: string]: any }) => ({ cart: state.store.cart });

export default connect(mapStateToProps)(CartPageContainer);
