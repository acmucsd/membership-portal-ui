import React, { useState, useEffect, useReducer } from 'react';
import { connect } from 'react-redux';

import Config from '../config';
import Storage from '../storage';
import { notify } from '../utils';
import AdminOrderPage from '../components/AdminOrderPage';
import PageLayout from './PageLayout';

// Dummy functions to log into console effects from
// actions from the container.
//
// Ideally, we will replace these functions with ones
// that directly update the order item on the API.
//
// The console calls are placeholders as of now and will
// be removed when middleware is attached to the container.
interface OrderItem {
  uuid: string;
  item: string;
  order: string;
  itemName: string;
  fulfilled: boolean;
  price: number;
  description: string;
  notes: string;
}

interface Order {
  uuid: string;
  orderedAt: Date;
  items: OrderItem[];
}

const adminOrderPageReducer = (state, action) => {
  const newState = state.slice();
  switch (action.type) {
    case 'FETCH_ORDERS':
      return action.orders;
    case 'UPDATE_ORDER':
      newState[state.findIndex((order) => action.order.uuid === order.uuid)] = action.order;
      return newState;
    default:
      return state;
  }
};

const patchOrder = async (dispatch, order) => {
  try {
    const orderPatchRoute = await fetch(Config.API_URL + Config.routes.store.order, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Storage.get('token')}`,
      },
      body: JSON.stringify({ items: order.items }),
    });

    const data = await orderPatchRoute.json();

    if (!data) throw new Error('Empty response from server');
    if (data.error) throw new Error(data.error.message);
    dispatch({
      type: 'UPDATE_ORDER',
      order,
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

    const data = await orderGetRoute.json();

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
  const [noteVisible, setNoteVisible] = useState(false);
  const [scratchNote, setScratchNote] = useState('');
  const [orderList, dispatch] = useReducer(adminOrderPageReducer, []);

  const setNote = (item: OrderItem, note: string) => {
    const newOrder = orderList.find((element) => element.uuid === item.order);
    const newOrderItems = newOrder.items.map((element) => {
      if (element.item === item.item) {
        return {
          ...item,
          note: note,
        };
      }
      return element;
    });
    patchOrder(dispatch, {
      ...newOrder,
      items: newOrderItems,
    });
  };

  const setFulfill = (item: OrderItem, fulfilled: boolean) => {
    const newOrder = orderList.find((element) => element.uuid === item.order);
    const newOrderItems = newOrder.items.map((element) => {
      if (element.item === item.item) {
        return {
          ...item,
          fulfilled: fulfilled,
        };
      }
      return element;
    });
    patchOrder(dispatch, {
      ...newOrder,
      items: newOrderItems,
    });
  };

  useEffect(() => {
    getAllOrders(dispatch);
  }, []);

  return (
    <PageLayout>
      <AdminOrderPage
        orders={testProps.orders}
        apiOrders={orderList}
        setNote={setNote}
        setFulfill={setFulfill}
        noteVisible={noteVisible}
        setNoteVisible={setNoteVisible}
        scratchNote={scratchNote}
        setScratchNote={setScratchNote}
      />
    </PageLayout>
  );
};

export default connect(null, null)(AdminOrderPageContainer);
