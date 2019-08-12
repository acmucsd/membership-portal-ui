import React from 'react';
import { Card, Input, Button } from 'antd';
import './style.less';

const EventCheck = props => {
  return (
    <div className='cards'>
      <Card className='card'>
        <h1>Event Check-in</h1>
        <div className='inputbox'>
          <Input className='input' size="large" placeholder='Attendance code...' />
          <Button className='submit'>Submit</Button>
        </div>
      </Card>
    </div>
  );
};

export default EventCheck;
