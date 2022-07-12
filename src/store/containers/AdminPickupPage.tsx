import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PublicOrderPickupEvent } from '../../api';
import PageLayout from '../../layout/containers/PageLayout';
import { notify } from '../../utils';
import AdminPickupPage from '../components/AdminPickupPage';
import { cancelPickupEvent, deletePickupEvent, fetchPastPickupEvents, fetchFuturePickupEvents, fetchPickupEvent } from '../utils';

const AdminPickupPageContainer: React.FC = () => {
  const params: { [key: string]: any } = useParams();
  const { uuid } = params;

  const [pickupEvent, setPickupEvent] = useState<PublicOrderPickupEvent>();
  const [pastPickupEvents, setPastPickupEvents] = useState<Array<PublicOrderPickupEvent>>([]);
  const [futurePickupEvents, setFuturePickupEvents] = useState<Array<PublicOrderPickupEvent>>([]);

  useEffect(() => {
    if (uuid) {
      fetchPickupEvent(uuid)
        .then(setPickupEvent)
        .catch((reason) => notify('API Error', reason.message || reason));
    } else {
      fetchPastPickupEvents()
        .then(setPastPickupEvents)
        .catch((reason) => notify('API Error', reason.message || reason));
      fetchFuturePickupEvents()
        .then(setFuturePickupEvents)
        .catch((reason) => notify('API Error', reason.message || reason));
    }
  }, [uuid]);

  const activePickupEvents = pastPickupEvents.concat(futurePickupEvents).filter((pEvent) => {
    return pEvent.status === 'ACTIVE';
  });

  return (
    <PageLayout>
      <AdminPickupPage
        pickupEvent={pickupEvent}
        pickupEvents={activePickupEvents}
        deletePickupEvent={deletePickupEvent}
        cancelPickupEvent={cancelPickupEvent}
      />
    </PageLayout>
  );
};

export default AdminPickupPageContainer;
