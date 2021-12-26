import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Config from '../../../config';
import { history } from '../../../redux_store';
import { PublicMerchCollection } from '../../../types';
import { fetchService } from '../../../utils';

import StoreButton from '../StoreButton';
import StoreColorInput from '../StoreColorInput';
import StoreHeader from '../StoreHeader';
import StoreTextInput from '../StoreTextInput';

import './style.less';

interface AdminCollectionPageProps {
  collection?: PublicMerchCollection | undefined;
}

interface AdminCollectionPageForm {
  title: string;
  themeColorHex: string;
  description: string;
}

const AdminCollectionPageFormSchema = Yup.object().shape({
  title: Yup.string().min(2, 'Too Short').max(50, 'Too Long').required('Required'),
  themeColorHex: Yup.string()
    .matches(/^#[0-9a-fA-F]{6}$/, 'Must be a Hex Code')
    .required('Required'),
  description: Yup.string().min(2, 'Too Short').max(1000, 'Too Long').required('Required'),
});

const AdminCollectionPage: React.FC<AdminCollectionPageProps> = (props) => {
  const { collection } = props;
  const creatingCollection = !collection;
  const title = creatingCollection ? 'Create Collection' : 'Edit Collection';

  const initialValues: AdminCollectionPageForm = {
    title: collection?.title ?? '',
    themeColorHex: collection?.themeColorHex ?? '',
    description: collection?.description ?? '',
  };

  return (
    <>
      <StoreHeader breadcrumb breadcrumbLocation="/store" />
      <div className="admin-collection-page">
        <h2 className="admin-collection-page-title">{title}</h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={AdminCollectionPageFormSchema}
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
          {({ values, touched, errors, handleChange, handleSubmit, isSubmitting, setFieldValue }) => (
            <form className="admin-collection-page-form" onSubmit={handleSubmit}>
              <div className="admin-collection-page-form-field">
                <h3 className="admin-collection-page-form-field-label">Title:</h3>
                <StoreTextInput
                  attributeName="title"
                  size="Full"
                  value={values.title}
                  onChange={handleChange}
                  error={touched.title && errors.title}
                />
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
                    error={touched.themeColorHex && errors.themeColorHex}
                  />
                  <StoreColorInput attributeName="themeColorHex" value={values.themeColorHex} onChange={handleChange} />
                </div>
              </div>
              <div className="admin-collection-page-form-field">
                <h3 className="admin-collection-page-form-field-label">Description:</h3>
                <StoreTextInput
                  attributeName="description"
                  size="Field"
                  value={values.description}
                  onChange={handleChange}
                  error={touched.description && errors.description}
                />
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
