import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Avatar, Card, Progress } from 'antd';

import './style.less';

const ProfileCard = (props) => {
  const { profilePicture, name, rank, level, exp } = props;
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
          src={profilePicture}
        />
      </div>
      <div className="info">
        <div className="content">
          <h2>{name}</h2>
          <h3>{rank}</h3>
          <Progress
            successPercent={exp % 100}
            percent={100}
            showInfo={false}
            strokeWidth={12}
            strokeColor="#587291"
          />
          <p>
            <span> LVL {level}</span>
            <span className="experience"> {exp % 100} / 100 </span>
          </p>
        </div>
      </div>
    </Card>
  );
};

ProfileCard.propTypes = {
  profilePicture: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rank: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  exp: PropTypes.number.isRequired,
};

export default ProfileCard;
