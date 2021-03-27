import React from 'react';
import AddAttendanceForm from '../../containers/AddAttendanceForm';

import './style.less';

const AddAttendancePage: React.FC = () => {
  return (
    <div className="add-attendance-page">
      <h1 className="title">Admin</h1>
      <AddAttendanceForm />
    </div>
  );
};

export default AddAttendancePage;
