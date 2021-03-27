import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { sendEmailVerification } from '../../authActions';
import './style.less';

interface ResendEmailVerficationPageProps {
  email: string;
}

const ResendEmailVerficationPage: React.FC<ResendEmailVerficationPageProps> = (props) => {
  const { email } = props;

  const history = useHistory();
  const [, setAction] = useState(() => {});
  const [btnText, setText] = useState('Verifying Email');
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    if (email) {
      sendEmailVerification(email)
        .then(() => {
          setText('Go to Home Page');
          setAction(() => {
            return () => {
              history.push('/');
            };
          });
        })
        .catch(() => {})
        .finally(() => {
          setVerifying(false);
        });
    }
  }, [email, history]);

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

export default ResendEmailVerficationPage;
