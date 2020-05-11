import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

import './style.less';

const ModalComponent = (props) => {
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

ModalComponent.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
};
export default ModalComponent;
