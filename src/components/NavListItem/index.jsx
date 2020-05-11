import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@ant-design/icons';

import './style.less';

const NavListItem = (props) => {
  return (
    <div className="nav-list-item">
      {props.icon ? <Icon component={props.icon} /> : null}
      <span>{props.text}</span>
    </div>
  );
};

NavListItem.propTypes = {
  icon: PropTypes.object,
  text: PropTypes.string.isRequired,
};

export default NavListItem;
