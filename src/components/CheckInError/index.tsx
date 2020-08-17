import React, { ChangeEventHandler, KeyboardEventHandler, FormEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input } from 'antd';

import './style.less';
import logo from '../../assets/graphics/logo.svg';

interface CheckInErrorProps {
  error: string;
  onChange: ChangeEventHandler;
  onKeyPress: KeyboardEventHandler;
  onSubmit: FormEventHandler;
  value: string;
}

const CheckInError: React.FC<CheckInErrorProps> = (props) => {
  const { error, onChange, onSubmit, onKeyPress, value } = props;

  return (
    <div className="card">
      <div className="formcontent">
        <img src={logo} alt="logo" height="115" width="115" />
        <h1 className="title">
          Error checking in:
          <br />
          {error}
        </h1>
        <div className="">
          <Input
            onChange={onChange}
            onKeyPress={onKeyPress}
            value={value}
            className="input"
            size="large"
            placeholder="Attendance code..."
          />
          <Button type="primary" onClick={onSubmit} className="submit-button">
            Check-In
          </Button>
        </div>
        <Link to="/">
          <Button type="primary" className="dashboard-button">
            Visit Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CheckInError;
