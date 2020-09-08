import { COLLECTION_ERROR, FETCH_COLLECTIONS, ThunkActionCreator } from './types';

import Config from '../config';
import Storage from '../storage';
import { notify } from '../utils';
import { Order, OrderItem, PatchOrderItemPayload } from '../types/merch';
import { User } from '../types/user';

const dateTimeReviver = (key, value) => {
  if (key === 'orderedAt') {
    return new Date(value);
  }
  return value;
};

// Commonly, action files in this project have multiple
// expressions each, so default export isn't useful.
// Since store actions will also have additional functions
// later on, this ESLint disable is temporary to pass CI linting.
//
// eslint-disable-next-line import/prefer-default-export
export const fetchCollections: ThunkActionCreator = () => async (dispatch) => {
  try {
    const collectionsRes = await fetch(Config.API_URL + Config.routes.store.collection, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Storage.get('token')}`,
      },
    });

    const data = await collectionsRes.json();

    if (!data) throw new Error('Empty response from server');
    if (data.error) throw new Error(data.error.message);
    dispatch({
      type: FETCH_COLLECTIONS,
      payload: data.collections,
    });
  } catch (error) {
    notify('Unable to fetch store collections!', error.message);
    dispatch({
      type: COLLECTION_ERROR,
      payload: error.message,
    });
  }
};

const fetchUserByID = async (uuid: string) => {
  try {
    const response = await fetch(`${Config.API_URL + Config.routes.user.user}/${uuid}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Storage.get('token')}`,
      },
    });

    const data = await response.json();
    if (!data) throw new Error('Empty response from server');
    if (data.error) throw new Error(data.error.message);

    return data.user;
  } catch (error) {
    notify('Unable to fetch order user', error.message);
  }
  return {};
};

export const patchOrder = async (dispatch, order: Order, newItems: PatchOrderItemPayload[]) => {
  try {
    const orderPatchRoute = await fetch(Config.API_URL + Config.routes.store.order, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Storage.get('token')}`,
      },
      body: JSON.stringify({ items: newItems }),
    });

    const data = await orderPatchRoute.json();

    if (!data) throw new Error('Empty response from server');
    if (data.error) throw new Error(data.error.message);
    dispatch({
      type: 'PATCH_ORDER',
      order: order.uuid,
      newItems: newItems,
    });
  } catch (error) {
    notify('Unable to update order', error.message);
  }
};

export const getAllOrders = async (dispatch) => {
  try {
    const orderGetRoute = await fetch(Config.API_URL + Config.routes.store.order, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Storage.get('token')}`,
      },
    });

    const response = await orderGetRoute.text();
    const data = JSON.parse(response, dateTimeReviver);

    const orderUsersRequests: Promise<User>[] = [];
    for (let i = 0; i < data.orders.length; i += 1) {
      orderUsersRequests.push(fetchUserByID(data.orders[i].user));
    }

    const orderUsers = await Promise.all(orderUsersRequests);

    for (let i = 0; i < orderUsersRequests.length; i += 1) {
      data.orders[i].userInfo = orderUsers[i];
    }

    if (!data) throw new Error('Empty response from server');
    if (data.error) throw new Error(data.error.message);
    dispatch({
      type: 'FETCH_ORDERS',
      orders: data.orders,
    });
  } catch (error) {
    notify('Unable to get all orders', error.message);
  }
};
