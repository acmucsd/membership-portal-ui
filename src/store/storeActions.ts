import { CART_ADD, CART_EDIT, CART_REMOVE, ThunkActionCreator } from './storeTypes';
import { fetchService } from '../utils';
import Config from '../config';
import { logoutUser } from '../auth/authActions';
import { CartItem } from '../types';

export const fetchCollection: ThunkActionCreator = (uuid: string) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!uuid) {
        reject(new Error('fetchCollection: Missing required uuid in request.'));
        return;
      }

      const url = `${Config.API_URL}${Config.routes.store.collection}/${uuid}`;
      const data = await fetchService(url, 'GET', 'json', {
        requiresAuthorization: true,
        onFailCallback: () => dispatch(logoutUser()),
      });

      resolve(data.collection);
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchCollections: ThunkActionCreator = () => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${Config.API_URL}${Config.routes.store.collection}`;
      const data = await fetchService(url, 'GET', 'json', {
        requiresAuthorization: true,
        onFailCallback: () => dispatch(logoutUser()),
      });
      resolve(data.collections);
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchItem: ThunkActionCreator = (uuid: string) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!uuid) {
        reject(new Error('fetchItem: Missing required uuid in request.'));
        return;
      }

      const url = `${Config.API_URL}${Config.routes.store.item}/${uuid}`;
      const data = await fetchService(url, 'GET', 'json', {
        requiresAuthorization: true,
        onFailCallback: () => dispatch(logoutUser()),
      });

      resolve(data.item);
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchOrder: ThunkActionCreator = (uuid: string) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!uuid) {
        reject(new Error('fetchItem: Missing required uuid in request.'));
        return;
      }

      const url = `${Config.API_URL}${Config.routes.store.order}/${uuid}`;
      const data = await fetchService(url, 'GET', 'json', {
        requiresAuthorization: true,
        onFailCallback: () => dispatch(logoutUser()),
      });

      resolve(data.order);
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchOrders: ThunkActionCreator = () => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${Config.API_URL}${Config.routes.store.orders}`;
      const data = await fetchService(url, 'GET', 'json', {
        requiresAuthorization: true,
        onFailCallback: () => dispatch(logoutUser()),
      });

      resolve(data.orders);
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchPickupEvent: ThunkActionCreator = (uuid: string) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!uuid) {
        reject(new Error('fetchPickupEvent: Missing required uuid in request.'));
        return;
      }

      const url = `${Config.API_URL}${Config.routes.store.pickupEvent}/${uuid}`;
      const data = await fetchService(url, 'GET', 'json', {
        requiresAuthorization: true,
        onFailCallback: () => dispatch(logoutUser()),
      });

      resolve(data.pickupEvent);
    } catch (error) {
      reject(error);
    }
  });
};

export const addToCart: ThunkActionCreator = (cartItem: CartItem) => (dispatch) => {
  dispatch({
    type: CART_ADD,
    payload: cartItem,
  });
};

export const editInCart: ThunkActionCreator = (cartItem: CartItem) => (dispatch) => {
  dispatch({
    type: CART_EDIT,
    payload: cartItem,
  });
};

export const removeFromCart: ThunkActionCreator = (cartItem: CartItem) => (dispatch) => {
  dispatch({
    type: CART_REMOVE,
    payload: cartItem,
  });
};
