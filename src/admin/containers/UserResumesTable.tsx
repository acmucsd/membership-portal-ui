import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import UserResumeTable from '../components/UserResumeTable';
import { getAllVisibleResumes as getAllVisibleResumesConnect } from '../adminActions';
import { UserResume } from '../../types';

interface UserResumesTableContainerProps {
  resumes: UserResume[];
  getAllVisibleResumes: Function;
}

const UserResumesTableContainer: React.FC<UserResumesTableContainerProps> = (props) => {
  const { resumes, getAllVisibleResumes } = props;

  useEffect(() => {
    getAllVisibleResumes();
  }, [getAllVisibleResumes]);

  return <UserResumeTable resumes={resumes} />;
};

const mapStateToProps = (state: { [key: string]: any }) => ({
  resumes: state.admin.resumes,
});

export default connect(mapStateToProps, { getAllVisibleResumes: getAllVisibleResumesConnect })(UserResumesTableContainer);
