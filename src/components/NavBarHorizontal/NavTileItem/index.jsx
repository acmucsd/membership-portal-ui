import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'antd';
import Icon from '@ant-design/icons';

import './style.less';

const NavTileItem = props => {
  return (
    <div className="nav-tile-item">
      <Icon className="icon" component={props.icon} />
      <Divider className="divider" />
    </div>
  );
***REMOVED***

NavTileItem.propTypes = {
  icon: PropTypes.object.isRequired,
***REMOVED***

export default NavTileItem;
