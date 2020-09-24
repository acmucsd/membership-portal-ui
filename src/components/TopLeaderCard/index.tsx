import React from 'react';
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';
import './style.less';
import { getRank } from '../../utils';

interface TopLeaderCardProps {
  exp: number;
  name: string;
  image: string;
  placement: number;
  uuid: string;
  rank: number;
}

const TopLeaderCard: React.FC<TopLeaderCardProps> = (props) => {
  const { exp, name, image, placement, uuid } = props;

  let leaderboardClass = 'leaderboard-card ';

  switch (placement) {
    case 1:
      leaderboardClass += 'first';
      break;
    case 2:
      leaderboardClass += 'second';
      break;
    default:
      leaderboardClass += 'third';
  }

  return (
    <div>
      <div className={leaderboardClass}>
        <div className="leaderboard-card-left">
          <span className="placement">{placement}</span>
        </div>
        <div className="leaderboard-card-right">
          <div>
            <Avatar size={80} src={image} />
          </div>
          <h1 className="name">
            <Link to={`/profile/${uuid}`}>{name}</Link>
          </h1>
          <h3>{getRank(exp)}</h3>
          <h2>{exp} points</h2>
        </div>
      </div>
    </div>
  );
};

export default TopLeaderCard;
