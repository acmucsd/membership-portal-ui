import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'antd';
import Icon from '@ant-design/icons';

import './style.less';

const NavTileItem = (props) => {
  const { icon } = props;
  return (
    <div className="nav-tile-item">
      <Icon className="icon" component={icon} />
      <Divider className="divider" />
    </div>
  );
};

NavTileItem.propTypes = {
  icon: PropTypes.node.isRequired,
};

export default NavTileItem;
