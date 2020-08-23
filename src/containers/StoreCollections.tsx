import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import StoreCollection from '../components/StoreCollection';
import fetchCollections from '../actions/storeActions';

interface StoreCollectionsContainerProps {
  auth: {
    admin: boolean;
  };
  collections: [
    {
      uuid: string;
      archived: boolean;
      merchandise: [
        {
          collection: string;
          description: string;
          discountPercentage: number;
          itemName: string;
          lifetimeLimit: number;
          monthlyLimit: number;
          picture: string;
          price: number;
          uuid: string;
        },
      ];
      description: string;
      title: string;
    },
  ];
  fetchCollections: Function;
}

const StoreCollectionsContainer: React.FC<StoreCollectionsContainerProps> = (props) => {
  const { auth, collections } = props;

  useEffect(() => {
    props.fetchCollections();
  }, []);

  return (
    <div>
      {collections.map((collection) => {
        return (
          <StoreCollection
            key={collection.uuid}
            uuid={collection.uuid}
            description={collection.description}
            title={collection.title}
            merchandise={collection.merchandise}
            auth={auth}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = (state: { [key: string]: any }) => ({
  collections: state.store.collections,
  auth: state.auth,
});

export default connect(mapStateToProps, { fetchCollections })(StoreCollectionsContainer);
