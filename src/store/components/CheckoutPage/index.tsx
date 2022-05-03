import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import Config from '../../../config';
import history from '../../../history';
import { useAppDispatch } from '../../../redux/store';
import { PublicOrderPickupEvent } from '../../../types';
import { fetchService, getErrorMessage, notify } from '../../../utils';
import { cartSelector, clearCart, fetchFuturePickupEvents } from '../../storeSlice';
import CartDisplay from '../CartDisplay';
import StoreButton from '../StoreButton';
import StoreDropdown from '../StoreDropdown';
import StoreHeader from '../StoreHeader';
import './style.less';

interface ItemAPIData {
  option: string;
  quantity: number;
}

interface APIData {
  order: ItemAPIData[];
  pickupEvent: string;
}

const CheckoutPage: React.FC = () => {
  const [pickupEvents, setPickupEvents] = useState<PublicOrderPickupEvent[]>([]);
  const [eventUUID, setEventUUID] = useState('');
  const cart = Object.values(useSelector(cartSelector));
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFuturePickupEvents())
      .unwrap()
      .then((resultEvents) => {
        setPickupEvents(resultEvents);
      });
  }, [dispatch]);

  return (
    <>
      <StoreHeader breadcrumb breadcrumbTitle="Cart" breadcrumbLocation="/store/cart" showBalance />
      <div className="checkout-page">
        <CartDisplay items={cart} writable={false} />
        <StoreDropdown
          placeholder="Select a pickup event..."
          options={pickupEvents
            .sort((a, b) => moment(a.start).diff(moment(b.start)))
            .map((event) => ({
              label: `${event.title} from ${moment(event.start).format('MMM D[,] LT')} to ${moment(event.end).format('MMM D[,] LT')}`,
              value: event.uuid,
            }))}
          onChange={(option) => {
            setEventUUID(option.value);
          }}
        />
        <StoreButton
          text="Place Order"
          disabled={eventUUID === ''}
          onClick={async () => {
            const inputData: APIData = { order: [], pickupEvent: eventUUID };
            cart.forEach((item) => {
              inputData.order.push({ option: item.option.uuid, quantity: item.quantity });
            });
            const url = `${Config.API_URL}${Config.routes.store.order}`;
            try {
              const result = await fetchService(url, 'POST', 'json', {
                requiresAuthorization: true,
                payload: JSON.stringify(inputData),
              });
              dispatch(clearCart());
              history.push(`/store/order/${result.order.uuid}`);
            } catch (error) {
              notify('Order placement error', getErrorMessage(error));
              history.push('/store/cart');
            }
          }}
        />
      </div>
    </>
  );
};

export default CheckoutPage;
