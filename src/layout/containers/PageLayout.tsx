import React, { useContext, useEffect } from 'react';
import { hideNotification, showNotification } from '@mantine/notifications';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import { UserAccessType } from '../../types';
import { AppContext } from '../../context';

let notifiedAboutEmail = false;

const PageLayoutContainer: React.FC = ({ children }) => {
  const { user } = useContext(AppContext);
  const history = useHistory();

  const { accessType } = user;

  const hasAdminAccess = accessType === UserAccessType.ADMIN;
  const hasStoreAdminAccess = [UserAccessType.MERCH_STORE_DISTRIBUTOR, UserAccessType.MERCH_STORE_MANAGER, UserAccessType.ADMIN].includes(accessType);

  useEffect(() => {
    const key = `open${Date.now()}`;

    if (!notifiedAboutEmail && user.state === 'PENDING') {
      showNotification({
        id: key,
        title: 'Make sure to check your email and click the verification link in order to get full access to all features!',
        message: (
          <>
            <p>If you didn&apos;t receive the email, click the button below</p>
            <Button
              onClick={() => {
                history.push('/resendEmailVerification');
                hideNotification(key);
              }}
            >
              Resend Verification Email
            </Button>
          </>
        ),
        autoClose: false,
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
