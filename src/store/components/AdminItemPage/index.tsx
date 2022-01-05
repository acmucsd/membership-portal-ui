import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Config from '../../../config';
import { history } from '../../../redux_store';
import { PublicMerchCollection, PublicMerchItem } from '../../../types';
import { fetchService } from '../../../utils';

import OptionDisplay from '../OptionDisplay';
import StoreButton from '../StoreButton';
import StoreCheckbox from '../StoreCheckbox';
import StoreDropdown from '../StoreDropdown';
import StoreHeader from '../StoreHeader';
import StoreImageUpload from '../StoreImageUpload';
import StoreTextInput from '../StoreTextInput';

import './style.less';

interface AdminItemPageProps {
  item?: PublicMerchItem;
  collections: PublicMerchCollection[];
}

interface AdminItemPageForm {
  collection: string;
  itemName: string;
  description: string;
  existingPicture?: string;
  newPicture?: Blob;
  hidden: boolean;
  monthlyLimit: string;
  lifetimeLimit: string;
  hasVariantsEnabled: boolean;

  categoryName: string;
  options: {
    uuid: string | undefined;
    value: string;
    price: string;
    quantity: string;
    discountPercentage: string;
  }[];

  quantity: string;
  price: string;
  discountPercentage: string;
}

const AdminItemPageFormSchema = Yup.object().shape({
  collection: Yup.string().required('Required'),
  itemName: Yup.string().min(2, 'Too Short').max(50, 'Too Long').required('Required'),
  description: Yup.string().min(2, 'Too Short').max(1000, 'Too Long').required('Required'),
  newPicture: Yup.mixed().when('existingPicture', {
    is: (existingPicture) => !existingPicture,
    then: Yup.mixed().required('Required'),
  }),
  monthlyLimit: Yup.number().min(1, 'Too Low').max(10, 'Too High').required('Required'),
  lifetimeLimit: Yup.number().min(1, 'Too Low').max(10, 'Too High').required('Required'),
  categoryName: Yup.string().when('hasVariantsEnabled', {
    is: (hasVariantsEnabled) => hasVariantsEnabled,
    then: Yup.string().min(2, 'Too Short').max(50, 'Too Long').required('Required'),
  }),
  options: Yup.array().when('hasVariantsEnabled', {
    is: (hasVariantsEnabled) => hasVariantsEnabled,
    then: Yup.array().of(
      Yup.object().shape({
        uuid: Yup.string(),
        value: Yup.string().min(2, 'Too Short').max(50, 'Too Long').required('Required'),
        price: Yup.number().min(1, 'Too Low').max(1000000, 'Too High').required('Required'),
        quantity: Yup.number().min(1, 'Too Low').max(1000000, 'Too High').required('Required'),
        discountPercentage: Yup.number().min(0, 'Too Low').max(100, 'Too High').required('Required'),
      }),
    ),
  }),
  quantity: Yup.number().when('hasVariantsEnabled', {
    is: (hasVariantsEnabled) => !hasVariantsEnabled,
    then: Yup.number().min(1, 'Too Low').max(1000000, 'Too High').required('Required'),
  }),
  price: Yup.number().when('hasVariantsEnabled', {
    is: (hasVariantsEnabled) => !hasVariantsEnabled,
    then: Yup.number().min(1, 'Too Low').max(1000000, 'Too High').required('Required'),
  }),
  discountPercentage: Yup.number().when('hasVariantsEnabled', {
    is: (hasVariantsEnabled) => !hasVariantsEnabled,
    then: Yup.number().min(0, 'Too Low').max(100, 'Too High').required('Required'),
  }),
});

const AdminItemPage: React.FC<AdminItemPageProps> = (props) => {
  const { item, collections } = props;

  const creatingItem = !item;

  const initialValues: AdminItemPageForm = {
    collection: item?.collection?.uuid ?? '',
    itemName: item?.itemName ?? '',
    description: item?.description ?? '',
    existingPicture: item?.picture,
    newPicture: undefined,
    hidden: false, // TODO: Backend doesn't currently return this property, so we don't know its state.
    monthlyLimit: item?.monthlyLimit.toString() ?? '',
    lifetimeLimit: item?.lifetimeLimit.toString() ?? '',
    hasVariantsEnabled: item?.hasVariantsEnabled ?? false,
    // Variants Enabled
    categoryName: (item?.hasVariantsEnabled && item?.options[0].metadata?.type) || '',
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
    quantity: (!item?.hasVariantsEnabled && item?.options[0].quantity?.toString()) || '',
    price: (!item?.hasVariantsEnabled && item?.options[0].price.toString()) || '',
    discountPercentage: (!item?.hasVariantsEnabled && item?.options[0].discountPercentage.toString()) || '',
  };

  return (
    <>
      <StoreHeader breadcrumb breadcrumbLocation="/store" />
      <div className="admin-item-page">
        <h2 className="admin-item-page-title">{creatingItem ? 'Create Item' : 'Edit Item'}</h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={AdminItemPageFormSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const url = creatingItem ? `${Config.API_URL}${Config.routes.store.item}` : `${Config.API_URL}${Config.routes.store.item}/${item?.uuid}`;

            const payload: any = values.hasVariantsEnabled
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

            if (!creatingItem && payload.options) {
              // TODO: modify the options component to behave differently for existing items
              delete payload.options;
            }

            const data = await fetchService(url, creatingItem ? 'POST' : 'PATCH', 'json', {
              requiresAuthorization: true,
              payload: JSON.stringify({ merchandise: payload }),
            });

            if (values.newPicture) {
              const formdata = new FormData();
              formdata.append('image', values.newPicture);

              const imageUrl = `${Config.API_URL}${Config.routes.store.itemPicture}/${data.item.uuid}`;

              await fetchService(imageUrl, 'POST', 'image', {
                requiresAuthorization: true,
                payload: formdata,
              });
            }

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
                  error={touched.collection && errors.collection}
                />
              </div>
              <div className="admin-item-page-form-field">
                <h3 className="admin-item-page-form-field-label">Item Name:</h3>
                <StoreTextInput
                  size="Full"
                  attributeName="itemName"
                  value={values.itemName}
                  onChange={handleChange}
                  error={touched.itemName && errors.itemName}
                />
              </div>
              <div className="admin-item-page-form-field">
                <h3 className="admin-item-page-form-field-label">Description:</h3>
                <StoreTextInput
                  size="Field"
                  attributeName="description"
                  value={values.description}
                  onChange={handleChange}
                  error={touched.description && errors.description}
                />
              </div>
              <div className="admin-item-page-form-field">
                <h3 className="admin-item-page-form-field-label">Photo:</h3>
                <StoreImageUpload
                  existingFile={values.existingPicture}
                  setFieldValue={setFieldValue}
                  error={touched.newPicture && errors.newPicture}
                />
              </div>
              <div className="admin-item-page-form-field">
                <h3 className="admin-item-page-form-field-label">Hidden:</h3>
                <StoreCheckbox attributeName="hidden" checked={values.hidden} onChange={handleChange} />
              </div>
              <div className="admin-item-page-form-field">
                <h3 className="admin-item-page-form-field-label">Monthly Limit:</h3>
                <StoreTextInput
                  size="Quarter"
                  attributeName="monthlyLimit"
                  value={values.monthlyLimit}
                  onChange={handleChange}
                  error={touched.monthlyLimit && errors.monthlyLimit}
                />
              </div>
              <div className="admin-item-page-form-field">
                <h3 className="admin-item-page-form-field-label">Lifetime Limit:</h3>
                <StoreTextInput
                  size="Quarter"
                  attributeName="lifetimeLimit"
                  value={values.lifetimeLimit}
                  onChange={handleChange}
                  error={touched.lifetimeLimit && errors.lifetimeLimit}
                />
              </div>
              <div className="admin-item-page-form-field">
                <h3 className="admin-item-page-form-field-label">Has Variants:</h3>
                <StoreCheckbox attributeName="hasVariantsEnabled" checked={values.hasVariantsEnabled} onChange={handleChange} />
              </div>
              {values.hasVariantsEnabled ? (
                <>
                  <div className="admin-item-page-form-field">
                    <h3 className="admin-item-page-form-field-label">Category Name:</h3>
                    <StoreTextInput
                      size="Full"
                      attributeName="categoryName"
                      value={values.categoryName}
                      onChange={handleChange}
                      error={touched.categoryName && errors.categoryName}
                    />
                  </div>
                  <div className="admin-item-page-form-field">
                    <h3 className="admin-item-page-form-field-label">Options:</h3>
                    <OptionDisplay
                      options={values.options}
                      creatingItem={creatingItem}
                      onChange={(options) => {
                        setFieldValue('options', options);
                      }}
                      error={touched.options && errors.options}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="admin-item-page-form-field">
                    <h3 className="admin-item-page-form-field-label">Quantity:</h3>
                    <StoreTextInput
                      size="Quarter"
                      attributeName="quantity"
                      value={values.quantity}
                      onChange={handleChange}
                      error={touched.quantity && errors.quantity}
                    />
                  </div>
                  <div className="admin-item-page-form-field">
                    <h3 className="admin-item-page-form-field-label">Price:</h3>
                    <StoreTextInput
                      size="Quarter"
                      attributeName="price"
                      value={values.price}
                      onChange={handleChange}
                      error={touched.price && errors.price}
                    />
                  </div>
                  <div className="admin-item-page-form-field">
                    <h3 className="admin-item-page-form-field-label">Discount Percentage:</h3>
                    <StoreTextInput
                      size="Quarter"
                      attributeName="discountPercentage"
                      value={values.discountPercentage}
                      onChange={handleChange}
                      error={touched.discountPercentage && errors.discountPercentage}
                    />
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
