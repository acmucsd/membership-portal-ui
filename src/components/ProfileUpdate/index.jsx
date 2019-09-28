import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Select } from 'antd';

import './style.less';

const { Option } = Select;
const { TextArea } = Input;

function getYears() {
  const currentYear = new Date().getFullYear();
  return [...Array(6)].map((_, i) => i + currentYear);
}

const years = getYears();

const ProfileUpdate = props => {
  return (
    <div className="update-card">
      <div className="updatecontent">
        <h1 className="title">Profile</h1>
        <form onSubmit={props.handleSubmit}>
          <Form.Item label="First name">
            <Input
              name="firstName"
              className="input-box"
              value={props.values.firstName}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
          </Form.Item>
          <Form.Item label="Last name">
            <Input
              name="lastName"
              className="input-box"
              value={props.values.lastName}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
          </Form.Item>
          <div className="horizontal-input">
            <Form.Item label="Year">
              <Select
                className="year"
                onBlur={value => props.setFieldValue('graduationYear', value)}
                onChange={value => props.setFieldValue('graduationYear', value)}>
                {years.map(num => (
                  <Option key={num} value={num}>
                    {num}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Major">
              <Input
                name="major"
                className="major"
                value={props.values.major}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
              />
            </Form.Item>
          </div>
          <Form.Item label="About">
            <TextArea
              name="about"
              className="area-box"
              value={props.values.about}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="save-button">
            Save Profile Changes
          </Button>
          <Button type="danger" className="discard-button">
            Discard
          </Button>
        </form>
      </div>
    </div>
  );
};

ProfileUpdate.propTypes = {
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  values: PropTypes.object,
};

export default ProfileUpdate;
