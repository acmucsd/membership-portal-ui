import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { Order } from '../../types/merch';
import { history } from '../../store';
import AdminOrderList from '../AdminOrderList';

import './style.less';

interface AdminOrderPageProps {
  apiOrders: Order[];
  setNote: Function;
  setFulfill: Function;
}

const { Search } = Input;

const AdminOrderPage: React.FC<AdminOrderPageProps> = (props) => {
  const { apiOrders, setNote, setFulfill } = props;
  const [searched, setSearched] = useState(false);
  const [searchedOrders, setSearchedOrders] = useState(apiOrders.slice());

  return (
    <div className="admin-orders">
      <div className="store-header">
        <h2 className="title">Orders</h2>
        <Button
          className="admin-redirect-button"
          onClick={() => {
            history.push('/store');
          }}
        >
          <b>Store</b>
        </Button>
      </div>
      <div className="search-section">
        <Search
          placeholder="Search..."
          size="large"
          onSearch={(value) => {
            if (value === '') {
              setSearched(false);
            } else {
              setSearched(true);
              setSearchedOrders(
                apiOrders.filter((element) => {
                  const nameOfOrderUser = `${element.userInfo!.firstName} ${
                    element.userInfo!.lastName
                  }`.toLowerCase();
                  return nameOfOrderUser.includes(value.toLowerCase());
                }),
              );
            }
          }}
        />
        <div className="button-array">
          <Button
            // For this button, we need to remove margin on the left, hence the wonky "first-button class"
            className="tag-button first-button"
            type="primary"
            ghost
            shape="round"
          >
            Completed
          </Button>
          <Button className="tag-button" type="danger" ghost shape="round">
            Cancelled
          </Button>
        </div>
      </div>
      <AdminOrderList
        apiOrders={searched ? searchedOrders : apiOrders}
        setFulfill={setFulfill}
        setNote={setNote}
      />
    </div>
  );
};

export default AdminOrderPage;
