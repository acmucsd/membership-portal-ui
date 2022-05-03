import React from 'react';
import { Button, notification } from 'antd';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authSelector } from '../../auth/authSlice';
import PageLayout from '../components/PageLayout';
import { UserAccessType } from '../../types';

let notifiedAboutEmail = false;

const PageLayoutContainer: React.FC = ({ children }) => {
  const user = useSelector(authSelector);
  const {
    isAdmin: hasAdminAccess,
    profile: { accessType },
  } = user;
  const hasStoreAdminAccess = [UserAccessType.MERCH_STORE_DISTRIBUTOR, UserAccessType.MERCH_STORE_MANAGER, UserAccessType.ADMIN].includes(accessType);
  const history = useHistory();

  React.useEffect(() => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button
        onClick={() => {
          history.push('/resendEmailVerification');
          notification.close(key);
        }}
      >
        Resend Verification Email
      </Button>
    );

    if (!notifiedAboutEmail && user.profile.state === 'PENDING') {
      notification.warning({
        message: 'Make sure to check your email and click the verification link in order to get full access to all features!',
        description: "If you didn't receive the email, click the button below",
        btn,
        key,
        duration: 0,
      });
      notifiedAboutEmail = true;
    }
  }, [user, history]);
  return (
    <PageLayout hasAdminAccess={hasAdminAccess} hasStoreAdminAccess={hasStoreAdminAccess}>
      {children}
    </PageLayout>
  );
};

export default PageLayoutContainer;
