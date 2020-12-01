import React, { ChangeEventHandler, FocusEventHandler, FormEventHandler } from 'react';
import { Form, Input, Button, Select, DatePicker, TimePicker, Upload } from 'antd';
import * as moment from 'moment';

import './style.less';

const { Option } = Select;
const { TextArea } = Input;

const suborgs = ['General', 'AI', 'Cyber', 'Design', 'Hack', 'Innovate'];

interface CreateEventFormProps {
  handleBlur: FocusEventHandler;
  handleChange: ChangeEventHandler;
  handleSubmit: FormEventHandler;
  setFieldTouched: Function;
  setFieldValue: Function;
  values: {
    title: string;
    committee: string;
    location: string;
    pointValue: string;
    startDate: moment.Moment;
    startTime: moment.Moment;
    endDate: moment.Moment;
    endTime: moment.Moment;
    cover: string;
    attendanceCode: string;
    description: string;
  };
  copyLink: Function;
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
    copyLink,
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
          <Form.Item className="committee-wrapper" label="Community">
            <Select
              showSearch
              className="committee-box"
              size="large"
              optionFilterProp="children"
              value={values.committee}
              onChange={(value: string) => setFieldValue('committee', value)}
              onBlur={() => setFieldTouched('committee', true)}
              filterOption={(input, option) => {
                const suborg: string = option.props.children as string;
                return suborg.toLowerCase().indexOf(input.toLowerCase()) >= 0;
              }}
            >
              {suborgs.map((suborg) => (
                <Option value={`${suborg}`}>{suborg}</Option>
              ))}
            </Select>
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
            <Form.Item className="date-wrapper" label="Start Date">
              <DatePicker
                className="date"
                value={values.startDate}
                onChange={(date) => setFieldValue('startDate', date)}
              />
            </Form.Item>
            <Form.Item className="time-wrapper" label="Start Time">
              <TimePicker
                className="time"
                use12Hours
                format="h:mm a"
                minuteStep={15}
                value={values.startTime}
                onChange={(time) => setFieldValue('startTime', time)}
              />
            </Form.Item>
          </div>
          <div className="horizontal-input">
            <Form.Item className="date-wrapper" label="End Date">
              <DatePicker
                className="date"
                value={values.endDate}
                onChange={(date) => setFieldValue('endDate', date)}
              />
            </Form.Item>
            <Form.Item className="time-wrapper" label="End Time">
              <TimePicker
                className="time"
                use12Hours
                format="h:mm a"
                minuteStep={15}
                value={values.endTime}
                onChange={(time) => setFieldValue('endTime', time)}
              />
            </Form.Item>
          </div>
          <Form.Item className="cover-wrapper" label="Cover Link">
            <Upload
              name="cover"
              className="cover"
              accept="image/*"
              listType="picture"
              customRequest={(options) => {
                setFieldValue('cover', options.file);
              }}
            >
              <Button>Click to upload</Button>
            </Upload>
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
          <Button
            type="primary"
            className="link-button"
            onClick={() => {
              copyLink(values.attendanceCode);
            }}
          >
            Copy Checkin Link
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateEventForm;
