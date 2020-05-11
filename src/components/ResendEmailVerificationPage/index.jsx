import React, { useEffect, useState } from 'react';
import { Icon, Button } from 'antd';
import { useParams, useHistory } from 'react-router-dom';
import { notify } from '../../utils';
import { sendEmailVerification } from '../../actions/authActions';
import './style.less';

const ResendEmailVerficationPage = props => {
  const params = useParams();
  const history = useHistory();
  const [buttonAction, setAction] = useState();
  const [btnText, setText] = useState('Verifying Email');
  const verifiedEmail = () => {
    return () => {
      history.push('/');
    };
  };
  useEffect(() => {
    if (props.email) {
      sendEmailVerification(props.email)
        .then(res => {
          setText('Go to Home Page');
          setAction(verifiedEmail);
        })
        .catch(error => {})
        .finally(() => {
          setVerifying(false);
        });
    }
  }, [props.email]);
  const [verifying, setVerifying] = useState(true);
  return (
    <div className="Resend-Email-verification-page">
      <Button
        type="primary"
        className="sending-button"
        loading={verifying}
        onClick={() => {
          history.push('/');
        }}>
        {btnText}
      </Button>
    </div>
  );
};

export default ResendEmailVerficationPage;
