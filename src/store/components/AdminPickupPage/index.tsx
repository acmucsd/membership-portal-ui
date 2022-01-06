import { DatePicker, TimePicker } from 'antd';
import { Formik } from 'formik';
import { isNaN } from 'lodash';
import React, { useState } from 'react';

import moment from 'moment';
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
              start: moment().format('YYYY-MM-DD'),
              startTime: moment().format('h:mm A'),
              end: moment().format('YYYY-MM-DD'),
              endTime: moment().format('h:mm A'),
              orderLimit: 10,
            }}
            validate={(values) => {
              const errors: AdminPickupPageErrors = {};
              if (!values.title || values.title === '') {
                errors.title = 'Required';
              }
              if (!values.description || values.description === '') {
                errors.description = 'Required';
              }
              // check if order limit is not int
              if (isNaN(values.orderLimit)) {
                errors.orderLimit = 'Not a number';
              }
              // Apparently, Formik ignores TS entirely and says that
              // orderLimit is actually a string instead of a number.
              // Do this jank string conversion to shut TS up and actually
              // pass the validation for the form.
              if (`${values.orderLimit}` === '0') {
                errors.orderLimit = 'Cannot be zero';
              }
              return errors;
            }}
            onSubmit={async (values) => {
              setSubmitting(true);

              const url = `${Config.API_URL}${Config.routes.store.pickup.single}`;

              const payload = {
                title: values.title,
                description: values.description,
                start: moment(`${values.start} ${values.startTime}`, 'YYYY-MM-DD h:mm A').toISOString(),
                end: moment(`${values.end} ${values.endTime}`, 'YYYY-MM-DD h:mm A').toISOString(),
                orderLimit: values.orderLimit,
              };

              try {
                await fetchService(url, 'POST', 'json', {
                  requiresAuthorization: true,
                  payload: JSON.stringify({ pickupEvent: payload }),
                });
                setSubmitting(false);
                notify('Success!', 'Pickup event created.');
                history.push('/store/admin');
              } catch (e) {
                const error = e as any;
                notify('Error creating pickup event!', error.message);
                setSubmitting(false);
                return;
              }

              setSubmitting(false);
              history.push('/store/admin');
            }}
          >
            {({ values, errors, handleChange, handleSubmit, setFieldValue }) => (
              <form className="admin-pickup-page-form">
                <h1 className="admin-pickup-page-title">Create Pickup Event</h1>
                <div className="admin-pickup-page-form-field">
                  <h2 className="admin-pickup-page-form-field-label">Title:</h2>
                  <div className="admin-pickup-page-form-entry">
                    <StoreTextInput attributeName="title" size="Full" value={values.title} onChange={handleChange} />
                    <p className="admin-pickup-page-error">{errors.title}</p>
                  </div>
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
                    onChange={(date, dateString) => setFieldValue('startTime', dateString === '' ? moment() : date)}
                    value={values.startTime !== '' ? moment(values.startTime, 'h:mm A') : moment()}
                  />
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
                    onChange={(date, dateString) => setFieldValue('endTime', dateString === '' ? moment() : date)}
                    value={values.endTime !== '' ? moment(values.endTime, 'h:mm A') : moment()}
                  />
                </div>
                <div className="admin-pickup-page-form-field">
                  <h2 className="admin-pickup-page-form-field-label">Description:</h2>
                  <div className="admin-pickup-page-form-entry">
                    <StoreTextInput size="Field" attributeName="description" value={values.description} onChange={handleChange} />
                    <p className="admin-pickup-page-error">{errors.description}</p>
                  </div>
                </div>
                <div className="admin-pickup-page-form-field">
                  <h2 className="admin-pickup-page-form-field-label">Order Limit:</h2>
                  <div className="admin-pickup-page-form-entry">
                    <StoreTextInput attributeName="orderLimit" size="Quarter" value={values.orderLimit} onChange={handleChange} />
                    <p className="admin-pickup-page-error">{errors.orderLimit}</p>
                  </div>
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
      <StoreHeader breadcrumb breadcrumbLocation="/store/admin" />
      <div className="admin-pickup-page">
        <Formik
          enableReinitialize
          initialValues={{
            title: pickupEvent.title,
            description: pickupEvent.description,
            start: moment(pickupEvent.start).format('YYYY-MM-DD'),
            startTime: moment(pickupEvent.start).format('h:mm A'),
            end: moment(pickupEvent.end).format('YYYY-MM-DD'),
            endTime: moment(pickupEvent.end).format('h:mm A'),
            orderLimit: 10,
          }}
          validate={(values) => {
            const errors: AdminPickupPageErrors = {};
            if (!values.title || values.title === '') {
              errors.title = 'Required';
            }
            if (!values.description || values.description === '') {
              errors.description = 'Required';
            }
            // check if order limit is not int
            if (isNaN(values.orderLimit)) {
              errors.orderLimit = 'Not a number';
            }
            // Apparently, Formik ignores TS entirely and says that
            // orderLimit is actually a string instead of a number.
            // Do this jank string conversion to shut TS up and actually
            // pass the validation for the form.
            if (`${values.orderLimit}` === '0') {
              errors.orderLimit = 'Cannot be zero';
            }
            return errors;
          }}
          onSubmit={async (values) => {
            setSubmitting(true);

            const url = `${Config.API_URL}${Config.routes.store.pickup.single}/${pickupEvent.uuid}`;

            const payload = {
              title: values.title,
              description: values.description,
              start: moment(`${values.start} ${values.startTime}`, 'YYYY-MM-DD h:mm A').toISOString(),
              end: moment(`${values.end} ${values.endTime}`, 'YYYY-MM-DD h:mm A').toISOString(),
              orderLimit: values.orderLimit,
            };

            try {
              await fetchService(url, 'PATCH', 'json', {
                requiresAuthorization: true,
                payload: JSON.stringify({ pickupEvent: payload }),
              });
              setSubmitting(false);
              notify('Success!', 'Pickup event modified.');
            } catch (e) {
              const error = e as any;
              notify('Error modifying pickup event!', error.message);
              setSubmitting(false);
              return;
            }

            setSubmitting(false);
            history.push('/store/admin');
          }}
        >
          {({ values, errors, handleChange, handleSubmit, setFieldValue }) => (
            <form className="admin-pickup-page-form">
              <h1 className="admin-pickup-page-title">Create Pickup Event</h1>
              <div className="admin-pickup-page-form-field">
                <h2 className="admin-pickup-page-form-field-label">Title:</h2>
                <div className="admin-pickup-page-form-entry">
                  <StoreTextInput attributeName="title" size="Full" value={values.title} onChange={handleChange} />
                  <p className="admin-pickup-page-error">{errors.title}</p>
                </div>
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
                  onChange={(date, dateString) => setFieldValue('startTime', dateString === '' ? moment() : date)}
                  value={values.startTime !== '' ? moment(values.startTime, 'h:mm A') : moment()}
                />
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
                  onChange={(date, dateString) => setFieldValue('endTime', dateString === '' ? moment() : date)}
                  value={values.endTime !== '' ? moment(values.endTime, 'h:mm A') : moment()}
                />
              </div>
              <div className="admin-pickup-page-form-field">
                <h2 className="admin-pickup-page-form-field-label">Description:</h2>
                <div className="admin-pickup-page-form-entry">
                  <StoreTextInput size="Field" attributeName="description" value={values.description} onChange={handleChange} />
                  <p className="admin-pickup-page-error">{errors.description}</p>
                </div>
              </div>
              <div className="admin-pickup-page-form-field">
                <h2 className="admin-pickup-page-form-field-label">Order Limit:</h2>
                <div className="admin-pickup-page-form-entry">
                  <StoreTextInput attributeName="orderLimit" size="Quarter" value={values.orderLimit} onChange={handleChange} />
                  <p className="admin-pickup-page-error">{errors.orderLimit}</p>
                </div>
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
};

export default AdminPickupPage;
