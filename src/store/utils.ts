import Config from '../config';
import {
  MerchItemOptionMetadata,
  PublicMerchCollection,
  PublicMerchItemWithPurchaseLimits,
  PublicOrder,
  PublicOrderPickupEvent,
  PublicOrderWithItems,
  Uuid,
} from '../types';
import { fetchService } from '../utils';

const collectionURL = (uuid: string = '') => `${Config.API_URL}${Config.routes.store.collection}/${uuid}`;

export const fetchCollection = (uuid: string) =>
  new Promise<PublicMerchCollection>(async (resolve, reject) => {
    if (!uuid) {
      reject(new Error('fetchCollection: Missing required uuid in request.'));
      return;
    }
    try {
      const data = await fetchService(collectionURL(uuid), 'GET', 'json', {
        requiresAuthorization: true,
      });

      resolve(data.collection);
    } catch (error) {
      reject(error);
    }
  });

export const fetchCollections = () =>
  new Promise<PublicMerchCollection[]>(async (resolve, reject) => {
    try {
      const data = await fetchService(collectionURL(), 'GET', 'json', {
        requiresAuthorization: true,
      });

      resolve(data.collections);
    } catch (error) {
      reject(error);
    }
  });

export const deleteCollection = (uuid: string) =>
  new Promise(async (resolve, reject) => {
    if (!uuid) {
      reject(new Error('deleteCollection: Missing required uuid in request.'));
      return;
    }

    try {
      const data = await fetchService(collectionURL(uuid), 'DELETE', 'json', {
        requiresAuthorization: true,
      });
      resolve(data.collection);
    } catch (error) {
      reject(error);
    }
  });

const itemURL = (uuid: string = '') => `${Config.API_URL}${Config.routes.store.item}/${uuid}`;

export const fetchItem = (uuid: string) =>
  new Promise<PublicMerchItemWithPurchaseLimits>(async (resolve, reject) => {
    try {
      if (!uuid) {
        reject(new Error('fetchItem: Missing required uuid in request.'));
        return;
      }

      const data = await fetchService(itemURL(uuid), 'GET', 'json', {
        requiresAuthorization: true,
      });

      resolve(data.item);
    } catch (error) {
      reject(error);
    }
  });

export const deleteItem = (uuid: string) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!uuid) {
        reject(new Error('deleteItem: Missing required uuid in request.'));
        return;
      }

      const data = await fetchService(itemURL(uuid), 'DELETE', 'json', {
        requiresAuthorization: true,
      });

      resolve(data.item);
    } catch (error) {
      reject(error);
    }
  });

// ITEM OPTIONS
const optionURL = (uuid: string = '') => `${Config.API_URL}${Config.routes.store.option}/${uuid}`;

interface Option {
  uuid?: Uuid;
  value: string;
  price: string;
  quantity: string;
  quantityToAdd: string;
  discountPercentage: string;
  metadata?: MerchItemOptionMetadata;
}
export const createItemOption = ({
  uuid,
  option,
}: {
  uuid: string;
  option: {
    quantity: number;
    price: number;
    discountPercentage?: number;
    metadata?: MerchItemOptionMetadata;
  };
}) =>
  new Promise<Option>(async (resolve, reject) => {
    try {
      if (!uuid) {
        reject(new Error('createItemOption: Missing required uuid in request.'));
        return;
      }

      if (!option) {
        reject(new Error('createItemOption: Missing required option in request.'));
        return;
      }

      const data = await fetchService(optionURL(uuid), 'POST', 'json', {
        requiresAuthorization: true,
        payload: JSON.stringify({ option }),
      });

      resolve(data.option);
    } catch (error) {
      reject(error);
    }
  });

export const deleteItemOption = (uuid: string) =>
  new Promise<void>(async (resolve, reject) => {
    try {
      if (!uuid) {
        reject(new Error('deleteItemOption: Missing required uuid in request.'));
        return;
      }

      await fetchService(optionURL(uuid), 'DELETE', 'json', {
        requiresAuthorization: true,
      });

      resolve();
    } catch (error) {
      reject(error);
    }
  });

// ORDERS
const orderURL = (uuid: string = '') => `${Config.API_URL}${Config.routes.store.orders}/${uuid}`;

export const fetchOrders = () =>
  new Promise<PublicOrder[]>(async (resolve, reject) => {
    try {
      const data = await fetchService(orderURL(), 'GET', 'json', {
        requiresAuthorization: true,
      });

      resolve(data.orders);
    } catch (error) {
      reject(error);
    }
  });

export const fetchOrder = (uuid: string) =>
  new Promise<PublicOrderWithItems>(async (resolve, reject) => {
    try {
      if (!uuid) {
        reject(new Error('fetchItem: Missing required uuid in request.'));
        return;
      }

      const data = await fetchService(orderURL(uuid), 'GET', 'json', {
        requiresAuthorization: true,
      });

      resolve(data.order);
    } catch (error) {
      reject(error);
    }
  });

export const fulfillOrder = ({ uuid, items }: { uuid: string; items: { uuid: string; notes: string }[] }) =>
  new Promise<PublicOrderWithItems>(async (resolve, reject) => {
    try {
      if (!uuid) {
        reject(new Error('fetchItem: Missing required uuid in request.'));
        return;
      }

      if (!items) {
        reject(new Error('fetchItem: Missing required items in request.'));
        return;
      }

      const url = `${orderURL(uuid)}/fulfill`;
      const data = await fetchService(url, 'POST', 'json', {
        requiresAuthorization: true,
        payload: JSON.stringify({ items }),
      });

      resolve(data.order);
    } catch (error) {
      reject(error);
    }
  });

export const rescheduleOrder = (uuid: string, pickupEvent: string) =>
  new Promise<void>(async (resolve, reject) => {
    try {
      if (!uuid) {
        reject(new Error('fetchItem: Missing required uuid in request.'));
        return;
      }

      if (!pickupEvent) {
        reject(new Error('fetchItem: Missing required pickupEvent in request.'));
        return;
      }

      const url = `${orderURL(uuid)}/reschedule`;
      await fetchService(url, 'POST', 'json', {
        requiresAuthorization: true,
        payload: JSON.stringify({ pickupEvent }),
      });

      resolve();
    } catch (error) {
      reject(error);
    }
  });

export const cancelOrder = (uuid: string) =>
  new Promise<void>(async (resolve, reject) => {
    try {
      if (!uuid) {
        reject(new Error('fetchItem: Missing required uuid in request.'));
        return;
      }

      const url = `${orderURL(uuid)}/cancel`;
      await fetchService(url, 'POST', 'json', {
        requiresAuthorization: true,
      });

      resolve();
    } catch (error) {
      reject(error);
    }
  });

export const cancelAllOrders = () =>
  new Promise<void>(async (resolve, reject) => {
    try {
      const url = `${orderURL()}cleanup`;
      await fetchService(url, 'POST', 'json', {
        requiresAuthorization: true,
      });

      resolve();
    } catch (error) {
      reject(error);
    }
  });

// PICKUP EVENTS

export const fetchPickupEvent = (uuid: string) =>
  new Promise<PublicOrderPickupEvent>(async (resolve, reject) => {
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

export const fetchPastPickupEvents = () =>
  new Promise(async (resolve, reject) => {
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

export const fetchFuturePickupEvents = () =>
  new Promise<PublicOrderPickupEvent[]>(async (resolve, reject) => {
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

export const completePickupEvent = (uuid: string) =>
  new Promise<void>(async (resolve, reject) => {
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

export const deletePickupEvent = (uuid: string) =>
  new Promise<void>(async (resolve, reject) => {
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

export const cancelPickupEvent = (uuid: string) =>
  new Promise<void>(async (resolve, reject) => {
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
