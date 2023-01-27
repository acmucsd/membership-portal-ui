import React, { useEffect, FocusEventHandler, ChangeEventHandler, FormEventHandler } from 'react';
import { Form, Input, Button, Select, DatePicker, TimePicker, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import { useParams, useHistory } from 'react-router-dom';
import * as moment from 'moment';

import './style.less';
import { Event } from '../../../types';

const { Option } = Select;
const { TextArea } = Input;

const suborgs = ['General', 'AI', 'Cyber'];

interface EventProp {
  start: string;
  end: string;
  [key: string]: any;
}

interface EditEventFormProps {
  event: EventProp;
  deleteEvent: Function;
  setFieldValue: Function;
  setFieldTouched: Function;
  handleBlur: FocusEventHandler;
  handleChange: ChangeEventHandler;
  handleSubmit: FormEventHandler;
  values: Event;
  copyLink: Function;
  errors: {
    uuid: string | null;
    title: string | null;
    location: string | null;
    eventLink: string | null;
    pointValue: string | null;
    startDate: string | null;
    startTime: string | null;
    endDate: string | null;
    endTime: string | null;
    cover: string | null;
    description: string | null;
    attendanceCode: string | null;
    committee: string | null;
  };
}

const EditEventForm: React.FC<EditEventFormProps> = (props) => {
  const {
    event,
    setFieldValue,
    setFieldTouched,
    handleBlur,
    handleChange,
    handleSubmit,
    values: eventData,
    errors,
    copyLink,
    deleteEvent,
    values,
  } = props;

  const params: { [key: string]: any } = useParams();
  const history = useHistory();

  const handleDelete = () => {
    deleteEvent(values.uuid)
      .then(() => {
        history.push('/');
      })
      .catch(() => {});
  };

  useEffect(() => {
    setFieldValue('uuid', params.uuid);
  }, [setFieldValue, params.uuid]);

  useEffect(() => {
    if (event) {
      const keys = ['title', 'location', 'eventLink', 'pointValue', 'start', 'end', 'cover', 'description', 'attendanceCode', 'committee'];
      keys.forEach((key) => {
        switch (key) {
          case 'start':
            setFieldValue('startDate', moment.default(event.start));
            setFieldValue('startTime', moment.default(event.start));
            break;
          case 'end':
            setFieldValue('endDate', moment.default(event.end));
            setFieldValue('endTime', moment.default(event.end));
            break;
          default:
            setFieldValue(key, event[key]);
            break;
        }
      });
    }
  }, [event, setFieldValue]);

  return (
    <div className="edit-event-form">
      <div className="edit-event-form-wrapper">
        <h1 className="subtitle">Edit an Event</h1>
        <form onSubmit={handleSubmit}>
          <Input type="hidden" value={eventData.uuid} name="uuid" />
          <Form.Item label="Event Title">
            <Input name="title" className="input-box" value={eventData.title} onChange={handleChange} onBlur={handleBlur} />
          </Form.Item>
          <p className="form-error">{errors.title ? errors.title : null}</p>
          <Form.Item className="committee-wrapper" label="Community">
            <Select
              showSearch
              className="committee-box"
              size="large"
              optionFilterProp="children"
              value={eventData.committee}
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
              <Input name="location" className="location" value={eventData.location} onChange={handleChange} onBlur={handleBlur} />
              <p className="form-error">{errors.location ? errors.location : null}</p>
            </Form.Item>
            <Form.Item className="points-wrapper" label="Points">
              <Input name="pointValue" className="points" value={eventData.pointValue} onChange={handleChange} onBlur={handleBlur} />
              <p className="form-error">{errors.pointValue ? errors.pointValue : null}</p>
            </Form.Item>
          </div>
          <Form.Item label="Facebook Event Link (Optional)">
            <Input name="eventLink" className="eventLink" value={eventData.eventLink || ''} onChange={handleChange} onBlur={handleBlur} />
            <p className="form-error">{errors.eventLink ? errors.eventLink : null}</p>
          </Form.Item>
          <div className="horizontal-input">
            <Form.Item className="date-wrapper" label="Start Date">
              <DatePicker className="date" value={eventData.startDate} onChange={(date) => setFieldValue('startDate', date)} />
              <p className="form-error">{errors.startDate ? errors.startDate : null}</p>
            </Form.Item>
            <Form.Item className="time-wrapper" label="Start Time">
              <TimePicker
                className="time"
                use12Hours
                format="h:mm a"
                minuteStep={15}
                value={eventData.startTime}
                onChange={(time) => setFieldValue('startTime', time)}
              />
              <p className="form-error">{errors.startTime ? errors.startTime : null}</p>
            </Form.Item>
          </div>
          <div className="horizontal-input">
            <Form.Item className="date-wrapper" label="End Date">
              <DatePicker className="date" value={eventData.endDate} onChange={(date) => setFieldValue('endDate', date)} />
              <p className="form-error">{errors.endDate ? errors.endDate : null}</p>
            </Form.Item>
            <Form.Item className="time-wrapper" label="End Time">
              <TimePicker
                className="time"
                use12Hours
                format="h:mm a"
                minuteStep={15}
                value={eventData.endTime}
                onChange={(time) => setFieldValue('endTime', time)}
              />
              <p className="form-error">{errors.endTime ? errors.endTime : null}</p>
            </Form.Item>
          </div>
          <Form.Item className="cover-wrapper" label="Cover Link">
            {eventData.cover && typeof eventData.cover === 'string' && <img className="cover-preview" src={eventData.cover} alt={eventData.cover} />}
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
            <p className="form-error">{errors.cover ? errors.cover : null}</p>
          </Form.Item>
          <Form.Item label="Attendance Code">
            <Input name="attendanceCode" className="input-box" value={eventData.attendanceCode} onChange={handleChange} onBlur={handleBlur} />
            <p className="form-error">{errors.attendanceCode ? errors.attendanceCode : null}</p>
          </Form.Item>
          <Form.Item label="Description">
            <TextArea name="description" className="area-box" value={eventData.description} onChange={handleChange} onBlur={handleBlur} />
            <p className="form-error">{errors.description ? errors.description : null}</p>
          </Form.Item>
          <Button type="primary" htmlType="submit" className="save-button">
            Submit Edits
          </Button>
          <Button
            type="danger"
            onClick={() => {
              history.goBack();
            }}
            className="discard-button"
          >
            Discard
          </Button>
          <Button
            type="primary"
            className="link-button"
            onClick={() => {
              copyLink(eventData.attendanceCode);
            }}
          >
            Copy Checkin Link
          </Button>
          <Button type="danger" onClick={handleDelete} className="delete-button">
            Delete
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditEventForm;
