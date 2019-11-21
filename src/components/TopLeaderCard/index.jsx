import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';

import './style.less';
import { getRank } from '../../utils';

const TopLeaderCard = (props) => (
  <div>
    <div className="leaderboard-card">
      <div
        className={`leaderboard-card-left
          ${props.placement === 1 ? 'first'
          : (props.placement === 2 ? 'second' : 'third')}`}
      >
        <span className="placement">{props.placement}</span>
      </div>
      <div className="leaderboard-card-right">
        <div>
          <Avatar size={80} src={props.image} />
        </div>
        <h1>{props.name}</h1>
        <h3>{getRank(props.exp)}</h3>
        <h2>
          {props.exp}
          {' '}
points
        </h2>
      </div>
    </div>
  </div>
);

TopLeaderCard.propTypes = {
  exp: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  placement: PropTypes.number.isRequired,
};

export default TopLeaderCard;
