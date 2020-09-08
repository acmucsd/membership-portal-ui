import React, { useEffect, useReducer } from 'react';
import { connect } from 'react-redux';

import Config from '../config';
import Storage from '../storage';
import { notify } from '../utils';
import { User } from '../types/user';
import { Order, OrderItem, PatchOrderItemPayload } from '../types/merch';
import { getAllOrders, patchOrder } from '../actions/storeActions';
import { adminOrdersReducer } from '../reducers/AdminOrderReducer';

import AdminOrderPage from '../components/AdminOrderPage';
import PageLayout from './PageLayout';

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
