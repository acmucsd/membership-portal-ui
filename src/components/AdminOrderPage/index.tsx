import React from 'react';
import { Button, Input } from 'antd';
import { history } from '../../store';
import AdminOrderList from '../AdminOrderList';

import './style.less';

const { Search } = Input;

const testProps = {
  orders: [
    {
      uuid: '1784089c-94e1-433f-ac67-e114dd124b9e',
      items: [
        {
          uuid: 'f5ac9abe-8062-487c-9156-52adbe381591',
          itemName: 'Example different item',
          price: 19500,
          quantity: 2,
          fulfilled: false,
          description: 'Self-explanatory.',
          notes: '',
        },
        {
          uuid: '5b80b81c-6947-4445-baa1-2c1d9f373856',
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
      items: [
        {
          uuid: 'eeb77041-4566-4e0c-9e89-a58e0b7b2afd',
          itemName: 'Unisex Raccoon Print Shell Jacket - M',
          price: 21300,
          quantity: 1,
          fulfilled: false,
          description: 'Self-explanatory.',
          notes: '',
        },
        {
          uuid: 'df08d112-7e8d-4103-9012-cb26cb3012ab',
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
