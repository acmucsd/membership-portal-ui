import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useParams, useHistory } from 'react-router-dom';
import { verifyEmail } from '../../authActions';
import './style.less';

const EmailVerficationPage: React.FC = () => {
  const params: { [key: string]: any } = useParams();
  const history = useHistory();
  const [, setAction] = useState(() => {});
  const [btnText, setText] = useState('Verifying Email');
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    verifyEmail({ code: params.code })
      .then(() => {
        setText('Go to Login Page');
        setAction(() => {
          return () => {
            history.push('/login');
          };
        });
      })
      .catch(() => {})
      .finally(() => {
        setVerifying(false);
      });
  }, [params.code, history]);

  return (
    <div className="Email-verification-page">
      <Button
        type="primary"
        className="verifying-button"
        loading={verifying}
        onClick={() => {
          history.push('/login');
        }}
      >
        {btnText}
      </Button>
    </div>
  );
};

export default EmailVerficationPage;
