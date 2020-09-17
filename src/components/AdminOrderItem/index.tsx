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
  noteVisible: boolean;
  setNoteVisible: Function;
  setScratchNote: Function;
}

const AdminOrderItem: React.FC<AdminOrderItemProps> = (props) => {
  const { orderItem, setFulfill, setNote, noteVisible, setNoteVisible, setScratchNote } = props;
  return (
    <Row align="middle" justify="center" className="order-item">
      <Modal
        title="Notes"
        visible={noteVisible}
        okText="Submit"
        onOk={() => {
          setNote(orderItem, orderItem.scratchNote);
          setNoteVisible(false);
        }}
        onCancel={() => setNoteVisible(false)}
      >
        <form>
          <Form.Item className="note">
            <Input.TextArea
              name="note"
              value={orderItem.scratchNote}
              onChange={(event) => setScratchNote(orderItem, event.target.value)}
              rows={4}
            />
          </Form.Item>
        </form>
      </Modal>
      <Col span={2}>
        <div className="item-checkbox">
          <Checkbox
            checked={orderItem.fulfilled}
            disabled={orderItem.fulfilled}
            onChange={() => {
              setFulfill(orderItem);
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
            component={orderItem.scratchNote ? CommentBox : CommentBoxEmpty}
          />
        </div>
      </Col>
    </Row>
  );
};

export default AdminOrderItem;
