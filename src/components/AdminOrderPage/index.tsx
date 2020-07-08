import React from 'react';
import { Button } from 'antd';

import { history } from '../../store';

import './style.less';

const AdminOrderPage: React.FC = () => {
  return (
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
  );
};

export default AdminOrderPage;
