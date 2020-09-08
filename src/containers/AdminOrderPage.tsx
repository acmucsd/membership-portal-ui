import React, { useState, useEffect, useReducer } from 'react';
import { connect } from 'react-redux';

import Config from '../config';
import {
  Order,
  OrderItem,
  MerchItem,
  MerchCollection,
  PatchOrderItemPayload,
} from '../types/merch';
import Storage from '../storage';
import { notify } from '../utils';
import AdminOrderPage from '../components/AdminOrderPage';
import PageLayout from './PageLayout';
import { User } from '../types/user';

const dateTimeReviver = (key, value) => {
  if (key === 'orderedAt') {
    return new Date(value);
  } else {
    return value;
  }
};

const adminOrdersReducer = (state: Order[], action) => {
  switch (action.type) {
    case 'FETCH_ORDERS':
      return action.orders;
    case 'GET_SPECIFIC_ORDER': {
      const orderIndex = state.findIndex((element) => element.uuid === action.order.uuid);
      if (orderIndex !== -1) {
        state[orderIndex] = action.order;
      } else {
        state.push(action.order);
      }
      return state;
    }
    default:
      return state;
  }
};

const adminOrderUsersReducer = (state: User[], action) => {
  switch (action.type) {
    case 'FETCH_ORDER_USERS':
      return action.orderers;
    case 'FETCH_SPECIFIC_USER':
      state.push(action.user);
      return state;
    default:
      return state;
  }
};

const fetchUserByID = async (dispatch, uuid: string) => {
  try {
    const response = await fetch(`${Config.API_URL + Config.routes.user.user}/${uuid}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Storage.get('token')}`,
      },
    });

    const status = await response.status;
    if (status === 401 || status === 403) {
      // TODO: Logout user.
      return;
    }

    const data = await response.json();
    if (!data) throw new Error('Empty response from server');
    if (data.error) throw new Error(data.error.message);

    dispatch({
      type: 'FETCH_SPECIFIC_USER',
      user: {
        ...data.user,
        uuid: uuid,
      },
    });
  } catch (error) {
    notify('Unable to fetch order user', error.message);
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
    getOrder(dispatch, order.uuid);
  } catch (error) {
    notify('Unable to update order', error.message);
  }
};

const getOrder = async (dispatch, orderId: string) => {
  try {
    const specificOrderGetRoute = await fetch(
      Config.API_URL + Config.routes.store.order + `/${orderId}`,
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
      order: data,
    });
  } catch (error) {
    notify('Unable to get all orders', error.message);
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

const getAllOrderUsers = (dispatch, orders: Order[]) => {
  const orderUsers: User[] = [];
  orders.forEach((order) => {
    fetchUserByID(dispatch, order.user);
  });
};

const testProps = {
  orders: [
    {
      uuid: '1784089c-94e1-433f-ac67-e114dd124b9e',
      orderedAt: new Date('February 27, 2001 12:00:00'),
      items: [
        {
          uuid: 'f5ac9abe-8062-487c-9156-52adbe381591',
          item: 'd22ec7bf-acae-40d8-b656-c640cf5b949c',
          itemName: 'Example different item',
          price: 19500,
          quantity: 2,
          fulfilled: false,
          description: 'Self-explanatory.',
          notes: '',
        },
        {
          uuid: '5b80b81c-6947-4445-baa1-2c1d9f373856',
          item: '0ff45a29-fbcf-4f12-8c11-6f0da895c01f',
          itemName: 'ACM Mug',
          price: 2500,
          quantity: 1,
          fulfilled: false,
          description: 'mug',
          notes: '',
        },
      ],
    },
    {
      uuid: '72a08e11-0942-440c-a2dd-91abe2ad09ac',
      orderedAt: new Date('May 30, 2020 12:00:00'),
      items: [
        {
          uuid: 'eeb77041-4566-4e0c-9e89-a58e0b7b2afd',
          item: 'd477eea8-0d45-4fcb-a598-66b495f49fce',
          itemName: 'Unisex Raccoon Print Shell Jacket - M',
          price: 21300,
          quantity: 1,
          fulfilled: false,
          description: 'Self-explanatory.',
          notes: '',
        },
        {
          uuid: 'df08d112-7e8d-4103-9012-cb26cb3012ab',
          item: 'd477eea8-0d45-4fcb-a598-66b495f49fce',
          itemName: 'ACM Mug 2?!',
          quantity: 30,
          fulfilled: false,
          price: 30000,
          description: 'mug',
          notes: '',
        },
      ],
    },
  ],
};

const AdminOrderPageContainer: React.FC = () => {
  const [orderList, orderDispatch] = useReducer(adminOrdersReducer, []);
  const [orderUsersList, orderUsersDispatch] = useReducer(adminOrderUsersReducer, []);

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

  useEffect(() => {
    getAllOrderUsers(orderUsersDispatch, orderList);
  }, [orderList]);

  return (
    <PageLayout>
      <AdminOrderPage
        apiOrders={orderList}
        apiOrderUsers={orderUsersList}
        setNote={setNote}
        setFulfill={setFulfill}
      />
    </PageLayout>
  );
};

export default connect(null, null)(AdminOrderPageContainer);
