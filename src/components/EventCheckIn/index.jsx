import React from 'react';
import PropTypes from 'prop-types';
import { Card, Input, Button, Checkbox } from 'antd';

import './style.less';

const EventCheck = props => {
  const onChange = e => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <Card className="checkin-card">
      <h1>Event Check-in</h1>
      <div className="inputbox">
        <Input
          onChange={props.onChange}
          onKeyPress={props.onKeyPress}
          value={props.value}
          className="input"
          size="large"
          placeholder="Attendance code..."
        />
        <Button onClick={props.onSubmit} className="submit">
          Submit
        </Button>
      </div>
      {props.user.profile.accountType === 'STAFF' && (
        <div className="staff-checkin-div">
          <label className="staff-check-in-label">Staff Check In</label>
          <Checkbox onChange={props.onAsStaffChange} />
        </div>
      )}
    </Card>
  );
};

EventCheck.propTypes = {
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  value: PropTypes.string,
};

export default EventCheck;
