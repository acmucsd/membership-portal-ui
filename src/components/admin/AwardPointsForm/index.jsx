import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Select, Tag, Tooltip, Icon } from 'antd';
import { useParams } from 'react-router-dom';

import './style.less';

const { Option } = Select;
const { TextArea } = Input;

const AwardPointsForm = props => {
  const [awardees, _setAwardees] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [submissionLoading, setSubmissionLoading] = useState(false);

  const showInput = () => {
    setInputVisible(true);
  };
  const handleClose = removedAwardee => {
    const newAwardees = awardees.filter(awardee => awardee !== removedAwardee);
    updateAwardees(newAwardees);
  };
  const handleAwardeeInputChange = e => {
    setInputValue(e.target.value);
  };

  const updateAwardees = awardees => {
    _setAwardees(awardees);
    props.setFieldValue('awardees', awardees);
  };

  const handleInputConfirm = () => {
    let newAwardees = awardees;
    if (inputValue && awardees.indexOf(inputValue) === -1) {
      newAwardees = [...newAwardees, inputValue];
    }
    updateAwardees(newAwardees);
    setInputVisible(false);
    setInputValue('');
  };

  return (
    <div className="award-points-form">
      <div className="award-points-form-wrapper">
        <h1 className="subtitle">Award Points</h1>
        <form onSubmit={props.handleSubmit}>
          <Input type="hidden" value={props.values.uuid} name="uuid" />
          <Input type="hidden" value={awardees} name="awardees" />
          <Form.Item className="points-wrapper" label="Points">
            <Input
              name="points"
              className="points"
              value={props.values.points}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
          </Form.Item>
          <Form.Item label="Awardees" className="awardees-list-wrapper">
            <div>
              {awardees.map((awardee, index) => {
                const isLongName = awardee.length > 20;
                const tagElem = (
                  <Tag key={awardee} onClose={() => handleClose(awardees)} className="awardee-tag">
                    {isLongName ? `${awardee.slice(0, 10)}...` : awardee}
                  </Tag>
                );
                return isLongName ? (
                  <Tooltip title={awardee} key={awardee}>
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
                  className="awardee-input"
                  value={inputValue}
                  onChange={handleAwardeeInputChange}
                  onBlur={e => {
                    handleInputConfirm(e);
                    props.handleBlur(e);
                  }}
                  onPressEnter={handleInputConfirm}
                />
              )}
              {!inputVisible && (
                <Tag onClick={showInput} className="add-new-awardee">
                  <Icon type="plus" /> New Awardee
                </Tag>
              )}
            </div>
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
          <Button 
            type="primary" 
            htmlType="submit" 
            className="save-button" 
            loading={props.isSubmitting && props.isValidating}
          >
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

AwardPointsForm.propTypes = {
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  values: PropTypes.object.isRequired,
};

export default AwardPointsForm;

/* Use this instaed of Tags once we have a api route to search for users. Remember to also debounce the fetch
const [awardees, setAwardees] = useState([]);

const [searchedUsers, setSearchedUsers] = useState([]);

<Select
  mode="multiple"
  labelInValue
  value={awardees}
  placeholder="Select users"
  notFoundContent={fetching ? <Spin size="small" /> : null}
  filterOption={false}
  onChange={props.handleChange}
  style={{ width: '100%' }}
>
  {searchedUsers.map(d => (
    <Option key={d.value}>{d.text}</Option>
  ))}
</Select>

*/
