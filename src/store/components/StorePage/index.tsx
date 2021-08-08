import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { fetchCollections } from '../../storeActions';
import { notify } from '../../../utils';
import { MerchandiseCollectionModel } from '../../../types';

import NavigationBar from '../NavigationBar';
import CollectionItemCard from '../CollectionItemCard';

import './style.less';

interface StorePageProps {
  fetchCollections: Function;
}

const StorePage: React.FC<StorePageProps> = (props) => {
  const [collections, setCollections] = useState<MerchandiseCollectionModel[]>([]);

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
    <div className="store-page">
      <NavigationBar home balance={10000} cartSize={2} />
      <div className="collections">
        {collections.map((collection) => {
          return (
            <div className="collection">
              <h2 className="collection-header">{collection.title}</h2>
              <div className="collection-items">
                {collection.items.map((item) => (
                  <CollectionItemCard
                    uuid={item.uuid}
                    itemName={item.itemName}
                    hidden={item.hidden}
                    picture={item.picture}
                    description={item.description}
                    options={item.options}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default connect(() => ({}), { fetchCollections })(StorePage);
