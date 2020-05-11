import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Select, Modal, Upload, Avatar } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getDefaultProfile } from '../../utils';
import { uploadUserImage } from '../../actions/profileActions';

import './style.less';

const { Option } = Select;
const { TextArea } = Input;

function getYears() {
  const currentYear = new Date().getFullYear();
  return [...Array(6)].map((_, i) => i + currentYear);
}

const years = getYears();

const ProfileUpdate = (props) => {
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    user,
    values,
  } = props;

  const [gradYear, setGradYear] = useState('');
  const [bg, setBG] = useState(user.profile.profilePicture);
  const [fileList, setFileList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [uploadState, setUploadState] = useState('none');
  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };
  const onFileChange = (info) => {
    const infoFileList = [...info.fileList];
    URL.revokeObjectURL(bg);
    if (infoFileList.length) {
      const lastFile = infoFileList[infoFileList.length - 1];
      if (lastFile) {
        setFileList([lastFile]);
      }
      const newBg = URL.createObjectURL(lastFile.originFileObj);
      setBG(newBg);
    } else {
      setBG('');
    }
  };
  const handleCancel = () => {
    setVisible(false);
    setUploadState('none');
  };
  const showModal = () => {
    setVisible(true);
  };
  const uploadImageButton = useRef(null);
  const uploadPhoto = () => {
    setUploadState('uploading');
    uploadUserImage(fileList[0].originFileObj)
      .then(() => {
        setUploadState('none');
        setVisible(false);
      })
      .catch(() => {
        setUploadState('none');
      });
  };
  useEffect(() => {
    const keys = ['firstName', 'lastName', 'major', 'bio'];
    keys.forEach((key) => {
      setFieldValue(key, user.profile[key]);
    });
    if (user.profile.graduationYear) {
      setGradYear(user.profile.graduationYear);
    }
  }, [user]);

  return (
    <div className="update-card">
      <div className="updatecontent">
        <h1 className="title">Profile</h1>
        <Avatar size={155} src={bg} className="avatar" />
        <br />
        <Button
          type="primary"
          className="upload-modal-button"
          onClick={showModal}
        >
          Change Profile Picture
        </Button>
        <Modal
          visible={visible}
          title="Change Profile Picture"
          onOk={uploadPhoto}
          onCancel={handleCancel}
          className="EditProfilePage-Modal"
          footer={[
            <Button key="back" onClick={handleCancel}>
              Return
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={uploadState === 'uploading'}
              onClick={uploadPhoto}
              disabled={fileList.length === 0}
            >
              {uploadState !== 'uploading' && <UploadOutlined />} Upload
            </Button>,
          ]}
        >
          <div className="upload-wrapper">
            <Upload
              className="upload-profile-pic"
              name="file"
              type="file"
              customRequest={dummyRequest}
              fileList={fileList}
              onChange={onFileChange}
              onRemove={() => {
                setFileList([]);
              }}
            >
              <div className="new-profile-pic-wrapper">
                <Avatar
                  size={115}
                  src={bg || getDefaultProfile()}
                  className="avatar"
                />
              </div>
              <Button className="upload-button" innerRef={uploadImageButton}>
                Change Picture
              </Button>
            </Upload>
          </div>
        </Modal>
        <form onSubmit={handleSubmit} className="update-profile-form">
          <Form.Item label="First name">
            <Input
              name="firstName"
              className="input-box"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Item>
          <Form.Item label="Last name">
            <Input
              name="lastName"
              className="input-box"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Item>
          <div className="horizontal-input">
            <Form.Item label="Year">
              <Select
                value={gradYear}
                className="year"
                onBlur={(value) => setFieldValue('graduationYear', value)}
                onChange={(value) => setFieldValue('graduationYear', value)}
              >
                {years.map((num) => (
                  <Option key={num} value={num}>
                    {num}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Major">
              <Input
                name="major"
                className="major"
                value={values.major}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
          </div>
          <Form.Item label="Bio">
            <TextArea
              name="bio"
              className="area-box"
              value={values.bio}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="save-button">
            Save Profile Changes
          </Button>
          <Button type="danger" className="discard-button">
            Discard
          </Button>
        </form>
      </div>
    </div>
  );
};

ProfileUpdate.propTypes = {
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  user: PropTypes.shape({
    profile: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      major: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      profilePicture: PropTypes.string.isRequired,
      graduationYear: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  values: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    major: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileUpdate;
