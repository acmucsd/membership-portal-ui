import React from 'react';
import { Avatar, List } from 'antd';
import AdminOrderItem from '../AdminOrderItem';

import './style.less';

interface AdminOrderListProps {
  orders: {
    items: {
      itemName: string;
      quantity: number;
      price: number;
      description: string;
    }[];
  }[];
}

const AdminOrderList: React.FC<AdminOrderListProps> = (props) => {
  const { orders } = props;
  return (
    <div className="order-list">
      {orders.map((order) => {
        return (
          <div className="order">
            <div className="order-list-header">
              <div className="orderer-info">
                <Avatar
                  size={64}
                  src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fguernseypress.com%2Fresizer%2FR9mCfMt5uXWPZ3WKIS7DSb1XgqU%3D%2F1000x0%2Ffilters%3Aquality(100)%2Farc-anglerfish-arc2-prod-guernseypress-mna.s3.amazonaws.com%2Fpublic%2FHWRCBGN5TBGKBFRLSCYPVKDFHM.jpg&f=1&nofb=1"
                >
                  Avatar
                </Avatar>
                <h3 className="name">Test Cat</h3>
              </div>
              <h4 className="order-date">Ordered 02/27/2001</h4>
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
