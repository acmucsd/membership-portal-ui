import { Formik } from 'formik';
import React from 'react';
import { PublicMerchCollection } from '../../../types';
import StoreButton from '../StoreButton';
import StoreColorInput from '../StoreColorInput';
import StoreHeader from '../StoreHeader';
import StoreTextInput from '../StoreTextInput';
import Config from '../../../config';
import { fetchService } from '../../../utils';

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
  const title = collection ? 'Edit Collection' : 'Create Collection';

  return (
    <div className="admin-collection-page">
      <StoreHeader breadcrumb breadcrumbLocation="/store" />
      <h2>{title}</h2>

      <Formik
        enableReinitialize
        initialValues={{ title: collection?.title, themeColorHex: collection?.themeColorHex, description: collection?.description }}
        validate={(values) => {
          const errors: AdminCollectionPageForm = {};
          if (!values.title) {
            errors.title = 'Required';
          }
          if (!values.themeColorHex) {
            errors.themeColorHex = 'Required';
          }
          if (!values.description) {
            errors.description = 'Required';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const url = `${Config.API_URL}${Config.routes.store.collection}/${collection?.uuid}`;
          await fetchService(url, 'PATCH', 'json', {
            requiresAuthorization: true,
            payload: JSON.stringify({ collection: values }),
          });
          setSubmitting(false);
          history.push('/store');
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
          <form className="admin-collection-page-form" onSubmit={handleSubmit}>
            <div className="admin-collection-page-form-field">
              <h3 className="admin-collection-page-form-field-label">Title:</h3>
              <StoreTextInput attributeName="title" size="Full" value={values.title} onChange={handleChange} />
              {errors.title && touched.title}
            </div>
            <div className="admin-collection-page-form-field">
              <h3 className="admin-collection-page-form-field-label">Theme Color:</h3>
              <StoreTextInput attributeName="themeColorHex" size="Half" value={values.themeColorHex} onChange={handleChange} />
              <StoreColorInput attributeName="themeColorHex" value={values.themeColorHex} onChange={handleChange} />
              {errors.themeColorHex && touched.themeColorHex}
            </div>
            <div className="admin-collection-page-form-field">
              <h3 className="admin-collection-page-form-field-label">Description:</h3>
              <StoreTextInput attributeName="description" size="Field" value={values.description} onChange={handleChange} />
              {errors.description && touched.description}
            </div>

            <div className="admin-collection-page-form-buttons">
              <StoreButton text="Cancel" disabled={isSubmitting} type="secondary" />
              <StoreButton text="Save" disabled={isSubmitting} onClick={() => handleSubmit()} />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AdminCollectionPage;
