import React from 'react';
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';

import './style.less';
import { getRank } from '../../utils';

interface LeaderListItemProps {
  exp: number
  image: string
  name: string
  placement: number
  uuid: string
}

const LeaderListItem: React.FC<LeaderListItemProps> = (props) => {
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

export default LeaderListItem;
