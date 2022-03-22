import React from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar, Card, Progress } from 'antd';

import './style.less';

interface ProfileCardProps {
  profilePicture: string;
  name: string;
  rank: string;
  level: number;
  exp: number;
}

const ProfileCard: React.FC<ProfileCardProps> = (props) => {
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
        <Avatar size={115} icon="user" className="avatar" src={profilePicture} />
      </div>
      <div className="info">
        <div className="content">
          <h2>{name}</h2>
          <h3>{rank}</h3>
          <Progress successPercent={exp % 100} percent={100} showInfo={false} strokeWidth={12} strokeColor="#587291" />
          <p>
            <span className="profile-card__level"> LVL {level}</span>
            <span className="experience"> {exp % 100} / 100 </span>
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
