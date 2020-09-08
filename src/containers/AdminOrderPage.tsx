import React, { useEffect, useReducer } from 'react';
import { connect } from 'react-redux';

import Config from '../config';
import { Order, OrderItem, PatchOrderItemPayload } from '../types/merch';
import Storage from '../storage';
import { notify } from '../utils';
import AdminOrderPage from '../components/AdminOrderPage';
import PageLayout from './PageLayout';
import { User } from '../types/user';

const dateTimeReviver = (key, value) => {
  if (key === 'orderedAt') {
    return new Date(value);
  }
  return value;
};

const adminOrdersReducer = (state: Order[], action) => {
  switch (action.type) {
    case 'FETCH_ORDERS':
      return action.orders;
    case 'FETCH_SPECIFIC_ORDER_USER': {
      const orderIndex = state.findIndex((element) => element.user === action.user.uuid);
      const newState = state.slice();
      newState[orderIndex].userInfo = action.user;
      return newState;
    }
    case 'GET_SPECIFIC_ORDER': {
      const newState = state.slice();
      const orderIndex = newState.findIndex((element) => element.uuid === action.order.uuid);
      if (orderIndex !== -1) {
        newState[orderIndex] = action.order;
      } else {
        newState.push(action.order);
      }
      return newState;
    }
    case 'PATCH_ORDER': {
      const newState = state.slice();
      const patchedOrderIndex = newState.findIndex((element) => element.uuid === action.order);
      const patchedOrderItems = newState[patchedOrderIndex].items.map((item) => {
        const patchedItemIndex = action.newItems.findIndex((element) => element.uuid === item.uuid);
        if (patchedItemIndex !== -1) {
          return {
            ...action.newItems[patchedItemIndex],
            ...item,
          };
        } else {
          return item;
        }
      });
      newState[patchedOrderIndex].items = patchedOrderItems;
      return newState;
    }
    default:
      return state;
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

const getOrder = async (dispatch, orderId: string) => {
  try {
    const specificOrderGetRoute = await fetch(
      `${Config.API_URL + Config.routes.store.order}/${orderId}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Storage.get('token')}`,
        },
      },
    );

    const data = JSON.parse(await specificOrderGetRoute.text(), dateTimeReviver);

    if (!data) throw new Error('Empty response from server');
    if (data.error) throw new Error(data.error.message);
    dispatch({
      type: 'GET_SPECIFIC_ORDER',
      order: data.order,
    });
  } catch (error) {
    notify('Unable to get all orders', error.message);
  }
};

const patchOrder = async (dispatch, order: Order, newItems: PatchOrderItemPayload[]) => {
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

const getAllOrders = async (dispatch) => {
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

const AdminOrderPageContainer: React.FC = () => {
  const [orderList, orderDispatch] = useReducer(adminOrdersReducer, []);

  const setNote = (newItem: OrderItem, note: string) => {
    const newOrder = orderList.find((element: Order) => {
      return element.items.some((item: OrderItem) => item.uuid === newItem.uuid);
    });

    const newOrderItems: PatchOrderItemPayload[] = [];
    newOrderItems.push({
      uuid: newItem.uuid,
      notes: note,
    });

    if (newItem.extras !== undefined) {
      newItem.extras.forEach((extraUuid) => {
        newOrderItems.push({
          uuid: extraUuid,
          notes: note,
        });
      });
    }
    patchOrder(orderDispatch, newOrder, newOrderItems);
  };

  const setFulfill = (newItem: OrderItem) => {
    const newOrder = orderList.find((element: Order) => {
      return element.items.some((item: OrderItem) => item.uuid === newItem.uuid);
    });

    const newOrderItems: PatchOrderItemPayload[] = [];
    newOrderItems.push({
      uuid: newItem.uuid,
      fulfilled: true,
    });

    if (newItem.extras !== undefined) {
      newItem.extras.forEach((extraUuid) => {
        newOrderItems.push({
          uuid: extraUuid,
          fulfilled: true,
        });
      });
    }
    patchOrder(orderDispatch, newOrder, newOrderItems);
  };

  useEffect(() => {
    getAllOrders(orderDispatch);
  }, []);

  return (
    <PageLayout>
      <AdminOrderPage apiOrders={orderList} setNote={setNote} setFulfill={setFulfill} />
    </PageLayout>
  );
};

export default connect(null, null)(AdminOrderPageContainer);
