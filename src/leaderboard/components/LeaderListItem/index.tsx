import { Avatar } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { getRank } from '../../../utils';
import './style.less';

interface LeaderListItemProps {
  exp: number;
  image: string;
  name: string;
  placement: number;
  uuid: string;
  selfUUID: string;
}

const LeaderListItem: React.FC<LeaderListItemProps> = (props) => {
  const { exp, image, name, placement, uuid, selfUUID } = props;

  return (
    <div
      className={`leaderboard-list-item
      ${placement % 2 === 0 ? 'even' : 'odd'}`}
    >
      <span className="placement">{placement}</span>
      <Avatar size={40} src={image} />
      <span className="column left">
        <div className="name">
          <Link to={uuid === selfUUID ? '/profile' : `/profile/${uuid}`}>{name}</Link>
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
