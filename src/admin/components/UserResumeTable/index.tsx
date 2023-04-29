// component for admin table to use inside of userresumetable component
import React, { useEffect, useState } from 'react';
import { Table, Button, Avatar } from 'antd';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import './style.less';
import { ColumnFilterItem } from 'antd/lib/table';
import { getDefaultProfile } from '../../../utils';
import { UserResume } from '../../../types';
import { values } from 'lodash';

interface UserResumeTableProps {
  resumes: UserResume[];
}

interface YearFilter extends ColumnFilterItem {
  text: string;
  value: string;
}

const UserResumeTable: React.FC<UserResumeTableProps> = (props) => {
  const { resumes } = props;
  const [yearFilters, setYearFilters] = useState<YearFilter[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const updateYearFilters = () => {
    setYearFilters(
      // Resumes.indexOf(value) === index checks for first occurance
      resumes
        ?.sort((resume1, resume2) => resume1.user.graduationYear - resume2.user.graduationYear)
        .filter(
          (value: UserResume, index: number) => resumes.map((resume) => resume.user.graduationYear).indexOf(value.user.graduationYear) === index,
        )
        .map((element) => ({
          text: `${element.user.graduationYear}`,
          value: `${element.user.graduationYear}`,
        })),
    );
  };

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

  useEffect(() => {
    updateYearFilters();
  }, [resumes]);

  const handleDownloadZip = () => {
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

      sorter: (record1: UserResume, record2: UserResume) => {
        const fullName1 = `${record1.user.firstName} ${record1.user.lastName}`;
        const fullName2 = `${record2.user.firstName} ${record2.user.lastName}`;
        return fullName1.localeCompare(fullName2);
      },
    },
    {
      title: 'Major',
      dataIndex: 'user.major',
    },
    {
      title: 'Planned Graduation',
      dataIndex: 'user.graduationYear',

      filterMultiple: true,
      filters: yearFilters, // [{ text: "2016", value: "2016" }],
      // Value we are filtering by, record = content of current row
      onFilter: (value: string, record: UserResume) => `${record.user.graduationYear}` === value,
    },
    {
      title: 'Date Uploaded',
      dataIndex: 'lastUpdated',
      render: (date: string) => <span>{reformatDate(date)}</span>,
      sorter: (user1, user2) => user1.lastUpdated.localeCompare(user2.lastUpdated),
    },
  ];

  const isDownloadButtonDisabled = selectedRowKeys.length < 1;

  return (
    <div className="user-resume-table">
      <div className="download-button-container">
        <Button
          type="primary"
          onClick={handleDownloadZip}
          className={`download-button${isDownloadButtonDisabled ? '-disabled' : ''}`}
          disabled={isDownloadButtonDisabled}
        >
          Download ZIP
        </Button>
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
