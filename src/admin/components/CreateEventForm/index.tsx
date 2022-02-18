import React, { ChangeEventHandler, FocusEventHandler, FormEventHandler } from 'react';
import { Form, Input, Button, Select, DatePicker, TimePicker, Upload } from 'antd';
import { useHistory } from 'react-router-dom';
import ImgCrop from 'antd-img-crop';
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import * as moment from 'moment';

import { copyLink } from '../../adminActions';

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
  errors: {
    title: string | null;
    committee: string | null;
    location: string | null;
    pointValue: string | null;
    startDate: string | null;
    startTime: string | null;
    endDate: string | null;
    endTime: string | null;
    cover: string | null;
    attendanceCode: string | null;
    description: string | null;
  };
}

/* Future Note: Add a fun generate attendance code function :) based on title */
const CreateEventForm: React.FC<CreateEventFormProps> = (props) => {
  const { handleBlur, handleChange, handleSubmit, setFieldTouched, setFieldValue, values, errors } = props;
  const history = useHistory();

  return (
    <div className="create-event-form">
      <div className="create-event-form-wrapper">
        <h1 className="subtitle">Create an Event</h1>
        <form onSubmit={handleSubmit}>
          <Form.Item label="Event Title">
            <Input name="title" className="input-box" value={values.title} onChange={handleChange} onBlur={handleBlur} />
          </Form.Item>
          <p className="form-error">{errors.title ? errors.title : null}</p>
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
          <p className="form-error">{errors.committee ? errors.committee : null}</p>
          <div className="horizontal-input">
            <Form.Item className="location-wrapper" label="Location">
              <Input name="location" className="location" value={values.location} onChange={handleChange} onBlur={handleBlur} />
              <p className="form-error">{errors.location ? errors.location : null}</p>
            </Form.Item>
            <Form.Item className="points-wrapper" label="Points">
              <Input name="pointValue" className="points" value={values.pointValue} onChange={handleChange} onBlur={handleBlur} />
              <p className="form-error">{errors.pointValue ? errors.pointValue : null}</p>
            </Form.Item>
          </div>
          <div className="horizontal-input">
            <Form.Item className="date-wrapper" label="Start Date">
              <DatePicker className="date" value={values.startDate} onChange={(date) => setFieldValue('startDate', date)} />
              <p className="form-error">{errors.startDate ? errors.startDate : null}</p>
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
              <p className="form-error">{errors.startTime ? errors.startTime : null}</p>
            </Form.Item>
          </div>
          <div className="horizontal-input">
            <Form.Item className="date-wrapper" label="End Date">
              <DatePicker className="date" value={values.endDate} onChange={(date) => setFieldValue('endDate', date)} />
              <p className="form-error">{errors.endDate ? errors.endDate : null}</p>
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
              <p className="form-error">{errors.endTime ? errors.endTime : null}</p>
            </Form.Item>
          </div>
          <Form.Item className="cover-wrapper" label="Cover Link">
            <ImgCrop aspect={16 / 9}>
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
            </ImgCrop>
          </Form.Item>
          <p className="form-error">{errors.cover ? errors.cover : null}</p>
          <Form.Item label="Attendance Code">
            <Input name="attendanceCode" className="input-box" value={values.attendanceCode} onChange={handleChange} onBlur={handleBlur} />
            <p className="form-error">{errors.attendanceCode ? errors.attendanceCode : null}</p>
          </Form.Item>
          <Form.Item label="Description">
            <TextArea name="description" className="area-box" value={values.description} onChange={handleChange} onBlur={handleBlur} />
            <p className="form-error">{errors.description ? errors.description : null}</p>
          </Form.Item>
          <Button type="primary" htmlType="submit" className="save-button">
            Add Event
          </Button>
          <Button
            type="danger"
            className="discard-button"
            onClick={() => {
              history.goBack();
            }}
          >
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
