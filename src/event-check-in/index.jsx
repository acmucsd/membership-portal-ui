import React from 'react';
import { Card, Input, Button } from 'antd';
import './style.less';

const EventCheck = (props) => {
    return (
    <div className="cards">
        <Card className="card">
            <h1>Event Check In</h1>
            <Input placeholder='Attendance code...'/>
            <Button className="submit">
                Submit
            </Button>
        </Card>
    </div>
    )
};

export default EventCheck;
