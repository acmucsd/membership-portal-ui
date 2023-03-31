import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import UserResumeTable from '../components/UserResumeTable';
import { getAllVisibleResumes as getAllVisibleResumesConnect } from '../adminActions';
import { UserResume } from '../../types';

interface UserResumesTableContainerProps {
  resumes: UserResume[];
  getAllVisibleResumes: Function;
}

const testingData:UserResume[] = [
  {
      "uuid": "9b36daaa-7c91-42d4-97cc-cf2ecb58903f",
      "isResumeVisible": true,
      "url": "https://acmucsd-membership-portal.s3.us-west-1.amazonaws.com/portal/resumes/8315405c-98a9-4f0f-9e8d-6b4871820e24/Faris%20Ashai%20Resume.pdf",
      "lastUpdated": "2023-03-10T23:29:58.568Z",
      "user": {
          "uuid": "8315405c-98a9-4f0f-9e8d-6b4871820e24",
          "firstName": "Geovany",
          "lastName": "D'Amore",
          "profilePicture": null,
          "graduationYear": 2027,
          "major": "Computer Engineering",
          "bio": null,
          "points": 0
      }
  },
  {
      "uuid": "2a76a9b0-94a4-4dc2-a819-421f4d9fe84c",
      "isResumeVisible": true,
      "url": "https://acmucsd-membership-portal.s3.us-west-1.amazonaws.com/portal/resumes/2439264f-d4f9-4bfc-8261-1502745aa21f/Andy_Resume_Jan2023.pdf",
      "lastUpdated": "2023-03-10T23:36:45.725Z",
      "user": {
          "uuid": "2439264f-d4f9-4bfc-8261-1502745aa21f",
          "firstName": "Helmer",
          "lastName": "Feil",
          "profilePicture": null,
          "graduationYear": 2026,
          "major": "Data Science",
          "bio": null,
          "points": 0
      }
  },
  {
      "uuid": "f38d8a17-082d-455c-aeb1-311da7b43429",
      "isResumeVisible": true,
      "url": "https://acmucsd-membership-portal.s3.us-west-1.amazonaws.com/portal/resumes/35b6e70b-55a8-4b52-9201-3be73c63b0d7/Trevor_Kwan_Resume.pdf",
      "lastUpdated": "2023-03-10T23:35:34.073Z",
      "user": {
          "uuid": "35b6e70b-55a8-4b52-9201-3be73c63b0d7",
          "firstName": "Dean",
          "lastName": "Glover",
          "profilePicture": null,
          "graduationYear": 2028,
          "major": "Data Science",
          "bio": null,
          "points": 0
      }
  },
  {
      "uuid": "c9f39580-0a21-48e6-a3a0-ec4f49ef072f",
      "isResumeVisible": true,
      "url": "https://acmucsd-membership-portal.s3.us-west-1.amazonaws.com/portal/resumes/29eeb3e2-71d2-4402-8db2-2e040f22a880/Jacob_Bolano_Resume.pdf",
      "lastUpdated": "2023-03-10T23:36:23.384Z",
      "user": {
          "uuid": "29eeb3e2-71d2-4402-8db2-2e040f22a880",
          "firstName": "David",
          "lastName": "Kim",
          "profilePicture": null,
          "graduationYear": 2029,
          "major": "Bioinformatics",
          "bio": null,
          "points": 0
      }
  },
  {
      "uuid": "c9f39580-0a21-48e6-a3a0-ec4f49ef072e",
      "isResumeVisible": true,
      "url": "https://acmucsd-membership-portal.s3.us-west-1.amazonaws.com/portal/resumes/29eeb3e2-71d2-4402-8db2-2e040f22a880/Jacob_Bolano_Resume.pdf",
      "lastUpdated": "2023-03-09T23:36:23.384Z",
      "user": {
          "uuid": "29eeb3e2-71d2-4402-8db2-2e040f22a880",
          "firstName": "Ava",
          "lastName": "Johnson",
          "profilePicture": null,
          "graduationYear": 2029,
          "major": "Bioinformatics",
          "bio": null,
          "points": 0
      }
  },
  {
      "uuid": "c9f39580-0a21-48e6-a3a0-ec4f49ef072d",
      "isResumeVisible": true,
      "url": "https://acmucsd-membership-portal.s3.us-west-1.amazonaws.com/portal/resumes/29eeb3e2-71d2-4402-8db2-2e040f22a880/Jacob_Bolano_Resume.pdf",
      "lastUpdated": "2023-03-10T23:36:23.384Z",
      "user": {
          "uuid": "29eeb3e2-71d2-4402-8db2-2e040f22a880",
          "firstName": "Ethan",
          "lastName": "Wong",
          "profilePicture": null,
          "graduationYear": 2029,
          "major": "Bioinformatics",
          "bio": null,
          "points": 0
      }
  },
  {
      "uuid": "c9f39580-0a21-48e6-a3a0-ec4f49ef072c",
      "isResumeVisible": true,
      "url": "https://acmucsd-membership-portal.s3.us-west-1.amazonaws.com/portal/resumes/29eeb3e2-71d2-4402-8db2-2e040f22a880/Jacob_Bolano_Resume.pdf",
      "lastUpdated": "2023-03-10T23:36:23.384Z",
      "user": {
          "uuid": "29eeb3e2-71d2-4402-8db2-2e040f22a880",
          "firstName": "Jasmine",
          "lastName": "Patel",
          "profilePicture": null,
          "graduationYear": 2029,
          "major": "Bioinformatics",
          "bio": null,
          "points": 0
      }
  },
  {
      "uuid": "c9f39580-0a21-48e6-a3a0-ec4f49ef072b",
      "isResumeVisible": true,
      "url": "https://acmucsd-membership-portal.s3.us-west-1.amazonaws.com/portal/resumes/29eeb3e2-71d2-4402-8db2-2e040f22a880/Jacob_Bolano_Resume.pdf",
      "lastUpdated": "2023-03-10T23:36:23.384Z",
      "user": {
          "uuid": "29eeb3e2-71d2-4402-8db2-2e040f22a880",
          "firstName": "Matthew",
          "lastName": "Lee",
          "profilePicture": null,
          "graduationYear": 2029,
          "major": "Bioinformatics",
          "bio": null,
          "points": 0
      }
  },
  {
      "uuid": "c9f39580-0a21-48e6-a3a0-ec4f49ef072a",
      "isResumeVisible": true,
      "url": "https://acmucsd-membership-portal.s3.us-west-1.amazonaws.com/portal/resumes/29eeb3e2-71d2-4402-8db2-2e040f22a880/Jacob_Bolano_Resume.pdf",
      "lastUpdated": "2023-03-10T23:36:23.384Z",
      "user": {
          "uuid": "29eeb3e2-71d2-4402-8db2-2e040f22a880",
          "firstName": "Olivia",
          "lastName": "Rivera",
          "profilePicture": null,
          "graduationYear": 2029,
          "major": "Bioinformatics",
          "bio": null,
          "points": 0
      }
  },
]

const UserResumesTableContainer: React.FC<UserResumesTableContainerProps> = (props) => {
  const { resumes, getAllVisibleResumes } = props;

  useEffect(() => {
    getAllVisibleResumes();
  }, [getAllVisibleResumes]);
  
  console.log(resumes);
  //Can set resumes to testingData to use testingData
  return <UserResumeTable resumes={ resumes } />;
};

const mapStateToProps = (state: { [key: string]: any }) => ({
  resumes: state.admin.resumes,
});

export default connect(mapStateToProps, { getAllVisibleResumes: getAllVisibleResumesConnect })(UserResumesTableContainer);
