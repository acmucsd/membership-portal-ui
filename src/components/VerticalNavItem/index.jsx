import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

import './style.less';

const NavItem = props => {
  return (
    <div>
      <Icon component={props.icon} />
      <span>{props.text}</span>
    </div>
  );
};

NavItem.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
};

export default NavItem;
