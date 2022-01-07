import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
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
      const eventMap = {};
      result.pickupEvents.forEach((item, index, arr) => {
        const startDate = moment(item.start).format('MMM D, YYYY [@] hh[:]mm a');
        const endDate = moment(item.end).format('MMM D, YYYY [@] hh[:]mm a');
        eventMap[`${item.title}: from ${startDate} to ${endDate}`] = arr[index].uuid;
      });
      return eventMap;
    } catch (error) {
      onFailCallback();
      notify('Get Future Pickup Error', error.message);
      return undefined;
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
