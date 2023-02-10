import React, { useEffect, useState } from 'react';
import { Button, Modal, Switch } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../../auth/authActions';

import { ReactComponent as UploadIcon } from '../../../assets/icons/upload-icon.svg';
import { ReactComponent as UploadDoneIcon } from '../../../assets/icons/upload-done-icon.svg';

import './style.less';
import { postUserResume, updateResumeVisbility } from '../../profileActions';

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
  const [currResumeSharing, setCurrResumeSharing] = useState(false);
  const [uploadState, setUploadState] = useState('none');
  const [uploaded, setUploaded] = useState(false);
  const [onCooldown, setOnCooldown] = useState(false);

  useEffect(() => {
    setCurrResumeSharing(!!user.profile.resumes?.[0]?.isResumeVisible);
  }, [user]);

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

  // This function is for the switch that toggles resume visibility directly,
  // not the the switch in the modal
  const toggleVisbility = async () => {
    if (onCooldown) return;
    updateResumeVisbility(user.profile.resumes[0].uuid, !currResumeSharing);
    setOnCooldown(true);
    setTimeout(() => {
      setOnCooldown(false);
    }, 1000);
    setCurrResumeSharing((prevSharing) => !prevSharing);
  };

  return (
    <div className="ManageResume">
      <div className="ant-form-item-label">
        <p className="section-label">Resume</p>
      </div>
      <br />
      {user.profile.resumes?.[0] && (
        <div className="info-box">
          <a href={user.profile.resumes?.[0]?.url} download>
            <b>{getCurrResumeName()}</b>
          </a>
          <div className="share-horizontal">
            <Switch size="small" defaultChecked className="switch" checked={currResumeSharing} onClick={toggleVisbility} />
            <p>Share my resume with recruiters from ACM sponsor companies</p>
          </div>
        </div>
      )}
      <Button type="primary" className="upload-modal-button" onClick={() => setModalOn(true)}>
        <UploadOutlined />
        {user.profile.resumes?.[0] ? 'Update Resume' : 'Add Resume'}
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
                {uploaded ? <UploadDoneIcon /> : <UploadIcon />}
                <br />
                <span>{resumeFile ? resumeFile.name : 'Allowed file type: pdf'}</span>
              </div>
            </label>
          </form>
        </div>
        <div className="share-horizontal">
          <Switch
            size="small"
            defaultChecked
            className="switch"
            checked={newResumeSharing}
            onClick={() => setNewResumeSharing((prevSharing) => !prevSharing)}
          />
          <span>Share my resume with recruiters from ACM sponsor companies</span>
        </div>
      </Modal>
    </div>
  );
};

export default ManageResume;
