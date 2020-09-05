import React from 'react';
import { Avatar, List } from 'antd';
import AdminOrderItem from '../AdminOrderItem';
import bongoSnu from '../../assets/graphics/bongosnu.svg';

import './style.less';

interface AdminOrderListProps {
  apiOrders: {
    uuid: string;
    orderedAt: Date;
    items: {
      uuid: string;
      item: string;
      itemName: string;
      fulfilled: boolean;
      price: number;
      description: string;
      notes: string;
    }[];
  }[];
  orders: {
    uuid: string;
    orderedAt: Date;
    items: {
      uuid: string;
      itemName: string;
      quantity: number;
      fulfilled: boolean;
      price: number;
      description: string;
      notes: string;
    }[];
  }[];
  triggerModal: Function;
  setFulfill: Function;
  setNote: Function;
}

const AdminOrderList: React.FC<AdminOrderListProps> = (props) => {
  const { orders, apiOrders, triggerModal, setFulfill, setNote } = props;
  const orderDateStringOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };

  apiOrders.forEach((element) => {
    if (element.items.length == 1) {
      return;
    }
    const firstOrderItem = [
      {
        ...element.items[0],
        quantity: 1,
      },
    ];

    const orderItemsWithoutFirst = element.items.slice(1);
    const groupedOrderItems = orderItemsWithoutFirst.reduce((acc, curr) => {
      console.log('Current item: ', curr);
      console.log('Current acc: ', acc);
      const existingItemIndex = acc.findIndex((itemElement) => itemElement.item === curr.item);
      if (existingItemIndex !== -1) {
        acc[existingItemIndex].quantity += 1;
      } else {
        acc = [
          ...acc,
          {
            ...curr,
            quantity: 1,
          },
        ];
      }
      return acc;
    }, firstOrderItem);
  });
  return (
    <div className="order-list">
      {orders.map((order) => {
        return (
          <div key={order.uuid} className="order">
            <div className="order-list-header">
              <div className="orderer-info">
                <Avatar size={64} src={bongoSnu}>
                  Avatar
                </Avatar>
                <h3 className="name">Test Cat</h3>
              </div>
              <h4 className="order-date">
                Ordered {order.orderedAt.toLocaleDateString('en-US', orderDateStringOptions)}
              </h4>
            </div>
            <div className="order-items">
              <List
                bordered
                dataSource={order.items}
                renderItem={(item) => (
                  <List.Item>
                    <AdminOrderItem
                      orderItem={item}
                      triggerModal={triggerModal}
                      setFulfill={setFulfill}
                      setNote={setNote}
                    />
                  </List.Item>
                )}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminOrderList;
