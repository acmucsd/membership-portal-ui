import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';

import { cancelAllOrders } from '../../storeActions';
import { notify } from '../../../utils';

import StoreHeader from '../StoreHeader';
import StoreButton from '../StoreButton';

import './style.less';

interface StoreAdminPageProps {
  cancelAllOrders: Function;
}

const StoreAdminPage: React.FC<StoreAdminPageProps> = (props) => {
  const [confirmation, setConfirmation] = useState<boolean>(false);

  return (
    <>
      <StoreHeader title="Diamond Outfitters: Admin Page" />
      <div className="store-admin-page">
        <StoreButton type="primary" size="large" text="Manage Pickup Events" link="/store/admin/pickup" />
        <StoreButton type="primary" size="large" text="Prepare Orders" link="/store/admin/prepare" />
        <StoreButton type="primary" size="large" text="Fulfill Orders" link="/store/admin/fulfill" />
        <div className="store-admin-page-divider" />
        <StoreButton
          type="danger"
          size="large"
          text="Cancel All Orders"
          onClick={() => {
            setConfirmation(true);
          }}
        />
        <Modal
          visible={confirmation}
          onCancel={() => setConfirmation(false)}
          onOk={() => {
            props.cancelAllOrders().then(() => {
              setConfirmation(false);
              notify('Success!', 'You successfully cancelled all orders!');
            });
          }}
        >
          Are you sure you want to cancel all orders?
        </Modal>
      </div>
    </>
  );
};

export default connect(() => ({}), { cancelAllOrders })(StoreAdminPage);
