import React, { useState } from 'react';
import { Upload } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import ImgCrop from 'antd-img-crop';

import StoreButton from '../StoreButton';

import './style.less';

interface StoreImageUploadProps {
  existingFile?: string;
  setFieldValue: Function;
  error?: string | false | undefined;
}

const StoreImageUpload: React.FC<StoreImageUploadProps> = (props) => {
  const { existingFile, setFieldValue, error } = props;

  const [fileList, setFileList] = useState<any[]>([]);

  const handleChange: (info: UploadChangeParam) => void = ({ fileList: newFileList }) => {
    if (newFileList.length === 1) {
      setFileList([{ ...newFileList[0], name: 'New Image' }]);
    } else {
      setFileList([{ ...newFileList[1], name: 'New Image' }]);
    }
  };

  return (
    <div className="store-image-upload">
      {existingFile && (
        <div className="store-image-upload-image-container">
          <img className="store-image-upload-image" src={existingFile} alt="Existing Item" />
        </div>
      )}
      <ImgCrop rotate>
        <Upload
          name="cover"
          className="cover"
          accept="image/*"
          multiple={false}
          fileList={fileList}
          listType="picture"
          onChange={handleChange}
          customRequest={(options) => {
            setFieldValue('newPicture', options.file);
          }}
        >
          <StoreButton type="secondary" size="medium" text="Upload Image" />
        </Upload>
      </ImgCrop>
      {error && <p className="store-image-upload-error">{error}</p>}
    </div>
  );
};

export default StoreImageUpload;
