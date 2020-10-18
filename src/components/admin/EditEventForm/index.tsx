import React, { useEffect, FocusEventHandler, ChangeEventHandler, FormEventHandler } from 'react';
import { Form, Input, Button, Select, DatePicker, TimePicker } from 'antd';
import { useParams, useHistory } from 'react-router-dom';
import * as moment from 'moment';
import { notify } from '../../../utils';

import './style.less';

const { Option } = Select;
const { TextArea } = Input;

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
  values: { [key: string]: any };
  copyLink: Function;
}

const EditEventForm: React.FC<EditEventFormProps> = (props) => {
  const {
    event,
    setFieldValue,
    setFieldTouched,
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    copyLink,
  } = props;

  const params: { [key: string]: any } = useParams();
  const history = useHistory();

  const handleDelete = () => {
    props
      .deleteEvent(props.values.uuid)
      .then(() => {
        history.push('/');
      })
      .catch((error: string) => {
        notify('Failed to delete the event', error);
      });
  };

  useEffect(() => {
    setFieldValue('uuid', params.uuid);
  }, []);

  useEffect(() => {
    if (event) {
      const keys = [
        'title',
        'location',
        'pointValue',
        'start',
        'end',
        'cover',
        'description',
        'attendanceCode',
        'committee',
      ];
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
  }, [event]);

  return (
    <div className="edit-event-form">
      <div className="edit-event-form-wrapper">
        <h1 className="subtitle">Edit an Event</h1>
        <form onSubmit={handleSubmit}>
          <Input type="hidden" value={values.uuid} name="uuid" />
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
            <Form.Item className="date-wrapper" label="Start Date">
              <DatePicker
                value={values.startDate}
                onChange={(date) => setFieldValue('startDate', date)}
              />
            </Form.Item>
            <Form.Item className="time-wrapper" label="Start Time">
              <TimePicker
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
                value={values.endDate}
                onChange={(date) => setFieldValue('endDate', date)}
              />
            </Form.Item>
            <Form.Item className="time-wrapper" label="End Time">
              <TimePicker
                use12Hours
                format="h:mm a"
                minuteStep={15}
                value={values.endTime}
                onChange={(time) => setFieldValue('endTime', time)}
              />
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
              copyLink(values.attendanceCode);
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
