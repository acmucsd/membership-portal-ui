import React from 'react';
import { Avatar, Row, Col } from 'antd';
import Icon from '@ant-design/icons';
import { ReactComponent as CommentBoxEmpty } from '../../assets/icons/CommentBoxEmpty.svg';

import './style.less';

interface AdminOrderItemProps {
  orderItem: {
    itemName: string;
    quantity: number;
    price: number;
    description: string;
    notes: string;
  };
}

const AdminOrderItem: React.FC<AdminOrderItemProps> = (props) => {
  const { orderItem } = props;
  return (
    <Row align="middle" justify="center" className="order-item">
      <Col span={2} />
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
          <Icon component={CommentBoxEmpty} />
        </div>
      </Col>
    </Row>
  );
};

export default AdminOrderItem;
