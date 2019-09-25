import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Select } from 'antd';

import './style.less';

const { Option } = Select;
const { TextArea } = Input;

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

let days = [];
for (let i = 1; i <= 31; i++) {
  days.push(i);
}

let hours = [];
for (let i = 1; i <= 12; i++) {
  hours.push(i);
}

const CreateEventForm = props => {
  return (
    <div className="create-event-form">
      <div className="create-event-form-wrapper">
        <h1 className="subtitle">Create an Event</h1>
        <form onSubmit={props.handleSubmit}>
          <Form.Item label="Event Title">
            <Input
              name="firstname"
              className="input-box"
              value={props.values}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
          </Form.Item>
          <div className="horizontal-input">
            <Form.Item
              className="location-wrapper"
              label="Location"
            >
              <Input
                name="location"
                className="location"
                value={props.values}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
              />
            </Form.Item>
            <Form.Item
              className="points-wrapper"
              label="Points"
            >
              <Input
                name="points"
                className="points"
                value={props.values}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
              />
            </Form.Item>
          </div>
          <div className="horizontal-input">
            <Form.Item
              className="month-wrapper"
              label="Month"
            >
              <Select className="months" value={props.values}>
                {months.map(month => (
                  <Option value={month}>{month}</Option>
            ***REMOVED***)}
              </Select>
            </Form.Item>
            <Form.Item
              className="day-wrapper"
              label="Day"
            >
              <Select className="days" value={props.values}>
                {days.map(days => (
                  <Option value={days}>{days}</Option>
            ***REMOVED***)}
              </Select>
            </Form.Item>
          </div>
          <div className="time-input">
            <Form.Item
              className="start-time"
              label="Start Time"
            >
              <Select className="time" value={props.values}>
                {hours.map(hour => (
                  <Option value={hour}>{hour}</Option>
            ***REMOVED***)}
              </Select>
              <Select className="ampm" value={props.values}>
                <Option value="AM">AM</Option>
                <Option value="PM">PM</Option>
              </Select>
            </Form.Item>
            <Form.Item
              className="end-time"
              label="End Time"
            >
              <Select className="time" value={props.values}>
                {hours.map(hour => (
                  <Option value={hour}>{hour}</Option>
            ***REMOVED***)}
              </Select>
              <Select className="ampm" value={props.values}>
                <Option value="AM">AM</Option>
                <Option value="PM">PM</Option>
              </Select>
            </Form.Item>
          </div>
          <Form.Item label="Facebook Link">
            <Input
              name="firstname"
              className="input-box"
              value={props.values}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
          </Form.Item>
          <Form.Item label="Description">
            <TextArea
              name="description"
              className="area-box"
              value={props.values}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="save-button">
            Add Event
          </Button>
          <Button type="danger" className="discard-button">
            Discard
          </Button>
        </form>
      </div>
    </div>
  );
***REMOVED***

CreateEventForm.propTypes = {
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  values: PropTypes.string,
***REMOVED***

export default CreateEventForm;
