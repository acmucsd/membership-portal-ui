import React from 'react';
import { Avatar, List } from 'antd';
import { Order, OrderItem } from '../../types/merch';
import AdminOrderItem from '../AdminOrderItem';
import bongoSnu from '../../assets/graphics/bongosnu.svg';

import './style.less';

interface AdminOrderListProps {
  apiOrders: Order[];
  setFulfill: Function;
  setNote: Function;
}

const AdminOrderList: React.FC<AdminOrderListProps> = (props) => {
  const { apiOrders, setFulfill, setNote } = props;
  const orderDateStringOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };

  const refinedApiOrders: Order[] = apiOrders.map((element) => {
    if (element.items.length === 1) {
      return element;
    }

    if (element.items[0].quantity !== undefined) {
      return element;
    }

    const firstOrderItem: OrderItem[] = [
      {
        ...element.items[0],
        quantity: 1,
      },
    ];

    const newElement = element;

    const orderItemsWithoutFirst = element.items.slice(1);
    const groupedOrderItems = orderItemsWithoutFirst.reduce((acc, curr) => {
      let newAcc = acc.slice();
      const existingItemIndex = newAcc.findIndex(
        (itemElement) => itemElement.item.uuid === curr.item.uuid,
      );
      if (existingItemIndex !== -1) {
        if (newAcc[existingItemIndex].quantity === undefined) {
          newAcc[existingItemIndex].quantity = 1;
        }
        newAcc[existingItemIndex].quantity! += 1;
        if (newAcc[existingItemIndex].extras === undefined) {
          newAcc[existingItemIndex].extras = [];
        }
        newAcc[existingItemIndex].extras!.push(curr.uuid);
      } else {
        newAcc = [
          ...acc,
          {
            ...curr,
            extras: [],
            quantity: 1,
          },
        ];
      }
      return newAcc;
    }, firstOrderItem);
    newElement.items = groupedOrderItems;
    return newElement;
  });
  return (
    <div className="order-list">
      {refinedApiOrders.map((order: Order) => {
        let orderUser = {
          firstName: 'No',
          graduationYear: 2024,
          major: 'CS',
          bio: '',
          points: 0,
          lastName: 'User',
          profilePicture: bongoSnu,
        };
        if (order.userInfo !== undefined) {
          orderUser = order.userInfo;
        }
        return (
          <div key={order.uuid} className="order">
            <div className="order-list-header">
              <div className="orderer-info">
                <Avatar size={64} src={orderUser.profilePicture || bongoSnu}>
                  Avatar
                </Avatar>
                <h3 className="name">{`${orderUser.firstName} ${orderUser.lastName}`}</h3>
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
                    <AdminOrderItem orderItem={item} setFulfill={setFulfill} setNote={setNote} />
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
