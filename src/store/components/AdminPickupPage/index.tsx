import { DatePicker, TimePicker } from 'antd';
import { Formik } from 'formik';
import { isNaN } from 'lodash';
import React, { useState } from 'react';

import moment, { Moment } from 'moment';
import { PublicOrderPickupEvent } from '../../../types';
import Config from '../../../config';
import { history } from '../../../redux_store';

import StoreButton from '../StoreButton';
import StoreDropdown from '../StoreDropdown';
import StoreHeader from '../StoreHeader';
import StoreTextInput from '../StoreTextInput';

import './style.less';
import { fetchService, notify } from '../../../utils';

interface AdminPickupPageProps {
  pickupEvent?: PublicOrderPickupEvent | undefined;
  pickupEvents: PublicOrderPickupEvent[];
}

interface AdminPickupPageErrors {
  title?: string;
  description?: string;
  start?: string;
  startTime?: string;
  end?: string;
  endTime?: string;
  orderLimit?: string;
}

const AdminPickupPage: React.FC<AdminPickupPageProps> = (props) => {
  const { pickupEvent, pickupEvents = [] } = props;

  const [uuid, setUuid] = useState<string>();
  const [createMode, setCreateMode] = useState<boolean>();
  const [submitting, setSubmitting] = useState<boolean>(false);

  if (createMode) {
    // TODO Finish Formik form and submit one event.
    // IDEALLY should be enough until `/GET pickup` route is merged.
    // Probably already is.
    return (
      <>
        <StoreHeader breadcrumb breadcrumbLocation="/store/admin" />
        <div className="admin-pickup-page">
          <Formik
            enableReinitialize
            initialValues={{
              title: '',
              description: '',
              start: '',
              startTime: '',
              end: '',
              endTime: '',
              orderLimit: 10,
            }}
            validate={(values) => {
              const errors: AdminPickupPageErrors = {};
              if (!values.title) {
                errors.title = 'Required';
              }
              if (!values.description) {
                errors.description = 'Required';
              }
              if (!values.start) {
                errors.start = 'Required';
              }
              if (!values.startTime) {
                errors.startTime = 'Required';
              }
              if (!values.end) {
                errors.end = 'Required';
              }
              if (!values.endTime) {
                errors.endTime = 'Required';
              }
              if (!values.orderLimit) {
                errors.orderLimit = 'Required';
              }
              // check if order limit is not int
              if (isNaN(values.orderLimit)) {
                errors.orderLimit = 'Not a number';
              }
              return errors;
            }}
            onSubmit={async (values) => {
              setSubmitting(true);
              const url = `${Config.API_URL}${Config.routes.store.pickup.single}`;

              const payload = {
                title: values.title,
                description: values.description,
                start: values.start,
                end: values.end,
                orderLimit: values.orderLimit,
              };

              const data = await fetchService(url, 'POST', 'json', {
                requiresAuthorization: true,
                payload: JSON.stringify({ pickupEvent: payload }),
              });

              setSubmitting(false);
              history.push('/store/admin');
            }}
          >
            {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
              <form className="admin-pickup-page-form">
                <h1 className="admin-pickup-page-title">Create Pickup Event</h1>
                <div className="admin-pickup-page-form-field">
                  <h2 className="admin-pickup-page-form-field-label">Title:</h2>
                  <StoreTextInput attributeName="title" size="Full" value={values.title} onChange={handleChange} />
                  {errors.title && touched.title}
                </div>
                <div className="admin-pickup-page-form-field">
                  <h2 className="admin-pickup-page-form-field-label">Start:</h2>
                  <DatePicker
                    className="admin-pickup-page-form-field-date-input"
                    placeholder="Date"
                    onChange={(_, dateString) => setFieldValue('start', dateString)}
                    value={values.start !== '' ? moment(values.start) : moment()}
                  />
                  <TimePicker
                    className="admin-pickup-page-form-field-time-input"
                    placeholder="Time"
                    use12Hours
                    format="h:mm a"
                    minuteStep={15}
                    onChange={(date) => setFieldValue('startTime', date)}
                    value={values.startTime !== '' ? moment(values.startTime) : moment()}
                  />
                  {errors.start && touched.start}
                </div>
                <div className="admin-pickup-page-form-field">
                  <h2 className="admin-pickup-page-form-field-label">End:</h2>
                  <DatePicker
                    className="admin-pickup-page-form-field-date-input"
                    placeholder="Date"
                    onChange={(_, dateString) => setFieldValue('end', dateString)}
                    value={values.end !== '' ? moment(values.end) : moment()}
                  />
                  <TimePicker
                    className="admin-pickup-page-form-field-time-input"
                    placeholder="Time"
                    use12Hours
                    format="h:mm a"
                    minuteStep={15}
                    onChange={(date) => setFieldValue('endTime', date)}
                    value={values.endTime !== '' ? moment(values.endTime) : moment()}
                  />
                  {errors.end && touched.end}
                </div>
                <div className="admin-pickup-page-form-field">
                  <h2 className="admin-pickup-page-form-field-label">Description:</h2>
                  <StoreTextInput size="Field" attributeName="description" value={values.description} onChange={handleChange} />
                  {errors.description && touched.description}
                </div>
                <div className="admin-pickup-page-form-field">
                  <h2 className="admin-pickup-page-form-field-label">Order Limit:</h2>
                  <StoreTextInput attributeName="orderLimit" size="Quarter" value={values.orderLimit} onChange={handleChange} />
                  {errors.orderLimit && touched.orderLimit}
                </div>
                <div className="admin-pickup-page-buttons">
                  <StoreButton type="secondary" size="medium" text="Cancel" disabled={submitting} onClick={() => setCreateMode(false)} />
                  <StoreButton text="Save" size="medium" disabled={submitting} onClick={() => handleSubmit()} />
                </div>
              </form>
            )}
          </Formik>
        </div>
      </>
    );
  }

  if (!pickupEvent) {
    return (
      <>
        <StoreHeader breadcrumb breadcrumbLocation="/store/admin" />
        <div className="admin-pickup-page">
          <p className="admin-pickup-page-title">Manage Pickup Events</p>
          <p className="admin-pickup-page-hint">Select a pickup event to edit:</p>
          <StoreDropdown
            options={pickupEvents.map((event) => ({ label: event.title, value: event.uuid }))}
            onChange={(option) => {
              setUuid(option.value);
            }}
          />
          <StoreButton type="primary" size="large" text="Continue" link={`/store/admin/pickup/${uuid}`} disabled={!uuid} />
          <div className="admin-pickup-page-divider" />
          <StoreButton
            type="primary"
            size="large"
            text="Create New Event"
            onClick={() => {
              setCreateMode(true);
            }}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <StoreHeader breadcrumb breadcrumbLocation="/store/admin/pickup" />
      <div className="admin-pickup-page">Admin Pickup Page, pickupEvent={JSON.stringify(pickupEvent)}</div>
    </>
  );
};

export default AdminPickupPage;
