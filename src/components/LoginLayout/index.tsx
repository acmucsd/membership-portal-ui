import React from 'react';
import PropTypes from 'prop-types';

import './style.less';

interface LoginLayoutProps {
  children: React.ReactChild | React.ReactChildren | React.ReactChild[]
}

const LoginLayout: React.FC<LoginLayoutProps> = (props) => {
  const { children } = props;
  return <div className="contents">{children}</div>;
};

export default LoginLayout;
