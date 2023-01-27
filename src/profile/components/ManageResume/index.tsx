import React, { useState } from 'react';
import { Button, Modal, Switch } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../../auth/authActions';

import './style.less';
import { postUserResume } from '../../profileActions';

interface ManageResumeProps {
  user: {
    profile: {
      uuid: string;
      firstName: string;
      lastName: string;
      major: string;
      bio: string;
      profilePicture: string;
      graduationYear: string;
      [key: string]: any;
    };
  };
}

const ManageResume: React.FC<ManageResumeProps> = (props) => {
  const { user } = props;

  const [modalOn, setModalOn] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [newResumeSharing, setNewResumeSharing] = useState(true);
  const [uploadState, setUploadState] = useState('none');
  const [uploaded, setUploaded] = useState(false);

  const uploadIcon = (
    <svg width="160" height="160" viewBox="0 0 144 144" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M72 0C32.256 0 0 32.256 0 72C0 111.744 32.256 144 72 144C111.744 144 144 111.744 144 72C144 32.256 111.744 0 72 0ZM72 129.6C40.248 129.6 14.4 103.752 14.4 72C14.4 40.248 40.248 14.4 72 14.4C103.752 14.4 129.6 40.248 129.6 72C129.6 103.752 103.752 129.6 72 129.6ZM99.936 45.288L57.6 87.624L44.064 74.088C42.7178 72.7418 40.8919 71.9855 38.988 71.9855C37.0841 71.9855 35.2582 72.7418 33.912 74.088C32.5658 75.4342 31.8095 77.2601 31.8095 79.164C31.8095 81.0679 32.5658 82.8938 33.912 84.24L52.56 102.888C55.368 105.696 59.904 105.696 62.712 102.888L110.16 55.44C110.827 54.7739 111.357 53.9827 111.718 53.1117C112.08 52.2407 112.266 51.307 112.266 50.364C112.266 49.421 112.08 48.4873 111.718 47.6163C111.357 46.7453 110.827 45.9541 110.16 45.288C107.352 42.48 102.744 42.48 99.936 45.288Z"
        fill="white"
      />
    </svg>
  );
  const uploadDone = (
    <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_792_2394)">
        <path
          d="M129 66.9333C126.761 55.5847 120.651 45.3657 111.714 38.0216C102.777 30.6775 91.5674 26.664 80 26.6666C60.7333 26.6666 44 37.6 35.6667 53.6C25.8682 54.6588 16.8067 59.3013 10.2233 66.6354C3.63981 73.9695 -0.00114468 83.4778 2.69952e-07 93.3333C2.69952e-07 115.4 17.9333 133.333 40 133.333H126.667C145.067 133.333 160 118.4 160 100C160 82.4 146.333 68.1333 129 66.9333ZM93.3333 86.6666V113.333H66.6667V86.6666H46.6667L80 53.3333L113.333 86.6666H93.3333Z"
          fill="#333333"
        />
      </g>
      <defs>
        <clipPath id="clip0_792_2394">
          <rect width="160" height="160" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

  const resetModal = () => {
    setUploadState('none');
    setResumeFile(null);
    setNewResumeSharing(true);
    setUploaded(false);
    setModalOn(false);
  };

  const dispatch = useDispatch();

  const uploadResume = async () => {
    setUploadState('uploading');

    if (resumeFile === null) return;
    await postUserResume(resumeFile, newResumeSharing);
    await dispatch(fetchUser());

    resetModal();
  };

  const handleFileInput = (e) => {
    if (e.target.files.length === 0) return;
    setUploaded(true);
    setResumeFile(e.target.files[0]);
  };

  const getCurrResumeName = () => {
    if (!user.profile.resumes?.[0]) return 'No resume uploaded';
    const { url } = user.profile.resumes?.[0];
    return decodeURIComponent(url.substring(url.lastIndexOf('/') + 1));
  };

  return (
    <div className="ManageResume">
      <span className="section-label">Resume</span>
      <p>{getCurrResumeName()}</p>
      <p>
        <em>
          {user.profile.resumes?.[0] &&
            (user.profile.resumes?.[0]?.isResumeVisible ? 'Resume visible to recruiters' : 'Resume not visible to recruiters')}
        </em>
      </p>
      <Button type="primary" className="upload-modal-button" onClick={() => setModalOn(true)}>
        <UploadOutlined />
        Add Resume
      </Button>
      <Modal
        visible={modalOn}
        title="Upload your resume!"
        onOk={uploadResume}
        onCancel={resetModal}
        className="ManageResume-Modal"
        footer={[
          <Button key="back" onClick={resetModal}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={uploadState === 'uploading'} onClick={uploadResume} disabled={resumeFile === null}>
            {uploadState !== 'uploading' && <UploadOutlined />} Upload
          </Button>,
        ]}
      >
        <div className="File-Upload">
          <form>
            {modalOn ? <input type="file" id="file-upload" onChange={handleFileInput} accept="application/pdf" /> : null}
            <label htmlFor="file-upload">
              <div className={uploaded ? 'upload-area done' : 'upload-area'}>
                {uploaded ? uploadIcon : uploadDone}
                <br />
                <span>{resumeFile ? resumeFile.name : 'Allowed file type: pdf'}</span>
              </div>
            </label>
          </form>
        </div>
        <div className="share-horizontal">
          <Switch size="small" defaultChecked className="switch" checked={newResumeSharing} onClick={() => setNewResumeSharing(!newResumeSharing)} />
          <span>Share my resume with recruiters from ACM sponsor companies</span>
        </div>
      </Modal>
    </div>
  );
};

export default ManageResume;
