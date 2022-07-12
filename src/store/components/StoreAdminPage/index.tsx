import React, { useContext, useState } from 'react';
import { Modal } from 'antd';
import { UserAccessType } from '../../../api';
import { notify } from '../../../utils';
import { cancelAllOrders } from '../../utils';
import StoreButton from '../StoreButton';
import StoreHeader from '../StoreHeader';
import { AppContext } from '../../../context';
import './style.less';

const StoreAdminPage: React.FC = () => {
  const {
    user: { accessType },
  } = useContext(AppContext);

  const canManageStore = [UserAccessType.ADMIN, UserAccessType.MERCH_STORE_MANAGER].includes(accessType);

  const [confirmation, setConfirmation] = useState<boolean>(false);

  return (
    <>
      <StoreHeader title="Diamond Outfitters: Admin Page" />
      <div className="store-admin-page">
        {canManageStore && <StoreButton type="primary" size="large" text="View Quantities" link="/store/admin/quantities" />}
        {canManageStore && <StoreButton type="primary" size="large" text="Manage Pickup Events" link="/store/admin/pickup" />}
        <StoreButton type="primary" size="large" text="Prepare Orders" link="/store/admin/prepare" />
        <StoreButton type="primary" size="large" text="Fulfill Orders" link="/store/admin/fulfill" />
        {canManageStore && (
          <>
            <div className="store-admin-page-divider" />
            <StoreButton
              type="danger"
              size="large"
              text="Cancel All Orders"
              onClick={() => {
                setConfirmation(true);
              }}
            />
          </>
        )}
        <Modal
          visible={confirmation}
          onCancel={() => setConfirmation(false)}
          onOk={() => {
            cancelAllOrders().then(() => {
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

export default StoreAdminPage;
