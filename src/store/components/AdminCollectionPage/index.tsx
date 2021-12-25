import { Formik } from 'formik';
import React from 'react';
import { PublicMerchCollection } from '../../../types';
import StoreButton from '../StoreButton';
import StoreColorInput from '../StoreColorInput';
import StoreHeader from '../StoreHeader';
import StoreTextInput from '../StoreTextInput';
import Config from '../../../config';
import { fetchService, notify } from '../../../utils';

import './style.less';
import { history } from '../../../redux_store';

interface AdminCollectionPageProps {
  collection?: PublicMerchCollection | undefined;
}

interface AdminCollectionPageForm {
  title?: string;
  themeColorHex?: string;
  description?: string;
}
const AdminCollectionPage: React.FC<AdminCollectionPageProps> = (props) => {
  const { collection } = props;
  const creatingCollection = !collection;
  const title = creatingCollection ? 'Create Collection' : 'Edit Collection';

  return (
    <>
      <StoreHeader breadcrumb breadcrumbLocation="/store" />
      <div className="admin-collection-page">
        <h2 className="admin-collection-page-title">{title}</h2>
        <Formik
          enableReinitialize
          initialValues={{
            title: collection?.title ?? '',
            themeColorHex: collection?.themeColorHex ?? '',
            description: collection?.description ?? '',
          }}
          validate={(values) => {
            const errors: AdminCollectionPageForm = {};
            if (!values.title) {
              notify('Form Error', 'Title is required!');
              errors.title = 'Required';
            }
            if (!values.themeColorHex) {
              notify('Form Error', 'Color is required!');
              errors.themeColorHex = 'Required';
            }
            if (!values.description) {
              notify('Form Error', 'Description is required!');
              errors.description = 'Required';
            }

            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            const url = creatingCollection
              ? `${Config.API_URL}${Config.routes.store.collection}`
              : `${Config.API_URL}${Config.routes.store.collection}/${collection?.uuid}`;

            await fetchService(url, creatingCollection ? 'POST' : 'PATCH', 'json', {
              requiresAuthorization: true,
              payload: JSON.stringify({ collection: values }),
            });
            setSubmitting(false);
            history.push('/store');
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit, isSubmitting, setFieldValue }) => (
            <form className="admin-collection-page-form" onSubmit={handleSubmit}>
              <div className="admin-collection-page-form-field">
                <h3 className="admin-collection-page-form-field-label">Title:</h3>
                <StoreTextInput attributeName="title" size="Full" value={values.title} onChange={handleChange} />
                {errors.title && touched.title}
              </div>
              <div className="admin-collection-page-form-field">
                <h3 className="admin-collection-page-form-field-label">Theme Color:</h3>
                <div className="admin-collection-page-form-field-group">
                  <StoreTextInput
                    attributeName="themeColorHex"
                    size="Half"
                    value={values.themeColorHex}
                    placeholder="#"
                    onChange={(e) => {
                      const value: string = e.target.value || '';
                      if (value.length !== 0 && value[0] !== '#') {
                        setFieldValue('themeColorHex', `#${e.target.value}`);
                      } else {
                        setFieldValue('themeColorHex', e.target.value);
                      }
                    }}
                  />
                  <StoreColorInput attributeName="themeColorHex" value={values.themeColorHex} onChange={handleChange} />
                </div>
                {errors.themeColorHex && touched.themeColorHex}
              </div>
              <div className="admin-collection-page-form-field">
                <h3 className="admin-collection-page-form-field-label">Description:</h3>
                <StoreTextInput attributeName="description" size="Field" value={values.description} onChange={handleChange} />
                {errors.description && touched.description}
              </div>

              <div className="admin-collection-page-form-buttons">
                <StoreButton type="secondary" size="medium" text="Cancel" disabled={isSubmitting} link="/store" />
                <StoreButton text="Save" size="medium" disabled={isSubmitting} onClick={() => handleSubmit()} />
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AdminCollectionPage;
