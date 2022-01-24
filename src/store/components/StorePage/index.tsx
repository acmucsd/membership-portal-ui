import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollections } from '../../storeActions';
import { notify } from '../../../utils';
import { PublicMerchCollection, UserAccessType } from '../../../types';

import EditableIcon from '../../../assets/icons/editable-icon.svg';
import StoreHeader from '../StoreHeader';
import ItemCard from '../ItemCard';

import './style.less';
import StoreButton from '../StoreButton';

interface StorePageProps {
  fetchCollections: Function;
  canManageStore: boolean;
}

const StorePage: React.FC<StorePageProps> = (props) => {
  const { canManageStore } = props;

  const [collections, setCollections] = useState<PublicMerchCollection[]>([]);

  useEffect(() => {
    props
      .fetchCollections()
      .then((value) => {
        setCollections(value);
      })
      .catch((reason) => {
        notify('API Error', reason.message || reason);
      });
  }, [props]);

  return (
    <>
      <StoreHeader showBalance showCart />
      <div className="store-page">
        {canManageStore && <StoreButton type="secondary" size="large" text="Create Collection" link="/store/admin/collection" />}
        <div className="collections">
          {collections.map((collection) => {
            if (collection.items.length !== 0 || canManageStore) {
              return (
                <div className={`collection${collection.archived ? ' archived' : ''}`} key={collection.uuid} id={collection.uuid}>
                  <h2 className="collection-header" style={{ color: collection.themeColorHex }}>
                    {collection.title} {collection.archived ? ' - Archived' : ''}
                    {canManageStore && (
                      <Link to={`/store/admin/collection/${collection.uuid}`}>
                        <img className="collection-header-editable-icon" src={EditableIcon} alt="Editable" />
                      </Link>
                    )}
                  </h2>
                  <div className="collection-items">
                    {collection.items
                      .sort((a, b) => a.itemName.localeCompare(b.itemName))
                      .map((item, index) => (
                        <ItemCard item={item} key={index} editable={canManageStore} editableLink={`/store/admin/item/${item.uuid}`} />
                      ))}
                    {canManageStore && <ItemCard placeholder placeholderLink="/store/admin/item" />}
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: { [key: string]: any }) => ({
  canManageStore: [UserAccessType.ADMIN, UserAccessType.MERCH_STORE_MANAGER].includes(state.auth.profile.accessType),
});

export default connect(mapStateToProps, { fetchCollections })(StorePage);
