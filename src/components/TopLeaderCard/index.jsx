import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';

import './style.less';

const TopLeaderCard = props => {
  return (
    <div>
      <div className="leaderboard-card">
        <div
          className={`leaderboard-card-left
          ${props.placement === 1 ? "first" :
          (props.placement === 2 ? "second" : "third")}`}>
          <span className="placement">{props.placement}</span>
        </div>
        <div className="leaderboard-card-right">
          <div>
            <Avatar size={81} src={props.imageSrc} />
          </div>
          <h1>{props.name}</h1>
          <h3>{props.rank}</h3>
          <h2>{props.exp} points</h2>
        </div>
      </div>
    </div>
  );
};

TopLeaderCard.propTypes = {
  placement: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  rank: PropTypes.string.isRequired,
  exp: PropTypes.number.isRequired,
  imageSrc: PropTypes.string.isRequired
};

export default TopLeaderCard;
