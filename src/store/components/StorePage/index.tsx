import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import EditableIcon from '../../../assets/icons/editable-icon.svg';
import { authSelector } from '../../../auth/authSlice';
import { useAppDispatch } from '../../../redux/store';
import { PublicMerchCollection, UserAccessType } from '../../../types';
import { notify } from '../../../utils';
import { fetchCollections } from '../../storeSlice';
import ItemCard from '../ItemCard';
import StoreButton from '../StoreButton';
import StoreHeader from '../StoreHeader';
import './style.less';

const StorePage: React.FC = () => {
  const auth = useSelector(authSelector);
  const canManageStore = [UserAccessType.ADMIN, UserAccessType.MERCH_STORE_MANAGER].includes(auth.profile.accessType);

  const [collections, setCollections] = useState<PublicMerchCollection[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCollections())
      .unwrap()
      .then((value) => {
        setCollections(value);
      })
      .catch((reason) => {
        notify('API Error', reason.message || reason);
      });
  }, [dispatch]);

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

export default StorePage;
