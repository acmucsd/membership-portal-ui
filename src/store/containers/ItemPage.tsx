import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PageLayout from '../../layout/containers/PageLayout';
import { useAppDispatch } from '../../redux/store';
import { PublicMerchItemWithPurchaseLimits } from '../../types';
import { notify } from '../../utils';
import ItemPage from '../components/ItemPage';
import { fetchItem } from '../storeSlice';

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
    dispatch(fetchItem(uuid))
      .unwrap()
      .then((value) => {
        setItem(value);
      })
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
