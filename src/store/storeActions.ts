import { CART_ADD, CART_EDIT, CART_REMOVE, CART_CLEAR } from './storeTypes';
import { fetchService } from '../utils';
import Config from '../config';

import { CartItem, MerchItemOptionMetadata } from '../types';

// COLLECTIONS

export const fetchCollection = (uuid: string) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!uuid) {
        reject(new Error('fetchCollection: Missing required uuid in request.'));
        return;
      }

      const url = `${Config.API_URL}${Config.routes.store.collection}/${uuid}`;
      const data = await fetchService(url, 'GET', 'json', {
        requiresAuthorization: true,
      });

      resolve(data.collection);
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchCollections = () => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${Config.API_URL}${Config.routes.store.collection}`;
      const data = await fetchService(url, 'GET', 'json', {
        requiresAuthorization: true,
      });
      resolve(data.collections);
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteCollection = (uuid: string) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!uuid) {
        reject(new Error('deleteCollection: Missing required uuid in request.'));
        return;
      }

      const url = `${Config.API_URL}${Config.routes.store.collection}/${uuid}`;
      const data = await fetchService(url, 'DELETE', 'json', {
        requiresAuthorization: true,
      });

      resolve(data.collection);
    } catch (error) {
      reject(error);
    }
  });
};

// ITEMS

export const fetchItem = (uuid: string) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!uuid) {
        reject(new Error('fetchItem: Missing required uuid in request.'));
        return;
      }

      const url = `${Config.API_URL}${Config.routes.store.item}/${uuid}`;
      const data = await fetchService(url, 'GET', 'json', {
        requiresAuthorization: true,
      });

      resolve(data.item);
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteItem = (uuid: string) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!uuid) {
        reject(new Error('deleteItem: Missing required uuid in request.'));
        return;
      }

      const url = `${Config.API_URL}${Config.routes.store.item}/${uuid}`;
      const data = await fetchService(url, 'DELETE', 'json', {
        requiresAuthorization: true,
      });

      resolve(data.item);
    } catch (error) {
      reject(error);
    }
  });
};

// ITEM OPTIONS

export const createItemOption = (
  uuid: string,
  option: {
    quantity: number;
    price: number;
    discountPercentage?: number;
    metadata?: MerchItemOptionMetadata;
  },
) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!uuid) {
        reject(new Error('createItemOption: Missing required uuid in request.'));
        return;
      }

      if (!option) {
        reject(new Error('createItemOption: Missing required option in request.'));
        return;
      }

      const url = `${Config.API_URL}${Config.routes.store.option}/${uuid}`;
      const data = await fetchService(url, 'POST', 'json', {
        requiresAuthorization: true,
        payload: JSON.stringify({ option }),
      });

      resolve(data.option);
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteItemOption = (uuid: string) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!uuid) {
        reject(new Error('deleteItemOption: Missing required uuid in request.'));
        return;
      }

      const url = `${Config.API_URL}${Config.routes.store.option}/${uuid}`;
      await fetchService(url, 'DELETE', 'json', {
        requiresAuthorization: true,
      });

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

// ORDERS

export const fetchOrders = () => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${Config.API_URL}${Config.routes.store.orders}`;
      const data = await fetchService(url, 'GET', 'json', {
        requiresAuthorization: true,
      });

      resolve(data.orders);
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchOrder = (uuid: string) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!uuid) {
        reject(new Error('fetchItem: Missing required uuid in request.'));
        return;
      }

      const url = `${Config.API_URL}${Config.routes.store.order}/${uuid}`;
      const data = await fetchService(url, 'GET', 'json', {
        requiresAuthorization: true,
      });

      resolve(data.order);
    } catch (error) {
      reject(error);
    }
  });
};

export const fulfillOrder = (uuid: string, items: { uuid: string; notes: string }[]) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!uuid) {
        reject(new Error('fetchItem: Missing required uuid in request.'));
        return;
      }

      if (!items) {
        reject(new Error('fetchItem: Missing required items in request.'));
        return;
      }

      const url = `${Config.API_URL}${Config.routes.store.order}/${uuid}/fulfill`;
      const data = await fetchService(url, 'POST', 'json', {
        requiresAuthorization: true,
        payload: JSON.stringify({ items }),
      });

      resolve(data.order);
    } catch (error) {
      reject(error);
    }
  });
};

export const rescheduleOrder = (uuid: string, pickupEvent: string) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!uuid) {
        reject(new Error('fetchItem: Missing required uuid in request.'));
        return;
      }

      if (!pickupEvent) {
        reject(new Error('fetchItem: Missing required pickupEvent in request.'));
        return;
      }

      const url = `${Config.API_URL}${Config.routes.store.order}/${uuid}/reschedule`;
      await fetchService(url, 'POST', 'json', {
        requiresAuthorization: true,
        payload: JSON.stringify({ pickupEvent }),
      });

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const cancelOrder = (uuid: string) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!uuid) {
        reject(new Error('fetchItem: Missing required uuid in request.'));
        return;
      }

      const url = `${Config.API_URL}${Config.routes.store.order}/${uuid}/cancel`;
      await fetchService(url, 'POST', 'json', {
        requiresAuthorization: true,
      });

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const cancelAllOrders = () => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${Config.API_URL}${Config.routes.store.order}/cleanup`;
      await fetchService(url, 'POST', 'json', {
        requiresAuthorization: true,
      });

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

// PICKUP EVENTS

export const fetchPickupEvent = (uuid: string) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!uuid) {
        reject(new Error('fetchPickupEvent: Missing required uuid in request.'));
        return;
      }

      const url = `${Config.API_URL}${Config.routes.store.pickup.single}/${uuid}`;
      const data = await fetchService(url, 'GET', 'json', {
        requiresAuthorization: true,
      });

      resolve(data.pickupEvent);
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchPastPickupEvents = () => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${Config.API_URL}${Config.routes.store.pickup.past}`;
      const data = await fetchService(url, 'GET', 'json', {
        requiresAuthorization: true,
      });

      resolve(data.pickupEvents);
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchFuturePickupEvents = () => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${Config.API_URL}${Config.routes.store.pickup.future}`;
      const data = await fetchService(url, 'GET', 'json', {
        requiresAuthorization: true,
      });

      resolve(data.pickupEvents);
    } catch (error) {
      reject(error);
    }
  });
};

export const completePickupEvent = (uuid: string) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!uuid) {
        reject(new Error('completePickupEvent: Missing required uuid in request.'));
        return;
      }

      const url = `${Config.API_URL}${Config.routes.store.order}/pickup/${uuid}/complete`;
      await fetchService(url, 'POST', 'json', {
        requiresAuthorization: true,
      });

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const deletePickupEvent = (uuid: string) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!uuid) {
        reject(new Error('deletePickupEvent: Missing required uuid in request.'));
        return;
      }

      const url = `${Config.API_URL}${Config.routes.store.order}/pickup/${uuid}`;
      await fetchService(url, 'DELETE', 'json', {
        requiresAuthorization: true,
      });

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const cancelPickupEvent = (uuid: string) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!uuid) {
        reject(new Error('deletePickupEvent: Missing required uuid in request.'));
        return;
      }

      const url = `${Config.API_URL}${Config.routes.store.order}/pickup/${uuid}/cancel`;
      await fetchService(url, 'POST', 'json', {
        requiresAuthorization: true,
      });

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

// CART

export const addToCart = (cartItem: CartItem) => (dispatch) => {
  dispatch({
    type: CART_ADD,
    payload: cartItem,
  });
};

export const editInCart = (cartItem: CartItem) => (dispatch) => {
  dispatch({
    type: CART_EDIT,
    payload: cartItem,
  });
};

export const removeFromCart = (cartItem: CartItem) => (dispatch) => {
  dispatch({
    type: CART_REMOVE,
    payload: cartItem,
  });
};

export const clearCart = () => (dispatch) => {
  dispatch({
    type: CART_CLEAR,
  });
};
