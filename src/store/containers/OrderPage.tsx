import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { fetchOrder } from '../storeActions';
import { PublicOrder } from '../../types';
import { notify } from '../../utils';

import PageLayout from '../../layout/containers/PageLayout';
import OrderPage from '../components/OrderPage';

interface OrderPageContainerProps {
  fetchOrder: Function;
}

const OrderPageContainer: React.FC<OrderPageContainerProps> = (props) => {
  const params: { [key: string]: any } = useParams();
  const history = useHistory();
  const { uuid } = params;

  if (!uuid) {
    history.push('/store');
  }

  const [order, setOrder] = useState<PublicOrder>();

  useEffect(() => {
    props
      .fetchOrder(uuid)
      .then((value) => {
        setOrder(value);
      })
      .catch((reason) => {
        notify('API Error', reason.message || reason);
      });
  }, [props, uuid]);

  return (
    <PageLayout>
      <OrderPage order={order} />
    </PageLayout>
  );
};

export default connect(() => ({}), { fetchOrder })(OrderPageContainer);
