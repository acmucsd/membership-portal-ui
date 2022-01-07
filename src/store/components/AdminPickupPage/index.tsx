import React, { useState } from 'react';
import { Formik } from 'formik';
import { DatePicker } from 'antd';
import moment from 'moment';
import * as Yup from 'yup';

import Config from '../../../config';
import { history } from '../../../redux_store';
import { PublicOrderPickupEvent } from '../../../types';
import { fetchService, notify } from '../../../utils';

import StoreButton from '../StoreButton';
import StoreDropdown from '../StoreDropdown';
import StoreHeader from '../StoreHeader';
import StoreTextInput from '../StoreTextInput';

import './style.less';

interface AdminPickupPageProps {
  pickupEvent?: PublicOrderPickupEvent | undefined;
  pickupEvents: PublicOrderPickupEvent[];
}

interface AdminPickupPageForm {
  title: string;
  description: string;
  start?: moment.Moment;
  end?: moment.Moment;
  orderLimit: string;
}

const AdminPickupPageFormSchema = Yup.object().shape({
  title: Yup.string().min(2, 'Too Short').max(50, 'Too Long').required('Required'),
  description: Yup.string().min(2, 'Too Short').max(1000, 'Too Long').required('Required'),
  start: Yup.string().required('Required'),
  end: Yup.string().required('Required'),
  orderLimit: Yup.number().min(1, 'Too Low').max(1000000, 'Too High').required('Required'),
});

const AdminPickupPage: React.FC<AdminPickupPageProps> = (props) => {
  const { pickupEvent, pickupEvents = [] } = props;

  const creatingPickup = !pickupEvent;

  const [uuid, setUuid] = useState<string>();
  const [createMode, setCreateMode] = useState<boolean>();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const initialValues: AdminPickupPageForm = {
    title: pickupEvent?.title ?? '',
    description: pickupEvent?.description ?? '',
    start: pickupEvent ? moment(pickupEvent?.start) : undefined,
    end: pickupEvent ? moment(pickupEvent?.end) : undefined,
    orderLimit: pickupEvent?.orderLimit?.toString() ?? '',
  };

  if (createMode || pickupEvent) {
    return (
      <>
        <StoreHeader breadcrumb breadcrumbLocation="/store/admin" />
        <div className="admin-pickup-page">
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={AdminPickupPageFormSchema}
            onSubmit={async (values) => {
              setSubmitting(true);

              const url = creatingPickup
                ? `${Config.API_URL}${Config.routes.store.pickup.single}`
                : `${Config.API_URL}${Config.routes.store.pickup.single}/${pickupEvent?.uuid}`;

              const payload = {
                title: values.title,
                description: values.description,
                start: moment(values.start).toISOString(),
                end: moment(values.end).toISOString(),
                orderLimit: parseInt(values.orderLimit, 10),
              };

              try {
                await fetchService(url, creatingPickup ? 'POST' : 'PATCH', 'json', {
                  requiresAuthorization: true,
                  payload: JSON.stringify({ pickupEvent: payload }),
                });
                setSubmitting(false);
                notify('Success!', creatingPickup ? 'Pickup event created.' : 'Pickup event modified.');
                history.push('/store/admin');
              } catch (error) {
                notify(creatingPickup ? 'Error creating pickup event!' : 'Error modifying pickup event!', error.message);
                setSubmitting(false);
              }
            }}
          >
            {({ touched, values, errors, handleChange, handleSubmit, setFieldValue }) => (
              <form className="admin-pickup-page-form">
                <h1 className="admin-pickup-page-title">{creatingPickup ? 'Create' : 'Edit'} Pickup Event</h1>
                <div className="admin-pickup-page-form-field">
                  <h2 className="admin-pickup-page-form-field-label">Title:</h2>
                  <div className="admin-pickup-page-form-entry">
                    <StoreTextInput
                      attributeName="title"
                      size="Full"
                      value={values.title}
                      onChange={handleChange}
                      error={touched.title && errors.title}
                    />
                  </div>
                </div>
                <div className="admin-pickup-page-form-field">
                  <h2 className="admin-pickup-page-form-field-label">Start:</h2>
                  <div className="admin-pickup-page-form-entry">
                    <DatePicker
                      className="admin-pickup-page-form-field-date-input"
                      placeholder="Date and Time"
                      format="YYYY-MM-DD h:mm A"
                      value={values.start}
                      allowClear={false}
                      showTime={{ use12Hours: true, format: 'h:mm a', minuteStep: 15 }}
                      onChange={(date) => setFieldValue('start', date)}
                    />
                    {touched.start && <p className="admin-pickup-page-error">{errors.start}</p>}
                  </div>
                </div>
                <div className="admin-pickup-page-form-field">
                  <h2 className="admin-pickup-page-form-field-label">End:</h2>
                  <div className="admin-pickup-page-form-entry">
                    <DatePicker
                      className="admin-pickup-page-form-field-date-input"
                      placeholder="Date and Time"
                      format="YYYY-MM-DD h:mm A"
                      value={values.end}
                      allowClear={false}
                      showTime={{ use12Hours: true, format: 'h:mm a', minuteStep: 15 }}
                      onChange={(date) => setFieldValue('end', date)}
                    />
                    {touched.end && <p className="admin-pickup-page-error">{errors.end}</p>}
                  </div>
                </div>
                <div className="admin-pickup-page-form-field">
                  <h2 className="admin-pickup-page-form-field-label">Description:</h2>
                  <div className="admin-pickup-page-form-entry">
                    <StoreTextInput
                      size="Field"
                      attributeName="description"
                      value={values.description}
                      onChange={handleChange}
                      error={touched.description && errors.description}
                    />
                  </div>
                </div>
                <div className="admin-pickup-page-form-field">
                  <h2 className="admin-pickup-page-form-field-label">Order Limit:</h2>
                  <div className="admin-pickup-page-form-entry">
                    <StoreTextInput
                      attributeName="orderLimit"
                      size="Quarter"
                      value={values.orderLimit}
                      onChange={handleChange}
                      error={touched.orderLimit && errors.orderLimit}
                    />
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

  return (
    <>
      <StoreHeader breadcrumb breadcrumbLocation="/store/admin" />
      <div className="admin-pickup-page">
        <p className="admin-pickup-page-title">Manage Pickup Events</p>
        <p className="admin-pickup-page-hint">Select a pickup event to edit:</p>
        <StoreDropdown
          options={pickupEvents.map((event) => ({
            label: `${event.title} from ${moment(event.start).format('MMM D[,] LT')} to ${moment(event.end).format('MMM D[,] LT')}`,
            value: event.uuid,
          }))}
          onChange={(option) => {
            setUuid(option.value);
          }}
        />
        <StoreButton type="primary" size="medium" text="Continue" link={`/store/admin/pickup/${uuid}`} disabled={!uuid} />
        <div className="admin-pickup-page-divider" />
        <StoreButton
          type="primary"
          size="medium"
          text="Create New Event"
          onClick={() => {
            setCreateMode(true);
          }}
        />
      </div>
    </>
  );
};

export default AdminPickupPage;
