import React from 'react';
import CreateEventForm from '../CreateEventForm';

import './style.less';

 const AdminPage = () => {
  return (
    <div className="admin-page">
      <h1 className="title">Admin</h1>
      <CreateEventForm />
    </div>
  );
};

 export default AdminPage;
