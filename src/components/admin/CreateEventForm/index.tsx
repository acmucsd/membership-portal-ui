import React, { ChangeEventHandler, FocusEventHandler, FormEventHandler } from 'react';
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

const days: number[] = [];
for (let i = 1; i <= 31; i += 1) {
  days.push(i);
}

const hours: number[] = [];
for (let i = 1; i <= 12; i += 1) {
  hours.push(i);
}

interface CreateEventFormProps {
  handleBlur: FocusEventHandler
  handleChange: ChangeEventHandler
  handleSubmit: FormEventHandler
  setFieldTouched: Function
  setFieldValue: Function
  values: {
    title: string,
    committee: string,
    location: string,
    pointValue: string,
    year: string,
    month: string,
    day: string,
    startTime: string,
    startAm: string,
    endTime: string,
    endAm: string,
    cover: string,
    attendanceCode: string,
    description: string
  }
}

/* Future Note: Add a fun generate attendance code function :) based on title */
const CreateEventForm: React.FC<CreateEventFormProps> = (props) => {
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
                onChange={(value: string) => setFieldValue('month', value)}
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
                onChange={(value: string) => setFieldValue('day', value)}
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
                onChange={(value: string) => setFieldValue('startTime', value)}
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
                onChange={(value: string) => setFieldValue('startAm', value)}
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
                onChange={(value: string) => setFieldValue('endTime', value)}
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
                onChange={(value: string) => setFieldValue('endAm', value)}
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

export default CreateEventForm;
