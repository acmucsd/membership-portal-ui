import React from 'react';
import { useSelector } from 'react-redux';
import Config from '../../config';
import history from '../../history';
import PageLayout from '../../layout/containers/PageLayout';
import { fetchService, getErrorMessage, notify } from '../../utils';
import CartPage from '../components/CartPage';
import { cartSelector } from '../storeSlice';

const CartPageContainer: React.FC = () => {
  const cart = Object.values(useSelector(cartSelector));

  const verifyCart = async (onFail: () => void) => {
    try {
      const url = `${Config.API_URL}${Config.routes.store.verification}`;
      const payload = cart.map(({ option: { uuid }, quantity }) => ({ option: uuid, quantity }));
      await fetchService(url, 'POST', 'json', {
        requiresAuthorization: true,
        payload: JSON.stringify({ order: payload }),
      });
      history.push('/store/checkout');
    } catch (error) {
      onFail();

      if (getErrorMessage(error).includes('The following items were not found: ')) {
        const array = getErrorMessage(error).slice(`The following items were not found: `.length).split(',');

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
        notify('Cart Error', getErrorMessage(error));
      }
    }
  };

  return (
    <PageLayout>
      <CartPage verifyCart={verifyCart} />
    </PageLayout>
  );
};

export default CartPageContainer;
