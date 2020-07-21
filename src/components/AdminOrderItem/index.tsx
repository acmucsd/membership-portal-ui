import React from 'react';
import { Avatar, Checkbox, Row, Col } from 'antd';
import Icon from '@ant-design/icons';
import { ReactComponent as CommentBoxEmpty } from '../../assets/icons/CommentBoxEmpty.svg';

import './style.less';

interface AdminOrderItemProps {
  orderItem: {
    uuid: string;
    itemName: string;
    quantity: number;
    fulfilled: boolean;
    price: number;
    description: string;
    notes: string;
  };
  triggerModal: Function;
  setFulfill: Function;
}

const AdminOrderItem: React.FC<AdminOrderItemProps> = (props) => {
  const { orderItem, triggerModal, setFulfill } = props;
  return (
    <Row align="middle" justify="center" className="order-item">
      <Col span={2}>
        <div className="item-checkbox">
          <Checkbox
            onChange={(event) => {
              // eslint-disable-next-line no-console
              setFulfill(event.target.checked);
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
          <Icon onClick={() => triggerModal(true)} component={CommentBoxEmpty} />
        </div>
      </Col>
    </Row>
  );
};

export default AdminOrderItem;
