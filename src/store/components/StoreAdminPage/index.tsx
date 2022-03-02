import { Modal } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from '../../../auth/authSlice';
import { useAppDispatch } from '../../../redux/store';
import { UserAccessType } from '../../../types';
import { notify } from '../../../utils';
import { cancelAllOrders } from '../../storeSlice';
import StoreButton from '../StoreButton';
import StoreHeader from '../StoreHeader';
import './style.less';

const StoreAdminPage: React.FC = () => {
  const auth = useSelector(authSelector);
  const canManageStore = [UserAccessType.ADMIN, UserAccessType.MERCH_STORE_MANAGER].includes(auth.profile.accessType);

  const [confirmation, setConfirmation] = useState<boolean>(false);
  const dispatch = useAppDispatch();

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
            dispatch(cancelAllOrders())
              .unwrap()
              .then(() => {
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
