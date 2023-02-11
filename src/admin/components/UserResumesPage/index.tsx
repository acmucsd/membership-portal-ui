// component for the admin page to view resumes
import React from 'react';
import { useHistory } from 'react-router';
import { Button } from 'antd';
import UserResumesTable from '../../containers/UserResumesTable';

import './style.less';

const UserResumesPage: React.FC = () => {
  const history = useHistory();
  return (
    <div className="user-resumes-page">
      <Button
        type="danger"
        className="back-button"
        onClick={() => {
          history.goBack();
        }}
      >
        Back
      </Button>
      <h1 className="title">User Resumes</h1>
      <UserResumesTable />
    </div>
  );
};

export default UserResumesPage;
