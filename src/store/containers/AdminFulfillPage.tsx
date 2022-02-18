import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchPickupEvent, fetchFuturePickupEvents } from '../storeActions';
import { PublicOrderPickupEvent } from '../../types';
import { notify } from '../../utils';

import PageLayout from '../../layout/containers/PageLayout';
import AdminFulfillPage from '../components/AdminFulfillPage';

const AdminFulfillPageContainer: React.FC = () => {
  const params: { [key: string]: any } = useParams();
  const { uuid } = params;

  const [pickupEvent, setPickupEvent] = useState<PublicOrderPickupEvent>();
  const [pickupEvents, setPickupEvents] = useState<Array<PublicOrderPickupEvent>>();

  useEffect(() => {
    if (uuid) {
      fetchPickupEvent(uuid)
        .then((value) => {
          setPickupEvent(value);
        })
        .catch((reason) => {
          notify('API Error', reason.message || reason);
        });
    } else {
      fetchFuturePickupEvents()
        .then((value) => {
          setPickupEvents(value);
        })
        .catch((reason) => {
          notify('API Error', reason.message || reason);
        });
    }
  }, [uuid]);

  return (
    <PageLayout>
      <AdminFulfillPage pickupEvent={pickupEvent} pickupEvents={pickupEvents} />
    </PageLayout>
  );
};

export default AdminFulfillPageContainer;
