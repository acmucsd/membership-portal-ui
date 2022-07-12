import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { PublicMerchItemWithPurchaseLimits } from '../../api';
import PageLayout from '../../layout/containers/PageLayout';
import { useAppDispatch } from '../../redux/store';
import { notify } from '../../utils';
import ItemPage from '../components/ItemPage';
import { fetchItem } from '../utils';

const ItemPageContainer: React.FC = () => {
  const params: { [key: string]: any } = useParams();
  const history = useHistory();
  const { uuid } = params;

  if (!uuid) {
    history.push('/store');
  }

  const [item, setItem] = useState<PublicMerchItemWithPurchaseLimits>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchItem(uuid)
      .then(setItem)
      .catch((reason) => {
        notify('API Error', reason.message || reason);
      });
  }, [dispatch, uuid]);

  return (
    <PageLayout>
      <ItemPage item={item} />
    </PageLayout>
  );
};

export default ItemPageContainer;
