import React, { MouseEventHandler } from 'react';
import { Modal } from 'antd';

import './style.less';

interface ModalComponentProps {
  title: string;
  image: string;
  visible: boolean;
  handleOk: MouseEventHandler;
  handleCancel: MouseEventHandler;
  content: string;
}

const ModalComponent: React.FC<ModalComponentProps> = (props) => {
  const { title, image, visible, handleOk, handleCancel, content } = props;

  return (
    <Modal
      className="modal"
      footer={null}
      onOk={handleOk}
      onCancel={handleCancel}
      title={title}
      visible={visible}
    >
      <img className="cover" alt="cover" src={image} />
      <p>{content}</p>
    </Modal>
  );
};

ModalComponent.propTypes = {};
export default ModalComponent;
