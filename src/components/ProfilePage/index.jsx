import React, { useEffect, useState } from 'react';
import { Button, Avatar, Progress } from 'antd';

import { useHistory, useParams } from 'react-router-dom';
import { getLevel, getRank } from '../../utils';

import './style.less';

const ProfilePage = props => {
  const params = useParams();
  const history = useHistory();
  useEffect(() => {
    if (params.uuid) {

    }
  }, []);
  return (
    <div className="Profile-Page">
      <h1 className="title">Profile</h1>

      <div className="avatar-flex">
        <h2 className="name">{ props.user.profile.firstName } { props.user.profile.lastName }</h2>
        <Avatar size={115} icon="user" className="avatar" src={props.user.image} />
      </div>
      <div className="level-info">
        <p className="rank">{getRank(props.user.profile.points)}</p>
        <Progress
          successPercent={props.user.profile.points % 100}
          percent={100}
          showInfo={false}
          strokeWidth={12}
          strokeColor="#587291"
        />
        <p className="level-stats">
          <span> LVL {getLevel(props.user.profile.points)}</span>
          <span className="experience"> {props.user.profile.points % 100} / 100 </span>
        </p>
      </div>
      <div className="meta-data">
        <p>Graduation Year: {props.user.profile.graduationYear}</p>
        <p>Major: {props.user.profile.major}</p>
      </div>

    </div>
  );
};

export default ProfilePage;
