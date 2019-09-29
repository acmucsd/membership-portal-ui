import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

import './style.less';

const ModalComponent = props => {
  return (
    <Modal
      title={props.title}
      visible={props.visible}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
    >
      <p>{props.content}</p>
    </Modal>
  );
***REMOVED***

ModalComponent.propTypes = {
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
***REMOVED***
export default ModalComponent;
