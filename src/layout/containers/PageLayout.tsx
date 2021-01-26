import React from 'react';
import { connect } from 'react-redux';
import { Button, notification } from 'antd';
import { useHistory } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

let notifiedAboutEmail = false;

interface PageLayoutContainerProps {
  isAdmin: boolean;
  children: React.ReactChildren | React.ReactChild[] | React.ReactElement;
  user: {
    profile: {
      state: string;
    };
  };
}

const PageLayoutContainer: React.FC<PageLayoutContainerProps> = (props) => {
  const { isAdmin, children, user } = props;

  const key = `open${Date.now()}`;
  const history = useHistory();
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
  React.useEffect(() => {
    if (!notifiedAboutEmail && user.profile.state === 'PENDING') {
      notification.warning({
        message:
          'Make sure to check your email and click the verification link in order to get full access to all features!',
        description: "If you didn't receive the email, click the button below",
        btn,
        key,
        duration: 0,
      });
      notifiedAboutEmail = true;
    }
  }, [user]);
  return <PageLayout isAdmin={isAdmin}>{children}</PageLayout>;
};

const mapStateToProps = (state: { [key: string]: any }) => ({
  isAdmin: state.auth.admin,
  user: state.auth,
});

export default connect(mapStateToProps)(PageLayoutContainer);
