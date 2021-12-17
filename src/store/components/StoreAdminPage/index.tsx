import React, { useState } from 'react';
import { Modal } from 'antd';
import { Link } from 'react-router-dom';

import StoreHeader from '../StoreHeader';
import StoreButton from '../StoreButton';

import './style.less';

const StoreAdminPage: React.FC = () => {
  const [confirmation, setConfirmation] = useState<boolean>(false);

  return (
    <>
      <StoreHeader title="Diamond Outfitters: Admin Page" />
      <div className="store-admin-page">
        <Link to="/store/admin/prepare">
          <StoreButton type="primary" size="large" text="Prepare Orders" />
        </Link>
        <Link to="/store/admin/fulfill">
          <StoreButton type="primary" size="large" text="Fulfill Orders" />
        </Link>
        <div className="store-admin-page-divider" />
        <StoreButton
          type="danger"
          size="large"
          text="Cancel All Orders"
          onClick={() => {
            setConfirmation(true);
          }}
        />
        <Modal visible={confirmation} onCancel={() => setConfirmation(false)} onOk={() => {}}>
          Are you sure you want to cancel all orders?
        </Modal>
      </div>
    </>
  );
};

export default StoreAdminPage;
