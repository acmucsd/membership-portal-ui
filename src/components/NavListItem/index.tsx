import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@ant-design/icons';

import './style.less';

interface NavListItemProps {
  icon?: React.ComponentClass | React.FC,
  text: string,
};

const NavListItem: React.FC<NavListItemProps> = (props) => {
  const { icon, text } = props;
  return (
    <div className="nav-list-item">
      {icon ? <Icon component={icon} /> : null}
      <span>{text}</span>
    </div>
  );
};

export default NavListItem;
