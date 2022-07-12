import { MerchItemOption, PublicOrderWithItems } from '../api';
import backend from '../backend';

export const fetchCollection = async (uuid: string) => {
  const data = await backend.getOneMerchCollection(uuid);
  return data.collection;
};

export const fetchCollections = async () => {
  const data = await backend.getAllMerchCollections();
  return data.collections;
};

export const deleteCollection = async (uuid: string) => {
  await backend.deleteMerchCollection(uuid);
};

export const fetchItem = async (uuid: string) => {
  const data = await backend.getOneMerchItem(uuid);
  return data.item;
};

export const deleteItem = async (uuid: string) => {
  await backend.deleteMerchItem(uuid);
};

// ITEM OPTIONS

export const createItemOption = async ({ uuid, option }: { uuid: string; option: MerchItemOption }) => {
  const data = await backend.createMerchItemOption(uuid, { option });
  return data.option;
};

export const deleteItemOption = async (uuid: string) => {
  await backend.deleteMerchItemOption(uuid);
};

// ORDERS

export const fetchOrders = async () => {
  const data = await backend.getMerchOrdersForCurrentUser();
  return data.orders;
};

export const fetchOrder = async (uuid: string) => {
  const data = await backend.getOneMerchOrder(uuid);
  return data.order;
};

// TODO: Check if PublicOrderWithItems is the correct promise type here
export const fulfillOrder = async ({ uuid, items }: { uuid: string; items: { uuid: string; notes: string }[] }) => {
  const data = await backend.fulfillMerchOrderItems(uuid, { items });
  return data.order as PublicOrderWithItems;
};

export const rescheduleOrder = async (uuid: string, pickupEvent: string) => {
  await backend.rescheduleOrderPickup(uuid, { pickupEvent });
};

// TODO: Add a promise type
export const cancelOrder = async (uuid: string) => {
  await backend.cancelMerchOrder(uuid);
};

export const cancelAllOrders = async () => {
  await backend.cancelAllPendingMerchOrders();
};

// PICKUP EVENTS

export const fetchPickupEvent = async (uuid: string) => {
  const data = await backend.getOnePickupEvent(uuid);
  return data.pickupEvent;
};

export const fetchPastPickupEvents = async () => {
  const data = await backend.getPastPickupEvents();
  return data.pickupEvents;
};

export const fetchFuturePickupEvents = async () => {
  const data = await backend.getFuturePickupEvents();
  return data.pickupEvents;
};

export const completePickupEvent = async (uuid: string) => {
  const data = await backend.completePickupEvent(uuid);
  return data.orders;
};

export const deletePickupEvent = async (uuid: string) => {
  await backend.deletePickupEvent(uuid);
};

export const cancelPickupEvent = async (uuid: string) => {
  await backend.cancelPickupEvent(uuid);
};
