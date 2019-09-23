import React from 'react';
import PropTypes from 'prop-types';
import { Card, Input, Button } from 'antd';

import './style.less';

const EventCheck = props => {
  return (
    <Card className="checkin-card">
      <h1>Event Check-in</h1>
      <div className="inputbox">
        <Input
          onChange={props.onChange}
          value={props.value}
          className="input"
          size="large"
          placeholder="Attendance code..."
        />
        <Button onClick={props.onSubmit} className="submit">
          Submit
        </Button>
      </div>
    </Card>
  );
***REMOVED***

EventCheck.propTypes = {
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  value: PropTypes.string,
***REMOVED***

export default EventCheck;
