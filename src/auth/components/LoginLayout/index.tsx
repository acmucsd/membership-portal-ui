import React from 'react';

import Header from '../../../layout/components/Header';

import './style.less';

interface LoginLayoutProps {
  children: React.ReactChild | React.ReactChildren | React.ReactChild[];
}

const LoginLayout: React.FC<LoginLayoutProps> = (props) => {
  const { children } = props;
  return (
    <div className="login-layout">
      <div className="header-holder">
        <Header />
      </div>
      <div className="contents">{children}</div>
    </div>
  );
};

export default LoginLayout;
