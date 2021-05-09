import React, { useState, useEffect, ChangeEventHandler, FocusEventHandler, FormEventHandler } from 'react';
import { AutoComplete, Checkbox, Form, Input, Button, Tooltip, Tag, Icon } from 'antd';
import { useHistory } from 'react-router-dom';

import './style.less';

const { Option } = AutoComplete;

interface AddAttendanceFormProps {
  getAllEmails: Function;
  handleBlur: FocusEventHandler;
  handleChange: ChangeEventHandler;
  handleSubmit: FormEventHandler;
  isSubmitting: boolean;
  isValidating: boolean;
  setFieldValue: Function;
  values: {
    uuid: string;
    staff: boolean;
    event: string;
  };
}

/* Future Note: Add a fun generate attendance code function :) based on title */
const AddAttendanceForm: React.FC<AddAttendanceFormProps> = (props) => {
  const history = useHistory();
  const { getAllEmails, handleBlur, handleChange, handleSubmit, isSubmitting, isValidating, setFieldValue, values } = props;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [attendees, _setAttendees] = useState<string[]>([]);
  const [emails, loadEmails] = useState<string[]>([]);
  const [isStaff, toggleStaff] = useState<boolean>(false);
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    getAllEmails().then((value) => {
      loadEmails(value.emails);
    });
  }, [getAllEmails]);

  const showInput = () => {
    setInputVisible(true);
  };

  const updateAttendees = (newAttendees: any[]) => {
    _setAttendees(newAttendees);
    setFieldValue('attendees', newAttendees);
  };

  const handleClose = (removedAttendee: { [key: string]: any } | string) => {
    const newAttendees = attendees.filter((attendee) => attendee !== removedAttendee);
    updateAttendees(newAttendees);
  };

  const handleInputConfirm = (optionValue?: string) => {
    let newAttendees = attendees;
    // cross check with email list

    if (optionValue) {
      newAttendees = [...newAttendees, optionValue];
    } else if (inputValue && attendees.indexOf(inputValue) === -1) {
      // add to list if input user does not exist
      newAttendees = [...newAttendees, inputValue];
    }
    updateAttendees(newAttendees);
    setInputVisible(false);
    setInputValue('');
  };

  return (
    <div className="add-attendance-form">
      <div className="add-attendance-form-wrapper">
        <h1 className="subtitle">Add Attendance</h1>
        <form onSubmit={handleSubmit}>
          <Input type="hidden" value={attendees} name="attendees" />
          <Form.Item className="event-wrapper" label="Event UUID">
            <Input name="event" className="events" value={values.event} onChange={handleChange} onBlur={handleBlur} />
          </Form.Item>
          <Form.Item label="Attendees" className="attendees-list-wrapper">
            <div>
              {attendees.map((attendee) => {
                const isLongName = attendee.length > 20;
                const tagElem = (
                  <Tag key={attendee} closable onClose={() => handleClose(attendees)} className="attendee-tag">
                    {isLongName ? `${attendee.slice(0, 10)}...` : attendee}
                  </Tag>
                );
                return isLongName ? (
                  <Tooltip title={attendee} key={attendee}>
                    {tagElem}
                  </Tooltip>
                ) : (
                  tagElem
                );
              })}
              {inputVisible && (
                <AutoComplete
                  className="attendee-input"
                  style={{ width: 200 }}
                  filterOption={(input, email) => {
                    return email.props.children?.toString().toLowerCase().indexOf(input.toLowerCase()) !== -1;
                  }}
                  onChange={(value) => {
                    setInputValue(value.toString());
                  }}
                  onBlur={() => {
                    handleInputConfirm();
                  }}
                  onSelect={(value, option: { key?: string }) => {
                    setInputValue(option.key ? option.key : '');
                    handleInputConfirm(option.key ? option.key : '');
                  }}
                >
                  {emails.map((email: string) => (
                    <Option key={email} value={email}>
                      {email}
                    </Option>
                  ))}
                </AutoComplete>
              )}
              {!inputVisible && (
                <Tag onClick={showInput} className="add-new-attendee">
                  <Icon type="plus" /> Enter Attendee Email
                </Tag>
              )}
            </div>
            <Checkbox
              name="staff"
              value={isStaff}
              onChange={() => {
                setFieldValue('staff', !isStaff);
                toggleStaff(!isStaff);
              }}
            >
              All of these attendees are staff
            </Checkbox>
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
