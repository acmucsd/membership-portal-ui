import React from 'react';
import PropTypes from 'prop-types';
import { Card, Input, Button, Checkbox } from 'antd';

import './style.less';

const EventCheck = (props) => {
  const {
    onAsStaffChange,
    onChange,
    onKeyPress,
    onSubmit,
    user,
    value,
  } = props;

  return (
    <Card className="checkin-card">
      <h1>Event Check-in</h1>
      <div className="inputbox">
        <Input
          onChange={onChange}
          onKeyPress={onKeyPress}
          value={value}
          className="input"
          size="large"
          placeholder="Attendance code..."
        />
        <Button onClick={onSubmit} className="submit">
          Submit
        </Button>
      </div>
      {user.profile.accountType === 'STAFF' && (
        <div className="staff-checkin-div">
          <label className="staff-check-in-label">Staff Check In</label>
          <Checkbox onChange={onAsStaffChange} />
        </div>
      )}
    </Card>
  );
};

EventCheck.propTypes = {
  onAsStaffChange: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
};

export default EventCheck;
