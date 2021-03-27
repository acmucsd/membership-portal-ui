import React, { useState, ChangeEventHandler, FocusEventHandler, FormEventHandler, ChangeEvent } from 'react';
import { Form, Input, Button, Tooltip, Tag, Icon } from 'antd';

import './style.less';

interface AddAttendanceFormProps {
  handleBlur: FocusEventHandler;
  handleChange: ChangeEventHandler;
  handleSubmit: FormEventHandler;
  isSubmitting: boolean;
  isValidating: boolean;
  setFieldValue: Function;
  values: {
    uuid: string;
    event: string;
  };
}

/* Future Note: Add a fun generate attendance code function :) based on title */
const AddAttendanceForm: React.FC<AddAttendanceFormProps> = (props) => {
  const { handleBlur, handleChange, handleSubmit, isSubmitting, isValidating, setFieldValue, values } = props;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [attendees, _setAttendees] = useState([] as any[]);
  /* const [emails, loadEmails] = useState([] as any[]); */
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

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

  const handleAttendeeInputChange = (e: ChangeEvent) => {
    setInputValue((e.target as any).value);
  };

  const handleInputConfirm = () => {
    let newAttendees = attendees;
    // cross check with email list

    if (inputValue && attendees.indexOf(inputValue) === -1) {
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
          <Form.Item className="event-wrapper" label="Events">
            <Input name="event" className="events" value={values.event} onChange={handleChange} onBlur={handleBlur} />
          </Form.Item>
          <Form.Item label="Attendees" className="attendees-list-wrapper">
            <div>
              {attendees.map((attendee) => {
                const isLongName = attendee.length > 20;
                const tagElem = (
                  <Tag key={attendee} onClose={() => handleClose(attendees)} className="attendee-tag">
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
                <Input
                  type="text"
                  size="small"
                  className="attendee-input"
                  value={inputValue}
                  onChange={handleAttendeeInputChange}
                  onBlur={(e) => {
                    handleInputConfirm();
                    handleBlur(e);
                  }}
                  onPressEnter={handleInputConfirm}
                />
              )}
              {!inputVisible && (
                <Tag onClick={showInput} className="add-new-attendee">
                  <Icon type="plus" /> Enter Attendee Email
                </Tag>
              )}
            </div>
          </Form.Item>
          <Button type="primary" htmlType="submit" className="save-button" loading={isSubmitting && isValidating}>
            Submit Edits
          </Button>
          <Button type="danger" className="discard-button">
            Discard
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddAttendanceForm;
