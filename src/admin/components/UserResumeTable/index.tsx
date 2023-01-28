// component for admin table to use inside of userresumetable component
import React, { useState } from 'react';
import { Table, Button, Avatar } from 'antd';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import './style.less';
import { getDefaultProfile } from '../../../utils';

type Resume = {
  uuid: React.Key;
  isResumeVisible: boolean;
  url: string;
  lastUpdated: string;
  user: {
    uuid: React.Key;
    firstName: string;
    lastName: string;
    profilePicture: string | null;
    graduationYear: number;
    major: string;
    bio: string | null;
    points: number;
  };
}[];

interface UserResumeTableProps {
  resumes: Resume;
}

const UserResumeTable: React.FC<UserResumeTableProps> = (props) => {
  const { resumes } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const fileName = 'acm_resumes';

  const resumeSelection = {
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  function reformatDate(dateString) {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  }

  // creates a zip file from all the url links for each selected resume and downloads it
  const saveZip = (filename, urls) => {
    if (!urls) return;

    const zip = new JSZip();
    const folder = zip.folder(filename);
    urls.forEach((url) => {
      const promise = fetch(url).then((r) => {
        if (r.status === 200) return r.blob();
        return Promise.reject(new Error(r.statusText));
      });
      const name = decodeURI(url.substring(url.lastIndexOf('/') + 1));
      folder?.file(name, promise);
    });
    zip.generateAsync({ type: 'blob' }).then((blob) => saveAs(blob, filename));
  };

  const handleDonwloadZip = () => {
    const selectedResumeLinks = selectedRowKeys.map((key) => resumes.find((resume) => resume.uuid === key)?.url);
    saveZip(fileName, selectedResumeLinks);
  };

  return (
    <div className="user-resume-table">
      <div className="download-button-container">
        {selectedRowKeys.length > 0 ? (
          <Button type="primary" onClick={handleDonwloadZip} className="download-button">
            Download ZIP
          </Button>
        ) : (
          <Button type="primary" className="download-button-disabled" disabled>
            Download ZIP
          </Button>
        )}
      </div>
      <div className="table-container">
        <Table
          className="table"
          rowSelection={resumeSelection}
          columns={[
            {
              title: 'File Name',
              dataIndex: 'url',
              ellipsis: true,
              render: (url: string) => <a href={url}>{decodeURIComponent(url.substring(url.lastIndexOf('/') + 1))}</a>,
            },
            // TODO: Clean up type definitions
            {
              title: 'Uploader',
              ellipsis: true,
              render: (text, record: any) => (
                <div className="uploader-container">
                  <Avatar className="avatar" src={record.user.profilePicture || getDefaultProfile()} />
                  <span className="name"> {`${record.user.firstName} ${record.user.lastName}`} </span>
                </div>
              ),
            },
            {
              title: 'Major',
              dataIndex: 'user.major',
            },
            {
              title: 'Planned Graduation',
              dataIndex: 'user.graduationYear',
            },
            {
              title: 'Date Uploaded',
              dataIndex: 'lastUpdated',
              render: (date: string) => <span>{reformatDate(date)}</span>,
            },
          ]}
          dataSource={resumes?.map((resume) => ({ ...resume, key: resume.uuid }))}
        />
      </div>
    </div>
  );
};

export default UserResumeTable;
