import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import './style.less';
import logo from '../../assets/graphics/logo.svg';

interface CheckInSuccessProps {
  event: { pointValue: number; cover: string; title: string };
  checkOut: Function;
}

const CheckInSuccess: React.FC<CheckInSuccessProps> = (props) => {
  const { event, checkOut } = props;

  return (
    <div className="card">
      <div className="formcontent">
        <img src={logo} alt="logo" height="115" width="115" />
        <h1 className="title">
          Thanks for checking in to
          <br />
          {`${event.title}.`}
          <br />
          You’ve earned {event.pointValue} points!
        </h1>
        <img className="image" src={event.cover} alt={`${event.title}`} />
        <Link to="/">
          <Button type="primary" className="button" onClick={() => checkOut()}>
            Visit Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CheckInSuccess;
