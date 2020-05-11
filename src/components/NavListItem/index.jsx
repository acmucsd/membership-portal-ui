import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@ant-design/icons';

import './style.less';

const NavListItem = (props) => {
  const { icon, text } = props;
  return (
    <div className="nav-list-item">
      {icon ? <Icon component={icon} /> : null}
      <span>{text}</span>
    </div>
  );
};

NavListItem.propTypes = {
  icon: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
};

export default NavListItem;
