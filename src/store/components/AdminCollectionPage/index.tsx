import { Formik } from 'formik';
import React from 'react';
import { PublicMerchCollection } from '../../../types';
import StoreButton from '../StoreButton';
import StoreColorInput from '../StoreColorInput';
import StoreHeader from '../StoreHeader';
import StoreTextInput from '../StoreTextInput';

import './style.less';

interface AdminCollectionPageProps {
  collection?: PublicMerchCollection | undefined;
}

interface AdminCollectionPageForm {
  title?: string;
  themeColor?: string;
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
        initialValues={{ title: collection?.title, themeColor: collection?.themeColorHex, description: collection?.description }}
        validate={(values) => {
          const errors: AdminCollectionPageForm = {};
          if (!values.title) {
            errors.title = 'Required';
          }
          if (!values.themeColor) {
            errors.themeColor = 'Required';
          }
          if (!values.description) {
            errors.description = 'Required';
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          alert('it worked');
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form className="admin-collection-page-form" onSubmit={handleSubmit}>
            <div className="admin-collection-page-form-field">
              <h3 className="admin-collection-page-form-field-label">Title:</h3>
              <StoreTextInput size="Full" value={values.title} onChange={handleChange} />
            </div>
            <div className="admin-collection-page-form-field">
              <h3 className="admin-collection-page-form-field-label">Theme Color:</h3>
              <StoreColorInput value={values.themeColor} onChange={handleChange} />
            </div>
            <div className="admin-collection-page-form-field">
              <h3 className="admin-collection-page-form-field-label">Description:</h3>
              <StoreTextInput size="Field" value={values.description} onChange={handleChange} />
            </div>
            {/* <input type="email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} /> */}
            {/* {errors.email && touched.email && errors.email} */}
            {/* <input type="password" name="password" onChange={handleChange} onBlur={handleBlur} value={values.password} />
            {errors.password && touched.password && errors.password} */}
            <div className="admin-collection-page-form-buttons">
              <StoreButton text="Cancel" disabled={isSubmitting} type="secondary" />
              <StoreButton text="Save" disabled={isSubmitting} onClick={() => handleSubmit()} />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
      <div>Admin Collection Page, collection={JSON.stringify(collection)}</div>
    </div>
  );
};

export default AdminCollectionPage;
