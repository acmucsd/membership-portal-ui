import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { fetchItem } from '../storeActions';
import { PublicMerchItemWithPurchaseLimits } from '../../types';
import { notify } from '../../utils';

import PageLayout from '../../layout/containers/PageLayout';
import ItemPage from '../components/ItemPage';

interface ItemPageContainerProps {
  fetchItem: Function;
}

const ItemPageContainer: React.FC<ItemPageContainerProps> = (props) => {
  const params: { [key: string]: any } = useParams();
  const history = useHistory();
  const { uuid } = params;

  if (!uuid) {
    history.push('/store');
  }

  const [item, setItem] = useState<PublicMerchItemWithPurchaseLimits>();

  useEffect(() => {
    props
      .fetchItem(uuid)
      .then((value) => {
        setItem(value);
      })
      .catch((reason) => {
        notify('API Error', reason.message || reason);
      });
  }, [props, uuid]);

  if (!item) return null;

  return (
    <PageLayout>
      <ItemPage item={item} />
    </PageLayout>
  );
};

export default connect(() => ({}), { fetchItem })(ItemPageContainer);
