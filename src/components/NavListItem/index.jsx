import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

import './style.less';

const NavItem = props => {
  return (
    <>
      {props.icon ? <Icon component={props.icon} /> : null}
      <span>{props.text}</span>
    </>
  );
};

NavItem.propTypes = {
  icon: PropTypes.object,
  text: PropTypes.string.isRequired,
};

export default NavItem;
