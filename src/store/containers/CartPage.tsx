import React from 'react';
import { connect } from 'react-redux';

import PageLayout from '../../layout/containers/PageLayout';
import CartPage from '../components/CartPage';

import Config from '../../config';
import history from '../../history';
import { CartItem } from '../../types';
import fetchService from '../../api/fetchService';
import { notify } from '../../utils';

type CartPageContainerProps = {
  cart: { [key: string]: CartItem };
};

const CartPageContainer: React.FC<CartPageContainerProps> = ({ cart }) => {
  const cartArray = Object.values(cart) as CartItem[];

  const verifyCart = async (onFailCallback: () => void) => {
    try {
      const url = `${Config.API_URL}${Config.routes.store.verification}`;
      const payload = cartArray.map(({ option: { uuid }, quantity }) => ({ option: uuid, quantity }));
      await fetchService(url, 'POST', 'json', {
        requiresAuthorization: true,
        payload: JSON.stringify({ order: payload }),
      });
      history.push('/store/checkout');
    } catch (error) {
      onFailCallback();

      if (error.message.includes('The following items were not found: ')) {
        const array = error.message.slice(`The following items were not found: `.length).split(',');

        let message = 'The following items were not found: ';

        for (let i = 0; i < array.length; i += 1) {
          message += cart[array[i]]?.item?.itemName ?? array[i];

          if (i !== array.length - 1) {
            message += ', ';
          }
        }

        message += '. Please remove them from your cart and try again.';

        notify('Cart Error', message);
      } else {
        notify('Cart Error', error.message);
      }
    }
  };

  return (
    <PageLayout>
      <CartPage cart={cartArray} verifyCart={verifyCart} />
    </PageLayout>
  );
};

const mapStateToProps = (state: { [key: string]: any }) => ({ cart: state.store.cart });

export default connect(mapStateToProps)(CartPageContainer);
