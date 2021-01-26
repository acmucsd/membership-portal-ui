import React from 'react';
import { Avatar, Dropdown, Progress } from 'antd';
import Icon from '@ant-design/icons';

import './style.less';
import { ReactComponent as Caret } from '../../../assets/icons/caret-icon.svg';

interface NavProfileProps {
  exp: number;
  profilePicture: string;
  menu: React.ComponentClass | React.FC;
  name: string;
}

const NavProfile: React.FC<NavProfileProps> = (props) => {
  const { exp, profilePicture, menu, name } = props;

  return (
    <div className="nav-width">
      <Dropdown
        overlay={menu}
        trigger={['click']}
        getPopupContainer={(trigger) => trigger.parentNode as HTMLElement}
      >
        <div className="nav-profile">
          <Progress
            className="progress"
            percent={exp % 100}
            showInfo={false}
            strokeColor="#22ACEA"
            type="circle"
            width={55}
          />
          <Avatar size={55} icon="user" className="avatar" src={profilePicture} />
          <span className="name">{name}</span>
          <Icon component={Caret} className="arrow" />
        </div>
      </Dropdown>
    </div>
  );
};

export default NavProfile;
