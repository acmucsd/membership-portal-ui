import React from 'react';
import { PublicMerchCollection } from '../../../types';
import StoreHeader from '../StoreHeader';
import './style.less';

interface AdminQuantitiesPageProps {
  collections: PublicMerchCollection[] | undefined;
}

const AdminQuantitiesPage: React.FC<AdminQuantitiesPageProps> = (props) => {
  const { collections } = props;

  return (
    <>
      <StoreHeader breadcrumb breadcrumbLocation="/store/admin" />
      <div className="admin-quantities-page">
        <h2 className="admin-quantities-page-title">Item Quantities</h2>
        <div>
          {collections &&
            collections?.map((collection) => {
              return (
                <div className="admin-quantities-page-collection" key={collection.uuid}>
                  <p className="admin-quantities-page-collection-title">{collection.title}</p>
                  {collection.items
                    .sort((a, b) => a.itemName.localeCompare(b.itemName))
                    .map((item) => {
                      return (
                        <div className="admin-quantities-page-item" key={item.uuid}>
                          <p className="admin-quantities-page-item-title">{item.itemName}</p>
                          <p>{item.options.length === 1 && item.options[0].quantity}</p>
                          <div className="admin-quantities-page-item-options">
                            {item.options.length !== 1 &&
                              item.options
                                .sort((a, b) => (a.metadata?.position ?? 0) - (b.metadata?.position ?? 0))
                                .map((option) => {
                                  return (
                                    <div className="admin-quantities-page-option" key={option.uuid}>
                                      <p className="admin-quantities-page-option-title">
                                        {option.metadata && `${option.metadata.value}: `}
                                        {option.quantity}
                                      </p>
                                    </div>
                                  );
                                })}
                          </div>
                        </div>
                      );
                    })}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default AdminQuantitiesPage;
