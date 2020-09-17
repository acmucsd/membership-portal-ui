import React from 'react';
import { Avatar, List } from 'antd';
import { Order } from '../../types/merch';
import AdminOrderItem from '../AdminOrderItem';
import bongoSnu from '../../assets/graphics/bongosnu.svg';

import './style.less';

interface AdminOrderListProps {
  apiOrders: Order[];
  setFulfill: Function;
  setNote: Function;
  noteVisible: boolean;
  setNoteVisible: Function;
  setScratchNote: Function;
}

const AdminOrderList: React.FC<AdminOrderListProps> = (props) => {
  const { apiOrders, setFulfill, setNote, noteVisible, setNoteVisible, setScratchNote } = props;
  const orderDateStringOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };

  return (
    <div className="order-list">
      {apiOrders.map((order: Order) => {
        // Placeholder user if no user can be found. Primarily used
        // to satisfy potentially undefined types.
        // If profile picture is empty, we'll use bongoSnu, since it's cute.
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
                    <AdminOrderItem
                      orderItem={item}
                      setFulfill={setFulfill}
                      setNote={setNote}
                      noteVisible={noteVisible}
                      setNoteVisible={setNoteVisible}
                      setScratchNote={setScratchNote}
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
