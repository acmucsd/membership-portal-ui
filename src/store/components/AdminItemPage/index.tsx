import { Formik } from 'formik';
import React from 'react';

import { PublicMerchCollection, PublicMerchItem, Uuid } from '../../../types';
import { fetchService } from '../../../utils';
import Config from '../../../config';
import { history } from '../../../redux_store';

import OptionDisplay from '../OptionDisplay';
import StoreButton from '../StoreButton';
import StoreCheckbox from '../StoreCheckbox';
import StoreDropdown from '../StoreDropdown';
import StoreHeader from '../StoreHeader';
import StoreTextInput from '../StoreTextInput';

import './style.less';

interface AdminItemPageProps {
  item?: PublicMerchItem;
  collections: PublicMerchCollection[];
}

interface AdminItemPageForm {
  collection?: string;
  itemName?: string;
  description?: string;
  hidden?: boolean;
  picture?: string;
  monthlyLimit?: number;
  lifetimeLimit?: number;
  hasVariantsEnabled?: boolean;

  categoryName?: string;
  options?: {
    uuid?: Uuid;
    value: string;
    price: string;
    quantity: string;
    discountPercentage: string;
  }[];

  quantity?: string;
  price?: string;
  discountPercentage?: string;
}

const AdminItemPage: React.FC<AdminItemPageProps> = (props) => {
  const { item, collections } = props;

  const creatingItem = !item;

  return (
    <>
      <StoreHeader breadcrumb breadcrumbLocation="/store" />
      <div className="admin-item-page">
        <h2 className="admin-item-page-title">{creatingItem ? 'Create Item' : 'Edit Item'}</h2>
        <Formik
          enableReinitialize
          initialValues={{
            collection: item?.collection.uuid,
            itemName: item?.itemName,
            description: item?.description,
            hidden: false, // TODO
            picture: item?.picture,
            monthlyLimit: item?.monthlyLimit.toString() ?? '',
            lifetimeLimit: item?.lifetimeLimit.toString() ?? '',
            hasVariantsEnabled: item?.hasVariantsEnabled,
            // Variants Enabled
            categoryName: item?.hasVariantsEnabled ? item?.options[0].metadata?.type : '',
            options: item?.hasVariantsEnabled
              ? item?.options.map((option) => ({
                  uuid: option.uuid,
                  value: option.metadata?.value ?? '',
                  price: option.price.toString(),
                  quantity: option.quantity.toString(),
                  discountPercentage: option.discountPercentage.toString(),
                }))
              : [],
            // Variants Disabled
            quantity: !item?.hasVariantsEnabled ? item?.options[0].quantity?.toString() : '',
            price: !item?.hasVariantsEnabled ? item?.options[0].price.toString() : '',
            discountPercentage: !item?.hasVariantsEnabled ? item?.options[0].discountPercentage.toString() : '',
          }}
          validate={(values) => {
            const errors: AdminItemPageForm = {};
            if (!values.itemName) {
              errors.itemName = 'Required';
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            const url = creatingItem ? `${Config.API_URL}${Config.routes.store.item}` : `${Config.API_URL}${Config.routes.store.item}/${item?.uuid}`;

            const payload = values.hasVariantsEnabled
              ? {
                  itemName: values.itemName,
                  description: values.description,
                  collection: values.collection,
                  monthlyLimit: parseInt(values.monthlyLimit, 10),
                  lifetimeLimit: parseInt(values.lifetimeLimit, 10),
                  hidden: values.hidden,
                  hasVariantsEnabled: values.hasVariantsEnabled,
                  options: values.options
                    ? values.options.map((option, index) => ({
                        uuid: option.uuid,
                        quantity: parseInt(option.quantity, 10),
                        price: parseInt(option.price, 10),
                        discountPercentage: parseInt(option.discountPercentage, 10),
                        metadata: {
                          type: values.categoryName,
                          value: option.value,
                          position: index,
                        },
                      }))
                    : [],
                }
              : {
                  itemName: values.itemName,
                  description: values.description,
                  collection: values.collection,
                  monthlyLimit: parseInt(values.monthlyLimit, 10),
                  lifetimeLimit: parseInt(values.lifetimeLimit, 10),
                  hidden: values.hidden,
                  hasVariantsEnabled: values.hasVariantsEnabled,
                  options: [
                    {
                      quantity: parseInt(values.quantity ?? '0', 10),
                      price: parseInt(values.price ?? '0', 10),
                      discountPercentage: parseInt(values.discountPercentage ?? '0', 10),
                    },
                  ],
                };

            await fetchService(url, creatingItem ? 'POST' : 'PATCH', 'json', {
              requiresAuthorization: true,
              payload: JSON.stringify({ merchandise: payload }),
            });
            setSubmitting(false);
            history.push('/store');
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit, isSubmitting, setFieldValue }) => (
            <form className="admin-item-page-form" onSubmit={handleSubmit}>
              <div className="admin-item-page-form-field">
                <h3 className="admin-item-page-form-field-label">Collection:</h3>
                <StoreDropdown
                  options={collections.map((collection) => ({ label: collection.title, value: collection.uuid }))}
                  onChange={(option) => {
                    setFieldValue('collection', option.value);
                  }}
                  value={values.collection}
                />
                {errors.collection && touched.collection}
              </div>
              <div className="admin-item-page-form-field">
                <h3 className="admin-item-page-form-field-label">Item Name:</h3>
                <StoreTextInput size="Full" attributeName="itemName" value={values.itemName} onChange={handleChange} />
                {errors.itemName && touched.itemName}
              </div>
              <div className="admin-item-page-form-field">
                <h3 className="admin-item-page-form-field-label">Description:</h3>
                <StoreTextInput size="Field" attributeName="description" value={values.description} onChange={handleChange} />
                {errors.description && touched.description}
              </div>
              <div className="admin-item-page-form-field">
                <h3 className="admin-item-page-form-field-label">Photo:</h3>
                <StoreButton type="secondary" size="medium" text="Upload Image" />
                {errors.picture && touched.picture}
              </div>
              <div className="admin-item-page-form-field">
                <h3 className="admin-item-page-form-field-label">Hidden:</h3>
                <StoreCheckbox attributeName="hidden" checked={values.hidden} onChange={handleChange} />
                {errors.hidden && touched.hidden}
              </div>
              <div className="admin-item-page-form-field">
                <h3 className="admin-item-page-form-field-label">Monthly Limit:</h3>
                <StoreTextInput size="Quarter" attributeName="monthlyLimit" value={values.monthlyLimit} onChange={handleChange} />
                {errors.monthlyLimit && touched.monthlyLimit}
              </div>
              <div className="admin-item-page-form-field">
                <h3 className="admin-item-page-form-field-label">Lifetime Limit:</h3>
                <StoreTextInput size="Quarter" attributeName="lifetimeLimit" value={values.lifetimeLimit} onChange={handleChange} />
                {errors.lifetimeLimit && touched.lifetimeLimit}
              </div>
              <div className="admin-item-page-form-field">
                <h3 className="admin-item-page-form-field-label">Has Variants:</h3>
                <StoreCheckbox attributeName="hasVariantsEnabled" checked={values.hasVariantsEnabled} onChange={handleChange} />
                {errors.hasVariantsEnabled && touched.hasVariantsEnabled}
              </div>
              {values.hasVariantsEnabled ? (
                <>
                  <div className="admin-item-page-form-field">
                    <h3 className="admin-item-page-form-field-label">Category Name:</h3>
                    <StoreTextInput size="Full" attributeName="categoryName" value={values.categoryName} onChange={handleChange} />
                    {errors.categoryName && touched.categoryName}
                  </div>
                  <div className="admin-item-page-form-field">
                    <h3 className="admin-item-page-form-field-label">Options:</h3>
                    <OptionDisplay
                      options={values.options}
                      creatingItem={creatingItem}
                      onChange={(options) => {
                        setFieldValue('options', options);
                      }}
                    />
                    {errors.options && touched.options}
                  </div>
                </>
              ) : (
                <>
                  <div className="admin-item-page-form-field">
                    <h3 className="admin-item-page-form-field-label">Quantity:</h3>
                    <StoreTextInput size="Quarter" attributeName="quantity" value={values.quantity} onChange={handleChange} />
                    {errors.quantity && touched.quantity}
                  </div>
                  <div className="admin-item-page-form-field">
                    <h3 className="admin-item-page-form-field-label">Price:</h3>
                    <StoreTextInput size="Quarter" attributeName="price" value={values.price} onChange={handleChange} />
                    {errors.price && touched.price}
                  </div>
                  <div className="admin-item-page-form-field">
                    <h3 className="admin-item-page-form-field-label">Discount Percentage:</h3>
                    <StoreTextInput size="Quarter" attributeName="discountPercentage" value={values.discountPercentage} onChange={handleChange} />
                    {errors.discountPercentage && touched.discountPercentage}
                  </div>
                </>
              )}
              <div className="admin-item-page-form-buttons">
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

export default AdminItemPage;
