import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { Avatar, Card, Progress } from 'antd';

import './style.less';
import { getDefaultProfile } from '../../utils';

const ProfileCard = (props) => {
  const history = useHistory();
  return (
    <Card
      bordered={false}
      className="profile-card"
      onClick={() => {
        history.push('/profile');
      }}
    >
      <div className="avatar-flex">
        <Avatar
          size={115}
          icon="user"
          className="avatar"
          src={props.profilePicture}
        />
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
  profilePicture: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  exp: PropTypes.number.isRequired,
};

export default ProfileCard;
