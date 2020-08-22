import React from 'react';
import { connect } from 'react-redux';

import EditStoreCollection from '../../components/EditStoreCollection';
import { fetchCollections } from '../../actions/storeActions';

interface EditStoreCollectionsContainerProps {
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
  handleChange: (data: string) => void;
}

const EditStoreCollectionsContainer: React.FC<EditStoreCollectionsContainerProps> = (props) => {
  const { auth, collections, handleChange } = props;

  return (
    <div>
      {collections.map((collection) => {
        return (
          <EditStoreCollection
            key={collection.uuid}
            uuid={collection.uuid}
            description={collection.description}
            title={collection.title}
            merchandise={collection.merchandise}
            auth={auth}
            handleChange={handleChange}
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

export default connect(mapStateToProps, { fetchCollections })(EditStoreCollectionsContainer);
