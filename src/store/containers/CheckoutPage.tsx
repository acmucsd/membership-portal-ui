import React from 'react';
import { connect } from 'react-redux';
import PageLayout from '../../layout/containers/PageLayout';
import { CartItem } from '../../types';
import CheckoutPage from '../components/CheckoutPage';
import Config from '../../config';
import { fetchService, notify } from '../../utils';

type CheckoutPageContainerProps = {
  cart: CartItem[];
};

const CheckoutPageContainer: React.FC<CheckoutPageContainerProps> = ({ cart }) => {
  const getFuturePickup = async (onFailCallback: () => void) => {
    try {
      const url = `${Config.API_URL}${Config.routes.store.pickup.future}`;
      const result = await fetchService(url, 'GET', 'json', {
        requiresAuthorization: true,
      });
      result.pickupEvents.forEach((item, index, arr) => {
        const startDate = new Date(item.start);
        const endDate = new Date(item.end);
        arr[index] = item.title + item.start + item.end;
      });
      console.log(result);
    } catch (error) {
      onFailCallback();
      notify('Get Future Pickup Error', error.message);
    }
  };
  return (
    <PageLayout>
      <CheckoutPage cart={cart} getFuturePickup={getFuturePickup} />
    </PageLayout>
  );
};

const mapStateToProps = (state: { [key: string]: any }) => ({ cart: Object.values(state.store.cart) as CartItem[] });

export default connect(mapStateToProps)(CheckoutPageContainer);
