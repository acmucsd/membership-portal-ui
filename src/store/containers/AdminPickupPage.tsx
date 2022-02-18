import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchPickupEvent, fetchFuturePickupEvents, deletePickupEvent, cancelPickupEvent } from '../storeActions';
import { PublicOrderPickupEvent } from '../../types';
import { notify } from '../../utils';

import PageLayout from '../../layout/containers/PageLayout';
import AdminPickupPage from '../components/AdminPickupPage';

const AdminPickupPageContainer: React.FC = () => {
  const params: { [key: string]: any } = useParams();
  const { uuid } = params;

  const [pickupEvent, setPickupEvent] = useState<PublicOrderPickupEvent>();
  const [pickupEvents, setPickupEvents] = useState<Array<PublicOrderPickupEvent>>([]);

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
      <AdminPickupPage
        pickupEvent={pickupEvent}
        pickupEvents={pickupEvents}
        deletePickupEvent={deletePickupEvent}
        cancelPickupEvent={cancelPickupEvent}
      />
    </PageLayout>
  );
};

export default AdminPickupPageContainer;
