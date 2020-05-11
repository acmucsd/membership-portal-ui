import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';

import './style.less';
import { getRank } from '../../utils';

const LeaderListItem = props => {
  return (
    <div
      className={`leaderboard-list-item
      ${props.placement % 2 === 0 ? 'even' : 'odd'}`}>
      <span className="placement">{props.placement}</span>
      <Avatar size={40} src={props.image} />
      <span className="column left">
        <div className="name">
          <Link to={'/profile/' + props.uuid}>{props.name}</Link>
        </div>
        <div className="rank mobile">{getRank(props.exp)}</div>
      </span>
      <span className="rank desktop">{getRank(props.exp)}</span>
      <span className="column right">
        <div className="exp">{props.exp} points</div>
      </span>
    </div>
  );
};

LeaderListItem.propTypes = {
  exp: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  placement: PropTypes.number.isRequired,
  uuid: PropTypes.string.isRequired,
};

export default LeaderListItem;
