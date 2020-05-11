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

const days = [];
for (let i = 1; i <= 31; i += 1) {
  days.push(i);
}

const hours = [];
for (let i = 1; i <= 12; i += 1) {
  hours.push(i);
}

/* Future Note: Add a fun generate attendance code function :) based on title */
const CreateEventForm = (props) => {
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldTouched,
    setFieldValue,
    values,
  } = props;

  return (
    <div className="create-event-form">
      <div className="create-event-form-wrapper">
        <h1 className="subtitle">Create an Event</h1>
        <form onSubmit={handleSubmit}>
          <Form.Item label="Event Title">
            <Input
              name="title"
              className="input-box"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Item>
          <Form.Item label="Committee">
            <Input
              name="committee"
              className="input-box"
              value={values.committee}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Item>
          <div className="horizontal-input">
            <Form.Item className="location-wrapper" label="Location">
              <Input
                name="location"
                className="location"
                value={values.location}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
            <Form.Item className="points-wrapper" label="Points">
              <Input
                name="pointValue"
                className="points"
                value={values.pointValue}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
          </div>
          <div className="horizontal-input">
            <Form.Item className="year-wrapper" label="Year">
              <Input
                name="year"
                className="year"
                value={values.year}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
            <Form.Item className="month-wrapper" label="Month">
              <Select
                className="months"
                onChange={(value) => setFieldValue('month', value)}
                onBlur={() => setFieldTouched('month', true)}
                value={values.month}
              >
                {months.map((month) => (
                  <Option key={`month-${month}`} value={month}>
                    {month}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item className="day-wrapper" label="Day">
              <Select
                className="days"
                onChange={(value) => setFieldValue('day', value)}
                onBlur={() => setFieldTouched('day', true)}
                value={values.day}
              >
                {days.map((day) => (
                  <Option key={`day-${day}`} value={day}>
                    {day}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="time-input">
            <Form.Item className="start-time" label="Start Time">
              <Select
                className="time"
                onChange={(value) => setFieldValue('startTime', value)}
                onBlur={() => setFieldTouched('startTime', true)}
                value={values.startTime}
              >
                {hours.map((hour) => (
                  <Option key={`start-${hour}`} value={hour}>
                    {hour}
                  </Option>
                ))}
              </Select>
              <Select
                className="ampm"
                onChange={(value) => setFieldValue('startAm', value)}
                onBlur={() => setFieldTouched('startAm', true)}
                value={values.startAm}
              >
                <Option value="AM">AM</Option>
                <Option value="PM">PM</Option>
              </Select>
            </Form.Item>
            <Form.Item className="end-time" label="End Time">
              <Select
                className="time"
                onChange={(value) => setFieldValue('endTime', value)}
                onBlur={() => setFieldTouched('endTime', true)}
                value={values.endTime}
              >
                {hours.map((hour) => (
                  <Option key={`end-${hour}`} value={hour}>
                    {hour}
                  </Option>
                ))}
              </Select>
              <Select
                className="ampm"
                onChange={(value) => setFieldValue('endAm', value)}
                onBlur={() => setFieldTouched('endAm', true)}
                value={values.endAm}
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
              value={values.cover}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Item>
          <Form.Item label="Attendance Code">
            <Input
              name="attendanceCode"
              className="input-box"
              value={values.attendanceCode}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Item>
          <Form.Item label="Description">
            <TextArea
              name="description"
              className="area-box"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
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
};

CreateEventForm.propTypes = {
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  values: PropTypes.shape({
    title: PropTypes.string.isRequired,
    committee: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    pointValue: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    month: PropTypes.string.isRequired,
    day: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    startAm: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    endAm: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    attendanceCode: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default CreateEventForm;
