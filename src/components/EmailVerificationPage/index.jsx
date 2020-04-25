import React, { useEffect, useState } from 'react';
import { Icon, Button } from 'antd';
import { useParams, useHistory } from 'react-router-dom';
import { notify } from '../../utils';
import { verifyEmail } from '../../actions/authActions';
import './style.less';

const EmailVerficationPage = props => {
  const params = useParams();
  const history = useHistory();
  const [buttonAction, setAction] = useState();
  const [btnText, setText] = useState('Verifying Email');
  const verifiedEmail = () => {
    return () => {
      history.push('/login');
    ***REMOVED***
  ***REMOVED***
  useEffect(() => {
    verifyEmail({ code: params.code })
      .then(res => {
        setText('Go to Login Page');
        setAction(verifiedEmail);
***REMOVED***
      .catch(error => {})
      .finally(() => {
        setVerifying(false);
***REMOVED***;
  }, []);
  const [verifying, setVerifying] = useState(true);
  return (
    <div className="Email-verification-page">
      <Button
        type="primary"
        className="verifying-button"
        loading={verifying}
        onClick={() => {
          history.push('/login');
        }}>
        {btnText}
      </Button>
    </div>
  );
***REMOVED***

export default EmailVerficationPage;
