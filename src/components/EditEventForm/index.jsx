import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Select } from 'antd';
import { fetchEvent } from '../../actions/eventsActions';
import { useParams } from 'react-router-dom';

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

const EditEventForm = props => {
  const params = useParams();
  useEffect(() => {
    props.setFieldValue('uuid', params.uuid);
  }, []);

  useEffect(() => {
    if (props.event) {
      let keys = ['title', 'location', 'pointValue', ' startTime', ' startAm', 'endTime', 'month', 'day', 'cover', 'description', 'attendanceCode'];
      keys.forEach((key) => {
        props.setFieldValue(key, props.event[key]);
***REMOVED***;
      if (props.event['start']) {
        let start = new Date(props.event['start']);
        props.setFieldValue('month', months[start.getMonth()]);
        props.setFieldValue('startTime', start.getHours() % 12);
        let half = 'AM';
        if (start.getHours() >= 12) {
          half = 'PM';
        }
        props.setFieldValue('startAm', half);
        props.setFieldValue('day', start.getDate());
      }
      if (props.event['end']) {
        let end = new Date(props.event['end']);
        let half = 'AM';
        if (end.getHours() >= 12) {
          half = 'PM';
        }
        props.setFieldValue('endTime', end.getHours() % 12);
        props.setFieldValue('endAm', half);
      }
    }
  }, [props.event]);

  return (
    <div className="edit-event-form">
      <div className="edit-event-form-wrapper">
        <h1 className="subtitle">Edit an Event</h1>
        <form onSubmit={props.handleSubmit}>
          <Input type="hidden" value={props.values.uuid} name="uuid" />
          <Form.Item label="Event Title">
            <Input
              name="title"
              className="input-box"
              value={props.values.title}
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
                value={props.values.location}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
              />
            </Form.Item>
            <Form.Item
              className="points-wrapper"
              label="Points"
            >
              <Input
                name="pointValue"
                className="points"
                value={props.values.pointValue}
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
              <Select
                className="months"
                onChange={(value) => props.setFieldValue('month', value)}
                onBlur={()=> props.setFieldTouched('month', true)}
                value={props.values.month}
              >
                {months.map(month => (
                  <Option
                    key={`month-${month}`}
                    value={month}
                  >
                    {month}
                  </Option>
            ***REMOVED***)}
              </Select>
            </Form.Item>
            <Form.Item
              className="day-wrapper"
              label="Day"
            >
              <Select
                className="days"
                onChange={(value) => props.setFieldValue('day', value)}
                onBlur={()=> props.setFieldTouched('day', true)}
                value={props.values.day}
              >
                {days.map(day => (
                  <Option
                    key={`day-${day}`}
                    value={day}
                  >
                    {day}
                  </Option>
            ***REMOVED***)}
              </Select>
            </Form.Item>
          </div>
          <div className="time-input">
            <Form.Item
              className="start-time"
              label="Start Time"
            >
              <Select
                className="time"
                onChange={(value) => props.setFieldValue('startTime', value)}
                onBlur={()=> props.setFieldTouched('startTime', true)}
                value={props.values.startTime}
              >
                {hours.map(hour => (
                  <Option
                    key={`start-${hour}`}
                    value={hour}
                  >
                    {hour}
                  </Option>
            ***REMOVED***)}
              </Select>
              <Select
                className="ampm"
                onChange={(value) => props.setFieldValue('startAm', value)}
                onBlur={()=> props.setFieldTouched('startAm', true)}
                value={props.values.startAm}
              >
                <Option value="AM">AM</Option>
                <Option value="PM">PM</Option>
              </Select>
            </Form.Item>
            <Form.Item
              className="end-time"
              label="End Time"
            >
              <Select
                className="time"
                onChange={(value) => props.setFieldValue('endTime', value)}
                onBlur={()=> props.setFieldTouched('endTime', true)}
                value={props.values.endTime}
              >
                {hours.map(hour => (
                  <Option
                    key={`end-${hour}`}
                    value={hour}
                  >
                    {hour}
                  </Option>
            ***REMOVED***)}
              </Select>
              <Select
                className="ampm"
                onChange={(value) => props.setFieldValue('endAm', value)}
                onBlur={()=> props.setFieldTouched('endAm', true)}
                value={props.values.endAm}
              >
                <Option value="AM">AM</Option>
                <Option value="PM">PM</Option>
              </Select>
            </Form.Item>
          </div>
          <Form.Item label="Cover Link">
            <Input
              name="cover"
              className="input-box"
              value={props.values.cover}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
          </Form.Item>
          <Form.Item label="Attendance Code">
            <Input
              name="attendanceCode"
              className="input-box"
              value={props.values.attendanceCode}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
          </Form.Item>
          <Form.Item label="Description">
            <TextArea
              name="description"
              className="area-box"
              value={props.values.description}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="save-button">
            Submit Edits
          </Button>
          <Button type="danger" className="discard-button">
            Discard
          </Button>
        </form>
      </div>
    </div>
  );
***REMOVED***

EditEventForm.propTypes = {
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  values: PropTypes.object.isRequired,
***REMOVED***

export default EditEventForm;
