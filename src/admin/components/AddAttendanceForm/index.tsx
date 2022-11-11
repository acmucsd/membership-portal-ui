import React, { useState, FormEventHandler } from 'react';
import { AutoComplete, Form, Input, Button, Select } from 'antd';
import { useHistory } from 'react-router-dom';

import './style.less';

const { Option } = AutoComplete;

interface AddAttendanceFormProps {
  handleSubmit: FormEventHandler;
  isSubmitting: boolean;
  isValidating: boolean;
  setFieldValue: Function;
  values: {
    emails: string[];
    pastEvents: {
      title: string;
      uuid: string;
    }[];
    uuid: string;
    staff: boolean;
    event: string;
  };
}

/* Future Note: Add a fun generate attendance code function :) based on title */
const AddAttendanceForm: React.FC<AddAttendanceFormProps> = (props) => {
  const history = useHistory();
  const { handleSubmit, isSubmitting, isValidating, setFieldValue, values } = props;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [attendees, _setAttendees] = useState<string[]>([]);

  const updateAttendees = (newAttendees: any[]) => {
    _setAttendees(newAttendees);
    setFieldValue('attendees', newAttendees);
  };

  return (
    <div className="add-attendance-form">
      <div className="add-attendance-form-wrapper">
        <h1 className="subtitle">Add Attendance</h1>
        <form onSubmit={handleSubmit}>
          <Input type="hidden" value={attendees} name="attendees" />
          <Form.Item className="event-wrapper" label="Event">
            <Select
              className="events"
              onChange={(value) => {
                setFieldValue('event', value);
              }}
              onBlur={(value) => {
                setFieldValue('event', value);
              }}
            >
              {values.pastEvents.map((pastEvent: { uuid: string; title: string }) => (
                <Option key={pastEvent.uuid} value={pastEvent.uuid}>
                  {pastEvent.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Attendees" className="attendees-list-wrapper">
            <Select mode="multiple" allowClear placeholder="Add Attendees" defaultValue={[]} onChange={updateAttendees}>
              {values.emails.map((email: string) => (
                <Option key={email} value={email}>
                  {email}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit" className="save-button" loading={isSubmitting && isValidating}>
            Submit Edits
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
        </form>
      </div>
    </div>
  );
};

export default AddAttendanceForm;
