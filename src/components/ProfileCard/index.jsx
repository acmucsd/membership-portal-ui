import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Card, Progress } from 'antd';

import './style.less';

const ProfileCard = props => {
  return (
    <Card bordered={false} className="profile-card">
      <div className="avatar-flex">
        <Avatar size={115} icon="user" className="avatar" src={props.image} />
      </div>
      <div className="info">
        <div className="content">
          <h2>{props.name}</h2>
          <h3>{props.rank}</h3>
          <Progress
            successPercent={props.exp % 100}
            percent={100}
            showInfo={false}
            strokeWidth={12}
            strokeColor="#587291"
          />
          <p>
            <span> LVL {props.level}</span>
            <span className="experience"> {props.exp % 100} / 100 </span>
          </p>
        </div>
      </div>
    </Card>
  );
};

ProfileCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  exp: PropTypes.number.isRequired,
};

export default ProfileCard;
