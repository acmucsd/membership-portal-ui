import React, { ChangeEventHandler, KeyboardEventHandler, FormEventHandler } from 'react';
import PropTypes from 'prop-types';
import { Card, Input, Button, Checkbox } from 'antd';

import './style.less';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

interface EventCheckProps {
  onAsStaffChange: ((e: CheckboxChangeEvent) => void)
  onChange: ChangeEventHandler
  onKeyPress: KeyboardEventHandler
  onSubmit: FormEventHandler
  user: {
    profile: {
      accountType: string
    }
  }
  value: string
}

const EventCheck: React.FC<EventCheckProps> = (props) => {
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

export default EventCheck;
