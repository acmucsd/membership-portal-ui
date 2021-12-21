import { Formik } from 'formik';
import React from 'react';
import { PublicMerchItem } from '../../../types';
import { fetchService } from '../../../utils';
import StoreButton from '../StoreButton';
import StoreHeader from '../StoreHeader';
import StoreTextInput from '../StoreTextInput';
import Config from '../../../config';

import { history } from '../../../redux_store';
import './style.less';
import StoreDropdown from '../StoreDropdown';
import StoreCheckbox from '../StoreCheckbox';

interface AdminItemPageProps {
  item?: PublicMerchItem;
}

interface AdminItemPageForm {
  collection?: string;
  itemName?: string;
  description?: string;
  hidden?: boolean;
  picture?: string;
  monthlyLimit?: number;
  lifetimeLimit?: number;
  hasVariants?: boolean;
}

const AdminItemPage: React.FC<AdminItemPageProps> = (props) => {
  const { item } = props;

  const creatingItem = !item;

  return (
    <>
      <StoreHeader breadcrumb breadcrumbLocation="/store" />
      <div className="admin-item-page">
        <h2>{creatingItem ? 'Create Item' : 'Edit Item'}</h2>
        <Formik
          enableReinitialize
          initialValues={{
            collection: '',
            itemName: item?.itemName,
            description: item?.description,
            hidden: false,
            picture: item?.picture,
            monthlyLimit: item?.monthlyLimit ?? 3,
            lifetimeLimit: item?.lifetimeLimit ?? 3,
            hasVariants: item?.hasVariantsEnabled,
          }}
          validate={(values) => {
            const errors: AdminItemPageForm = {};
            if (values.itemName) {
              errors.itemName = 'Required';
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            const url = creatingItem
              ? `${Config.API_URL}${Config.routes.store.collection}`
              : `${Config.API_URL}${Config.routes.store.collection}/${item?.uuid}`;

            await fetchService(url, creatingItem ? 'POST' : 'PATCH', 'json', {
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
                <h3 className="admin-collection-page-form-field-label">Collection:</h3>
                <StoreDropdown options={[values.collection]} onChange={handleChange} value={values.collection} />
                {errors.collection && touched.collection}
              </div>

              <div className="admin-collection-page-form-field">
                <h3 className="admin-collection-page-form-field-label">Item Name:</h3>
                <StoreTextInput size="Full" attributeName="itemName" value={values.itemName} onChange={handleChange} />
                {errors.itemName && touched.itemName}
              </div>

              <div className="admin-collection-page-form-field">
                <h3 className="admin-collection-page-form-field-label">Description:</h3>
                <StoreTextInput size="Field" attributeName="description" value={values.description} onChange={handleChange} />
                {errors.description && touched.description}
              </div>

              <div className="admin-collection-page-form-field">
                <h3 className="admin-collection-page-form-field-label">Photo:</h3>
                <StoreButton type="secondary" size="medium" text="Upload Image" />
                {errors.picture && touched.picture}
              </div>

              <div className="admin-collection-page-form-field">
                <h3 className="admin-collection-page-form-field-label">Hidden:</h3>
                <StoreCheckbox attributeName="hidden" checked={values.hidden} onChange={handleChange} />
                {errors.hidden && touched.hidden}
              </div>

              <div className="admin-collection-page-form-field">
                <h3 className="admin-collection-page-form-field-label">Monthly Limit:</h3>
                <StoreDropdown options={[1, 2, 3, 4].map((e) => `${e}`)} onChange={handleChange} value={`${values.monthlyLimit}`} />
                {errors.monthlyLimit && touched.monthlyLimit}
              </div>

              <div className="admin-collection-page-form-field">
                <h3 className="admin-collection-page-form-field-label">Lifetime Limit:</h3>
                <StoreDropdown options={[1, 2, 3, 4].map((e) => `${e}`)} onChange={handleChange} value={`${values.lifetimeLimit}`} />
                {errors.lifetimeLimit && touched.lifetimeLimit}
              </div>

              <div className="admin-collection-page-form-field">
                <h3 className="admin-collection-page-form-field-label">Has Variants:</h3>
                <StoreCheckbox attributeName="hasVariants" checked={values.hasVariants} onChange={handleChange} />
                {errors.hasVariants && touched.hasVariants}
              </div>

              <div className="admin-collection-page-form-buttons">
                <StoreButton text="Cancel" disabled={isSubmitting} type="secondary" />
                <StoreButton text="Save" disabled={isSubmitting} onClick={() => handleSubmit()} />
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AdminItemPage;
