// component for admin table to use inside of userresumetable component
import React, { useState } from 'react';
import { Table, Button, Avatar } from 'antd';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import './style.less';
import { getDefaultProfile } from '../../../utils';
import { UserResume } from '../../../types';

interface UserResumeTableProps {
  resumes: UserResume[];
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

  const reformatDate = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  // creates a zip file from all the url links for each selected resume and downloads it
  const saveZip = (filename: string, urls: string[]) => {
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
    const selectedResumeLinks: string[] = selectedRowKeys.map((key) => resumes.find((resume) => resume.uuid === key)?.url ?? '');
    saveZip(fileName, selectedResumeLinks);
  };

  const columns = [
    {
      title: 'File Name',
      dataIndex: 'url',
      ellipsis: true,
      render: (url: string) => <a href={url}>{decodeURIComponent(url.substring(url.lastIndexOf('/') + 1))}</a>,
    },
    {
      title: 'Uploader',
      ellipsis: true,
      render: (record: UserResume) => (
        <div className="uploader-container">
          <Avatar className="avatar" src={record.user.profilePicture || getDefaultProfile()} />
          <a href={`/profile/${record.user.uuid}`} className="name">
            {`${record.user.firstName} ${record.user.lastName}`}
          </a>
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
  ];

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
          columns={columns}
          dataSource={resumes?.map((resume) => ({ ...resume, key: resume.uuid }))}
        />
      </div>
    </div>
  );
};

export default UserResumeTable;
