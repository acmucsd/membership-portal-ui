import React, { useState } from 'react';
import { Avatar, Checkbox, Form, Input, Modal, Row, Col } from 'antd';
import Icon from '@ant-design/icons';
import { ReactComponent as CommentBoxEmpty } from '../../assets/icons/CommentBoxEmpty.svg';

import './style.less';

interface AdminOrderItemProps {
  orderItem: {
    uuid: string;
    itemName: string;
    quantity: number;
    price: number;
    description: string;
    notes: string;
  };
}

const AdminOrderItem: React.FC<AdminOrderItemProps> = (props) => {
  const [visible, setVisible] = useState(false);
  const [note, setNote] = useState('');
  const [fulfilled, setFulfilled] = useState(false);
  const showNote = () => {
    setVisible(true);
  };

  const closeNote = () => {
    setVisible(false);
  };

  const handleOk = () => {
    // For now, console statements. These will be removed
    // when the API is implemented in actions.
    // eslint-disable-next-line no-console
    console.log(`Update note is called here! Contents: ${note}`);
    setVisible(false);
  };

  const { orderItem } = props;
  return (
    <Row align="middle" justify="center" className="order-item">
      <Modal title="Notes" visible={visible} onOk={handleOk} okText="Submit" onCancel={closeNote}>
        <form>
          <Form.Item className="note">
            <Input.TextArea
              name="note"
              onChange={(event) => setNote(event.target.value)}
              rows={4}
              value={note}
            />
          </Form.Item>
        </form>
      </Modal>
      <Col span={2}>
        <div className="item-checkbox">
          <Checkbox
            onChange={(event) => {
              setFulfilled(event.target.checked);
              // eslint-disable-next-line no-console
              console.log(`Fulfill change called! Current value: ${fulfilled}`);
            }}
          />
        </div>
      </Col>
      <Col span={3}>
        <div className="item-icon">
          <Avatar shape="square">{orderItem.itemName}</Avatar>
        </div>
      </Col>
      <Col span={14}>
        <div>
          <h4 className="item-name">{orderItem.itemName}</h4>
        </div>
      </Col>
      <Col span={3}>
        <div className="item-quantity">
          <p>x{orderItem.quantity}</p>
        </div>
      </Col>
      <Col span={2}>
        <div className="item-notes">
          <Icon onClick={showNote} component={CommentBoxEmpty} />
        </div>
      </Col>
    </Row>
  );
};

export default AdminOrderItem;
