import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '@ant-design/icons';

import './style.less';

interface NavBarItemProps {
  icon?: React.ComponentClass | React.FC;
  text: string;
  innerDest?: string;
  outerDest?: string;
  func?: Function;
  last?: boolean;
  mobile?: boolean;
}

const NavBarItem: React.FC<NavBarItemProps> = (props) => {
  const { icon, text, innerDest, outerDest, func, last, mobile } = props;

  const getContents = () => {
    return (
      <>
        {icon ? <Icon className="nav-bar-item-icon" component={icon} /> : null}
        <span className="nav-bar-item-text">{text}</span>
      </>
    );
  };

  if (innerDest) {
    return (
      <NavLink exact activeClassName="selected" to={innerDest}>
        <div className={`nav-bar-item${last ? ' last' : ''}${mobile ? ' mobile' : ''}`}>{getContents()}</div>
      </NavLink>
    );
  }

  if (outerDest) {
    return (
      <a target="_blank" rel="noopener noreferrer" href={outerDest}>
        <div className={`nav-bar-item${last ? ' last' : ''}${mobile ? ' mobile' : ''}`}>{getContents()}</div>
      </a>
    );
  }

  if (func) {
    return (
      <div className={`nav-bar-item${last ? ' last' : ''}${mobile ? ' mobile' : ''}`} onClick={() => func()}>
        {getContents()}
      </div>
    );
  }

  return null;
};

export default NavBarItem;
