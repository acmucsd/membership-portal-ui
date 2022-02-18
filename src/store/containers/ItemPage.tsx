import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { fetchItem } from '../storeActions';
import { PublicMerchItemWithPurchaseLimits } from '../../types';
import { notify } from '../../utils';

import PageLayout from '../../layout/containers/PageLayout';
import ItemPage from '../components/ItemPage';

const ItemPageContainer: React.FC = () => {
  const params: { [key: string]: any } = useParams();
  const history = useHistory();
  const { uuid } = params;

  if (!uuid) {
    history.push('/store');
  }

  const [item, setItem] = useState<PublicMerchItemWithPurchaseLimits>();

  useEffect(() => {
    fetchItem(uuid)
      .then((value) => {
        setItem(value);
      })
      .catch((reason) => {
        notify('API Error', reason.message || reason);
      });
  }, [uuid]);

  return (
    <PageLayout>
      <ItemPage item={item} />
    </PageLayout>
  );
};

export default ItemPageContainer;
