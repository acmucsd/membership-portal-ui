import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchPickupEvent } from '../storeActions';
import { PublicOrderPickupEvent } from '../../types';
import { notify } from '../../utils';

import PageLayout from '../../layout/containers/PageLayout';
import AdminFulfillPage from '../components/AdminFulfillPage';

interface AdminFulfillPageContainerProps {
  fetchPickupEvent: Function;
}

const AdminFulfillPageContainer: React.FC<AdminFulfillPageContainerProps> = (props) => {
  const params: { [key: string]: any } = useParams();
  const { uuid } = params;

  const [pickupEvent, setPickupEvent] = useState<PublicOrderPickupEvent>();

  useEffect(() => {
    if (uuid) {
      props
        .fetchPickupEvent(uuid)
        .then((value) => {
          setPickupEvent(value);
        })
        .catch((reason) => {
          notify('API Error', reason.message || reason);
        });
    }
  }, [props, uuid]);

  return (
    <PageLayout>
      <AdminFulfillPage pickupEvent={pickupEvent} />
    </PageLayout>
  );
};

export default connect(() => ({}), { fetchPickupEvent })(AdminFulfillPageContainer);
