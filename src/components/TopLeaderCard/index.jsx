import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';
import './style.less';
import { getRank } from '../../utils';

const TopLeaderCard = (props) => {
  const { exp, name, image, placement, uuid } = props;

  let leaderboardClass = 'leaderboard-card-left ';

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
      <div className="leaderboard-card">
        <div className={leaderboardClass}>
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

TopLeaderCard.propTypes = {
  exp: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  placement: PropTypes.number.isRequired,
  uuid: PropTypes.string.isRequired,
};

export default TopLeaderCard;
