import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';

import './style.less';
import { getRank } from '../../utils';

const LeaderListItem = (props) => {
  const { exp, image, name, placement, uuid } = props;

  return (
    <div
      className={`leaderboard-list-item
      ${placement % 2 === 0 ? 'even' : 'odd'}`}
    >
      <span className="placement">{placement}</span>
      <Avatar size={40} src={image} />
      <span className="column left">
        <div className="name">
          <Link to={`/profile/${uuid}`}>{name}</Link>
        </div>
        <div className="rank mobile">{getRank(exp)}</div>
      </span>
      <span className="rank desktop">{getRank(exp)}</span>
      <span className="column right">
        <div className="exp">{exp} points</div>
      </span>
    </div>
  );
};

LeaderListItem.propTypes = {
  exp: PropTypes.number.isRequired,
  image: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  placement: PropTypes.number.isRequired,
  uuid: PropTypes.string.isRequired,
};

export default LeaderListItem;
