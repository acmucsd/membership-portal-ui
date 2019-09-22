import React from 'react';
import PropTypes from 'prop-types';
import { Card, Input, Button } from 'antd';

import './style.less';

const EventCheck = props => {
  return (
    <div className="cards">
      <Card className="card">
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
    </div>
  );
};

EventCheck.propTypes = {
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  value: PropTypes.string,
};

export default EventCheck;
