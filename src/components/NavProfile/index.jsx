import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Icon, Dropdown, Progress } from 'antd';

import './style.less';
import { ReactComponent as Caret } from '../../assets/icons/caret-icon.svg';

const NavProfile = props => {
  return (
    <div className="nav-width">
      <Dropdown overlay={props.menu} trigger={['click']}>
        <div className="nav-profile">
          <Progress
            className="progress"
            percent={props.exp % 100}
            showInfo={false}
            strokeColor="#22ACEA"
            type="circle"
            width={55}
          />
          <Avatar size={55} icon="user" className="avatar" src={props.image} />
          <span className="name">{props.name}</span>
          <Icon component={Caret} className="arrow" />
        </div>
      </Dropdown>
    </div>
  );
};

NavProfile.propTypes = {
  exp: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  menu: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

export default NavProfile;
