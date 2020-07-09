import React from 'react';
import { Button, Input } from 'antd';
import { history } from '../../store';
import AdminOrderList from '../AdminOrderList';

import './style.less';

const { Search } = Input;

const testProps = {
  orders: [
    {
      items: [
        {
          itemName: 'Example different item',
          price: 19500,
          quantity: 2,
          description: 'Self-explanatory.',
        },
        {
          itemName: 'ACM Mug',
          price: 2500,
          quantity: 1,
          description: 'mug',
        },
      ],
    },
    {
      items: [
        {
          itemName: 'Unisex Raccoon Print Shell Jacket - M',
          price: 21300,
          quantity: 1,
          description: 'Self-explanatory.',
        },
        {
          itemName: 'ACM Mug 2?!',
          quantity: 30,
          price: 30000,
          description: 'mug',
        },
      ],
    },
  ],
};

const AdminOrderPage: React.FC = () => {
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
          // We'll include this console statement for now.
          // We need a placeholder for the search functionality.
          // eslint-disable-next-line no-console
          onSearch={(value) => console.log(`Search not implemented! Here's value anyway: ${value}`)}
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
      <AdminOrderList orders={testProps.orders} />
    </div>
  );
};

export default AdminOrderPage;
