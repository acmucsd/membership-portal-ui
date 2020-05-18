import React from 'react';
import PropTypes from 'prop-types';

import './style.less';

const LoginLayout = (props) => {
  const { children } = props;
  return <div className="contents">{children}</div>;
};

LoginLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginLayout;
