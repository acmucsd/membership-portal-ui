import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';

import './style.less';

const LeaderListItem = props => {
  return (
    <div
      className={`leaderboard-list-item
      ${props.placement % 2 === 0 ? "even" : "odd"}`}>
      <span className="placement">{props.placement}</span>
      <Avatar size={40} src={props.image} />
      <span className="name">{props.name}</span>
      <span className="rank">{props.rank}</span>
      <span className="exp">{props.exp} points</span>
    </div>
  );
};

LeaderListItem.propTypes = {
  exp: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placement: PropTypes.number.isRequired,
  rank: PropTypes.string.isRequired,
};

export default LeaderListItem;
