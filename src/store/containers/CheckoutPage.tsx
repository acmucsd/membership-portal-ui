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

enum Months {
  Jan,
  Feb,
  Mar,
  Apr,
  May,
  Jun,
  Jul,
  Aug,
  Sep,
  Oct,
  Nov,
  Dec,
}

enum TimeOfDay {
  AM,
  PM,
}

const parseDate = (date: Date) => {
  const month = Months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const hour = date.getHours() % 12;
  const minute = date.getMinutes();
  const timeOfDay = TimeOfDay[Math.floor(date.getHours() / 12)];
  return `${month} ${day}, ${year} @ ${hour}:${minute} ${timeOfDay}`;
};

const CheckoutPageContainer: React.FC<CheckoutPageContainerProps> = ({ cart }) => {
  const getFuturePickup = async (onFailCallback: () => void) => {
    try {
      const url = `${Config.API_URL}${Config.routes.store.pickup.future}`;
      const result = await fetchService(url, 'GET', 'json', {
        requiresAuthorization: true,
      });
      result.pickupEvents.forEach((item, index, arr) => {
        const startDate = parseDate(new Date(item.start));
        const endDate = parseDate(new Date(item.end));
        // eslint-disable-next-line no-param-reassign
        arr[index] = `${item.title}: ${startDate} to ${endDate}`;
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
