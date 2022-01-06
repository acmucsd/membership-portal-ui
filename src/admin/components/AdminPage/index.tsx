import React from 'react';
import { Button } from 'antd';

import { useHistory } from 'react-router-dom';

import './style.less';

const AdminPage: React.FC = () => {
  const history = useHistory();
  return (
    <div className="admin-page">
      <h1 className="title">Admin</h1>
      <Button
        className="admin-redirect-button"
        onClick={() => {
          history.push('/admin/awardPoints');
        }}
      >
        Award Points
      </Button>
      <Button
        className="admin-redirect-button"
        onClick={() => {
          history.push('/admin/createEvent');
        }}
      >
        Create Event
      </Button>
      <Button
        className="admin-redirect-button"
        onClick={() => {
          history.push('/admin/addAttendance');
        }}
      >
        Retroactive Attendance
      </Button>
    </div>
  );
};

export default AdminPage;
