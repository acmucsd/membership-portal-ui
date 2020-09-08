import React, { useState } from 'react';
import { Avatar, Checkbox, Form, Input, Row, Col, Modal } from 'antd';
import Icon from '@ant-design/icons';
import { OrderItem } from '../../types/merch';
import { ReactComponent as CommentBoxEmpty } from '../../assets/icons/CommentBoxEmpty.svg';
import { ReactComponent as CommentBox } from '../../assets/icons/CommentBox.svg';

import './style.less';

interface AdminOrderItemProps {
  orderItem: OrderItem;
  setFulfill: Function;
  setNote: Function;
}

const AdminOrderItem: React.FC<AdminOrderItemProps> = (props) => {
  const { orderItem, setFulfill, setNote } = props;
  const [noteVisible, setNoteVisible] = useState(false);
  const [scratchNote, setScratchNote] = useState(orderItem.notes || '');
  const [checkboxDisabled, setCheckboxDisable] = useState(orderItem.fulfilled);
  return (
    <Row align="middle" justify="center" className="order-item">
      <Modal
        title="Notes"
        visible={noteVisible}
        okText="Submit"
        onOk={() => {
          setNote(orderItem, scratchNote);
          setNoteVisible(false);
        }}
        onCancel={() => setNoteVisible(false)}
      >
        <form>
          <Form.Item className="note">
            <Input.TextArea
              name="note"
              value={scratchNote}
              onChange={(event) => setScratchNote(event.target.value)}
              rows={4}
            />
          </Form.Item>
        </form>
      </Modal>
      <Col span={2}>
        <div className="item-checkbox">
          <Checkbox
            checked={checkboxDisabled}
            disabled={checkboxDisabled}
            onChange={() => {
              // eslint-disable-next-line no-console
              setFulfill(orderItem);
              setCheckboxDisable(true);
            }}
          />
        </div>
      </Col>
      <Col span={3}>
        <div className="item-icon">
          <Avatar shape="square">{orderItem.item.picture}</Avatar>
        </div>
      </Col>
      <Col span={14}>
        <div>
          <h4 className="item-name">{orderItem.item.itemName}</h4>
        </div>
      </Col>
      <Col span={3}>
        <div className="item-quantity">
          <p>x{orderItem.quantity}</p>
        </div>
      </Col>
      <Col span={2}>
        <div className="item-notes">
          <Icon
            onClick={() => setNoteVisible(true)}
            component={scratchNote ? CommentBox : CommentBoxEmpty}
          />
        </div>
      </Col>
    </Row>
  );
};

export default AdminOrderItem;
