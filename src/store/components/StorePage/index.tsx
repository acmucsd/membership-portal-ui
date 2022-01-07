import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollections } from '../../storeActions';
import { notify } from '../../../utils';
import { PublicMerchCollection } from '../../../types';

import EditableIcon from '../../../assets/icons/editable-icon.svg';
import StoreHeader from '../StoreHeader';
import ItemCard from '../ItemCard';

import './style.less';
import StoreButton from '../StoreButton';

interface StorePageProps {
  fetchCollections: Function;
  isAdmin: boolean;
}

const StorePage: React.FC<StorePageProps> = (props) => {
  const { isAdmin } = props;

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
        {isAdmin && <StoreButton type="secondary" size="large" text="Create Collection" link="/store/admin/collection" />}
        <div className="collections">
          {collections.map((collection) => {
            if (collection.items.length !== 0 || isAdmin) {
              return (
                <div className={`collection${collection.archived ? ' archived' : ''}`} key={collection.uuid} id={collection.uuid}>
                  <h2 className="collection-header" style={{ color: collection.themeColorHex }}>
                    {collection.title} {collection.archived ? ' - Archived' : ''}
                    {isAdmin && (
                      <Link to={`/store/admin/collection/${collection.uuid}`}>
                        <img className="collection-header-editable-icon" src={EditableIcon} alt="Editable" />
                      </Link>
                    )}
                  </h2>
                  <div className="collection-items">
                    {collection.items.map((item, index) => (
                      <ItemCard item={item} key={index} editable={isAdmin} editableLink={`/store/admin/item/${item.uuid}`} />
                    ))}
                    {isAdmin && <ItemCard placeholder placeholderLink="/store/admin/item" />}
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
  isAdmin: state.auth.admin,
});

export default connect(mapStateToProps, { fetchCollections })(StorePage);
