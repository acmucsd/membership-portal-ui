import React from 'react';
import { connect } from 'react-redux';
import { Button, notification } from 'antd';
import { useHistory } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

let notifiedAboutEmail = false;

const PageLayoutContainer = props => {
  const key = `open${Date.now()}`;
  const history = useHistory();
  const btn = (
    <Button
      onClick={() => {
        history.push('/resendEmailVerification');
        notification.close(key);
      }}>
      Resend Verification Email
    </Button>
  );
  React.useEffect(() => {
    if (!notifiedAboutEmail && props.user.profile.state === 'PENDING') {
      notification['warning']({
        message:
          'Make sure to check your email and click the verification link in order to get full access to all features!',
        description: "If you didn't receive the email, click the button below",
        btn,
        key,
        duration: 0,
***REMOVED***;
      notifiedAboutEmail = true;
    }
  }, [props.user]);
  return <PageLayout isAdmin={props.isAdmin}>{props.children}</PageLayout>;
***REMOVED***

const mapStateToProps = state => ({
  isAdmin: state.auth.admin,
  user: state.user,
});

export default connect(mapStateToProps, null)(PageLayoutContainer);
