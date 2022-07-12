import React, { ChangeEventHandler, KeyboardEventHandler, FormEventHandler } from 'react';
import { Card, Input, Button, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { UserAccessType } from '../../../api';
import './style.less';

interface EventCheckProps {
  onAsStaffChange: (e: CheckboxChangeEvent) => void;
  onChange: ChangeEventHandler;
  onKeyPress: KeyboardEventHandler;
  onSubmit: FormEventHandler;
  user: {
    accessType: UserAccessType;
  };
  value: string;
}

const EventCheck: React.FC<EventCheckProps> = (props) => {
  const {
    onAsStaffChange,
    onChange,
    onKeyPress,
    onSubmit,
    user: { accessType },
    value,
  } = props;

  return (
    <Card className="checkin-card">
      <h1>Event Check-in</h1>
      <div className="inputbox">
        <Input onChange={onChange} onKeyPress={onKeyPress} value={value} className="input" size="large" placeholder="Attendance code..." />
        <Button onClick={onSubmit} className="submit">
          Submit
        </Button>
      </div>
      {accessType === UserAccessType.STAFF && (
        <div className="staff-checkin-div">
          <label className="staff-check-in-label">Staff Check In</label>
          <Checkbox onChange={onAsStaffChange} />
        </div>
      )}
    </Card>
  );
};

export default EventCheck;
