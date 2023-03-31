// component for admin table to use inside of userresumetable component
import React, { useEffect, useState } from 'react';
import { Table, Button, Avatar } from 'antd';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import './style.less';
import { getDefaultProfile } from '../../../utils';
import { UserResume } from '../../../types';
import { array } from 'prop-types';

interface UserResumeTableProps {
    resumes: UserResume[];
}

const UserResumeTable: React.FC<UserResumeTableProps> = (props) => {
    const { resumes } = props;
    const [ yearFilters, setYearFilters] = useState([{text: "2026", value: "2026"}]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    useEffect(() => {
        console.log("Use Effect runs");
        //console.log("Use Effect Resumes " + resumes);
        //updateYearFilters();
    });

    const updateYearFilters = () => {
        
        setYearFilters(resumes.filter((value : UserResume, index : number) => 
        {
            //Resumes.indexOf(value) === index checks for first occurance
            return resumes.indexOf(value) === index;
        }).sort().
        map(element => ({text: `${element.user.graduationYear}`, value: `${element.user.graduationYear}`})));
        
    };

    const fileName = 'acm_resumes';

    console.log("Resumes from props: " + props.resumes);
    console.log("Resumes variable: " + resumes);

    // const categoriesOfYear = props.resumes.filter((value : UserResume, index : number) => 
    //     {
    //         //Resumes.indexOf(value) === index checks for first occurance
    //         return resumes.indexOf(value) === index;
    //     }).sort().
    //     map(element => ({text: `${element.user.graduationYear}`, value: `${element.user.graduationYear}`}));


    const resumeSelection = {
        onChange: (newSelectedRowKeys) => {
            console.log("I have done onChange from resumeSelection!");
            console.log(resumes.filter((value: UserResume, index: number) => {
                //Resumes.indexOf(value) === index checks for first occurance

                return resumes.indexOf(value) === index;
            }).sort().
                map(element => ({ text: `${element.user.graduationYear}`, value: `${element.user.graduationYear}` })),

                console.log(resumes.filter((value: UserResume, index: number) => {
                    //Resumes.indexOf(value) === index checks for first occurance

                    return resumes.indexOf(value) === index;
                }).sort()),
            );
            setSelectedRowKeys(newSelectedRowKeys);
        },
    };

    // const handleChange = (pagination, filters, sorter) => {
    //   console.log('Various parameters', pagination, filters, sorter);
    // };

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

    const handleDownloadZip = () => {
        const selectedResumeLinks: string[] = selectedRowKeys.map((key) => resumes.find((resume) => resume.uuid === key)?.url ?? '');
        saveZip(fileName, selectedResumeLinks);
    };



    //TODO: Look for sorter key inside documentation
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
                const fullName2 = `${record2.user.firstName} ${record2.user.lastName}`
                console.log(fullName1);
                console.log(fullName2);
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
            //Have to define filter and onFilter for filtering
            filters: yearFilters,//[{ text: "2016", value: "2016" }],

            onFilterDropdownVisibleChange: visible => {
                if (visible) {
                  setTimeout(() => updateYearFilters());
                }
              },


            //Value we are filtering by, record = content of current row
            onFilter: (value: string, record: UserResume) => `${record.user.graduationYear}` == value,
        },
        {
            title: 'Date Uploaded',
            dataIndex: 'lastUpdated',
            render: (date: string) => <span>{reformatDate(date)}</span>,


            onFilter: (value, record) => record.name.indexOf(value) === 0,

            //Is library specific, we are defining what the function will be
            //defaultSortOrder: 'descend',
            sorter: (a, b) => {
                console.log(a.lastUpdated);
                console.log(b.lastUpdated);
                return a.lastUpdated.localeCompare(b.lastUpdated);
            },
        },
    ];

    const isDownloadButtonDisabled = selectedRowKeys.length < 1;

    console.log("Resumes before return " + resumes);

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
