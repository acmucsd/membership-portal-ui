import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchItem } from '../storeActions';
import { PublicMerchItem } from '../../types';
import { notify } from '../../utils';

import PageLayout from '../../layout/containers/PageLayout';
import AdminItemPage from '../components/AdminItemPage';

interface AdminItemPageContainerProps {
  fetchItem: Function;
}

const AdminItemPageContainer: React.FC<AdminItemPageContainerProps> = (props) => {
  const params: { [key: string]: any } = useParams();
  const { uuid } = params;

  const [item, setItem] = useState<PublicMerchItem>();

  useEffect(() => {
    if (uuid) {
      props
        .fetchItem(uuid)
        .then((value) => {
          setItem(value);
        })
        .catch((reason) => {
          notify('API Error', reason.message || reason);
        });
    }
  }, [props, uuid]);

  return (
    <PageLayout>
      <AdminItemPage item={item} />
    </PageLayout>
  );
};

export default connect(() => ({}), { fetchItem })(AdminItemPageContainer);
