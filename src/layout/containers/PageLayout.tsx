import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { hideNotification, showNotification } from '@mantine/notifications';
import PageLayout from '../components/PageLayout';
import { UserAccessType } from '../../types';

let notifiedAboutEmail = false;

interface PageLayoutContainerProps {
  hasAdminAccess: boolean;
  hasStoreAdminAccess: boolean;
  children: React.ReactChildren | React.ReactChild[] | React.ReactElement;
  user: {
    profile: {
      state: string;
    };
  };
}

const PageLayoutContainer: React.FC<PageLayoutContainerProps> = (props) => {
  const { hasAdminAccess, hasStoreAdminAccess, children, user } = props;

  const history = useHistory();

  React.useEffect(() => {
    const key = `open${Date.now()}`;

    if (!notifiedAboutEmail && user.profile.state === 'PENDING') {
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

const mapStateToProps = (state: { [key: string]: any }) => ({
  hasAdminAccess: state.auth.admin,
  hasStoreAdminAccess: [UserAccessType.MERCH_STORE_DISTRIBUTOR, UserAccessType.MERCH_STORE_MANAGER, UserAccessType.ADMIN].includes(
    state.auth.profile.accessType,
  ),
  user: state.auth,
});

export default connect(mapStateToProps)(PageLayoutContainer);
