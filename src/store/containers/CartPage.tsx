import React, { useContext } from 'react';
import backend from '../../backend';
import { AppContext } from '../../context';
import history from '../../history';
import { getErrorMessage, notify } from '../../utils';
import CartPage from '../components/CartPage';
import PageLayout from '../../layout/containers/PageLayout';

const CartPageContainer: React.FC = () => {
  const { cart: oldCart } = useContext(AppContext);
  const cart = Object.values(oldCart);

  const verifyCart = async (onFail: () => void) => {
    try {
      const payload = cart.map(({ option: { uuid }, quantity }) => ({ option: uuid, quantity }));

      await backend.verifyMerchOrder({ order: payload }); // TODO: STEETS

      history.push('/store/checkout');
    } catch (error: any) {
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
