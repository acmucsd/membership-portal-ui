import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { sendEmailVerification } from '../../actions/authActions';
import './style.less';

const ResendEmailVerficationPage = (props) => {
  const { email } = props;

  const history = useHistory();
  const [, setAction] = useState();
  const [btnText, setText] = useState('Verifying Email');
  const [verifying, setVerifying] = useState(true);
  const verifiedEmail = () => {
    return () => {
      history.push('/');
    };
  };
  useEffect(() => {
    if (email) {
      sendEmailVerification(email)
        .then(() => {
          setText('Go to Home Page');
          setAction(verifiedEmail);
        })
        .catch(() => {})
        .finally(() => {
          setVerifying(false);
        });
    }
  }, [email]);

  return (
    <div className="Resend-Email-verification-page">
      <Button
        type="primary"
        className="sending-button"
        loading={verifying}
        onClick={() => {
          history.push('/');
        }}
      >
        {btnText}
      </Button>
    </div>
  );
};

ResendEmailVerficationPage.propTypes = {
  email: PropTypes.string.isRequired,
};

export default ResendEmailVerficationPage;
