import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Icon, Dropdown, Progress } from 'antd';
import { NavLink } from 'react-router-dom';

import './style.less';
import { ReactComponent as Caret } from '../../assets/graphics/caret-icon.svg';

const NavProfile =(props) => {
  return (
    <Dropdown overlay={props.menu} trigger={['click']}>
      <a className="ant-dropdown-link">
        <div className="nav-profile">
          <Progress
            percent={props.exp}
            showInfo={false}
            strokeColor="#22ACEA"
            type="circle"
            width={55}
          />
          <Avatar size={55} icon="user" className="avatar" src={props.src} />
          <span>{props.name}</span>
          <Icon component={Caret} className='arrow'/>
        </div>
      </a>
    </Dropdown>
  );
};

NavProfile.propTypes = {
  exp: PropTypes.number.isRequired,
  menu: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired
};

export default NavProfile;
