import React from 'react';
import { Avatar, List } from 'antd';
import AdminOrderItem from '../AdminOrderItem';
import bongoSnu from '../../assets/graphics/bongosnu.svg';

import './style.less';

interface AdminOrderListProps {
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
}

const AdminOrderList: React.FC<AdminOrderListProps> = (props) => {
  const { orders } = props;
  const orderDateStringOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
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
                    <AdminOrderItem orderItem={item} />
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
