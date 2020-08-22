import { COLLECTION_ERROR, FETCH_COLLECTIONS, ThunkActionCreator } from './types';

import Config from '../config';
import Storage from '../storage';
import { notify } from '../utils';

const fetchCollections:ThunkActionCreator = () => async (dispatch) => {
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

export default fetchCollections; // avoid the default exporrt lint rule