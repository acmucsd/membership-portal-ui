import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Card, Progress } from 'antd';

import './style.less';

const ProfileCard = (props) => {
  return (
    <div onClick={props.onClick}>
      <Card bordered={false} className='card'>
        <div className='avatar-flex'>
          <Avatar size={120} icon='user' className='avatar' src={props.src}/>
        </div>
        <div className='info'>
          <div className='content'>
            <h2>{props.name}</h2>
            <h3>{props.rank}</h3>
            <Progress
                successPercent={props.exp}
                percent={100}
                showInfo={false}
                strokeWidth={12}
                strokeColor='#587291'/>
            <p>
              <span> LEVEL {props.level}</span>
              <span class='experience'> {props.exp}/100 </span>
            </p>
          </div>
          <div className='scroll-fade'></div>
          </div>
      </Card>
    </div>
  );
};

ProfileCard.propTypes = {
  onClick: PropTypes.func,
  src: PropTypes.string,
  name: PropTypes.string,
  rank: PropTypes.string,
  exp: PropTypes.number,
  level: PropTypes.number
};

export default ProfileCard;
