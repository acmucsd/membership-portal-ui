import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Icon } from 'antd';

import './style.less';

const NavTileItem = (props) => (
  <div className="nav-tile-item">
    <Icon className="icon" component={props.icon} />
    <Divider className="divider" />
  </div>
);

NavTileItem.propTypes = {
  icon: PropTypes.object.isRequired,
};

export default NavTileItem;
