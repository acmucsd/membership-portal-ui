import React from 'react';
import { Divider } from 'antd';
import Icon from '@ant-design/icons';

import './style.less';

interface NavTileItemProps {
  icon: React.ComponentClass | React.FC;
  text?: string;
}

const NavTileItem: React.FC<NavTileItemProps> = (props) => {
  const { icon, text } = props;
  return (
    <div className="nav-tile-item">
      <Icon className="icon" component={icon} label={text} />
      <Divider className="divider" />
    </div>
  );
};

export default NavTileItem;
