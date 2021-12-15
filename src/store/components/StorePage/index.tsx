import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { fetchCollections } from '../../storeActions';
import { notify } from '../../../utils';
import { PublicMerchCollection } from '../../../types';

import StoreHeader from '../StoreHeader';
import ItemCard from '../ItemCard';

import './style.less';

interface StorePageProps {
  fetchCollections: Function;
}

const StorePage: React.FC<StorePageProps> = (props) => {
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
        <div className="collections">
          {collections.map((collection) => {
            return (
              <div className="collection" key={collection.uuid} id={collection.uuid}>
                <h2 className="collection-header" style={{ color: collection.themeColorHex }}>
                  {collection.title}
                </h2>
                <div className="collection-items">
                  {collection.items.map((item, index) => (
                    <ItemCard item={item} key={index} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default connect(() => ({}), { fetchCollections })(StorePage);
