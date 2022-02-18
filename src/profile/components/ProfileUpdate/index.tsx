import React, { useEffect, useState, useRef, FocusEventHandler, ChangeEventHandler, FormEventHandler } from 'react';
import { Form, Input, Button, Select, Modal, Avatar } from 'antd';
import * as ANTD from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { getDefaultProfile } from '../../../utils';
import { updateEmail, uploadUserImage } from '../../profileActions';
import { fetchUser } from '../../../auth/authActions';

import majorsData from '../../../constants/majors.json';

import './style.less';

const { Option } = Select;
const { TextArea } = Input;

const years = [...Array(6)].map((_, i) => i + new Date().getFullYear());

interface ProfileUpdateProps {
  handleBlur: FocusEventHandler;
  handleChange: ChangeEventHandler;
  handleSubmit: FormEventHandler;
  setFieldValue: Function;
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
  values: {
    firstName: string;
    lastName: string;
    graduationYear: number;
    major: string;
    bio: string;
  };
}

const ProfileUpdate: React.FC<ProfileUpdateProps> = (props) => {
  const { handleBlur, handleChange, handleSubmit, setFieldValue, user, values } = props;

  const history = useHistory();

  const [email, setEmail] = useState<string>();
  const [bg, setBG] = useState(user.profile.profilePicture);
  const [fileList, setFileList] = useState([] as any[]);
  const [visible, setVisible] = useState(false);
  const [uploadState, setUploadState] = useState('none');
  const dummyRequest = ({ onSuccess }: { onSuccess: Function }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };
  const onFileChange = (info: { [key: string]: any }) => {
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
        fetchUser('');
      })
      .catch(() => {
        setUploadState('none');
      });
  };
  useEffect(() => {
    const keys = ['firstName', 'lastName', 'major', 'bio', 'graduationYear'];
    keys.forEach((key) => {
      setFieldValue(key, user.profile[key]);
    });
    setBG(user.profile.profilePicture);
  }, [user, setFieldValue]);

  useEffect(() => {
    setEmail(user.profile.email);
  }, [user]);

  const InnerRefButton = ANTD.Button as React.ComponentClass<any>;
  const CustomSelect = ANTD.Select as React.ComponentClass<any>;
  const CustomUpload = ANTD.Upload as React.ComponentClass<any>;

  return (
    <div className="update-card">
      <div className="updatecontent">
        <h1 className="title">Profile</h1>
        <Avatar size={145} src={bg} className="avatar" />
        <br />
        <Button type="primary" className="upload-modal-button" onClick={showModal}>
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
            <Button key="submit" type="primary" loading={uploadState === 'uploading'} onClick={uploadPhoto} disabled={fileList.length === 0}>
              {uploadState !== 'uploading' && <UploadOutlined />} Upload
            </Button>,
          ]}
        >
          <div className="upload-wrapper">
            <CustomUpload
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
                <Avatar size={115} src={bg || getDefaultProfile()} className="avatar" />
              </div>
              <InnerRefButton className="upload-button" innerRef={uploadImageButton}>
                Change Picture
              </InnerRefButton>
            </CustomUpload>
          </div>
        </Modal>
        <div className="divider" />
        <Form.Item label="Email">
          <Input name="email" className="input-box" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Button
          key="submit"
          type="primary"
          className="save-button"
          onClick={() => {
            updateEmail(email);
          }}
        >
          Update Email
        </Button>
        <div className="divider" />
        <form onSubmit={handleSubmit} className="update-profile-form">
          <Form.Item label="First name">
            <Input name="firstName" className="input-box" value={values.firstName} onChange={handleChange} onBlur={handleBlur} />
          </Form.Item>
          <Form.Item label="Last name">
            <Input name="lastName" className="input-box" value={values.lastName} onChange={handleChange} onBlur={handleBlur} />
          </Form.Item>
          <div className="horizontal-input">
            <Form.Item label="Year">
              <CustomSelect
                name="graduationYear"
                value={values.graduationYear}
                className="year"
                onBlur={(value: string | number) => {
                  setFieldValue('graduationYear', value);
                }}
                onChange={(value: string | number) => {
                  setFieldValue('graduationYear', value);
                }}
              >
                {years.map((num) => (
                  <Option key={num} value={num}>
                    {num}
                  </Option>
                ))}
              </CustomSelect>
            </Form.Item>
            <Form.Item label="Major">
              <CustomSelect
                showSearch
                placeholder="Major"
                className="major"
                value={values.major}
                onChange={(value: string) => setFieldValue('major', value)}
                onBlur={(value: string) => setFieldValue('major', value)}
              >
                {majorsData.majors.map((major) => (
                  <Option key={major} value={major}>
                    {major}
                  </Option>
                ))}
              </CustomSelect>
            </Form.Item>
          </div>
          <Form.Item label="About">
            <TextArea name="bio" className="area-box" value={values.bio} onChange={handleChange} onBlur={handleBlur} />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="save-button">
            Save Profile Changes
          </Button>
          <Button type="danger" className="discard-button" onClick={() => history.push('/profile')}>
            Discard
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
