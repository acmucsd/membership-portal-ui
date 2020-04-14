import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Dropdown, Progress } from 'antd';
import Icon from '@ant-design/icons';

import './style.less';
import { ReactComponent as Caret } from '../../assets/icons/caret-icon.svg';
import { getDefaultProfile } from '../../utils';

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
          <Avatar size={55} icon="user" className="avatar" src={props.profilePicture} />
          <span className="name">{props.name}</span>
          <Icon component={Caret} className="arrow" />
        </div>
      </Dropdown>
    </div>
  );
***REMOVED***

NavProfile.propTypes = {
  exp: PropTypes.number.isRequired,
  profilePicture: PropTypes.string.isRequired,
  menu: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
***REMOVED***

export default NavProfile;
