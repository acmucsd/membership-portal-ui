import { CART_ADDITION, ThunkActionCreator } from './storeTypes';
import { fetchService } from '../utils';
import Config from '../config';
import { logoutUser } from '../auth/authActions';

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

export const addToCart: ThunkActionCreator = (uuid: string, quantity: number) => (dispatch) => {
  dispatch({
    type: CART_ADDITION,
    payload: { uuid, quantity },
  });
};
