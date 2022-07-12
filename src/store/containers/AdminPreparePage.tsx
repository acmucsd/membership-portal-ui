import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PublicOrderPickupEvent } from '../../api';
import PageLayout from '../../layout/containers/PageLayout';
import { notify } from '../../utils';
import AdminPreparePage from '../components/AdminPreparePage';
import { fetchPastPickupEvents, fetchFuturePickupEvents, fetchPickupEvent } from '../utils';

const AdminPreparePageContainer: React.FC = () => {
  const params: { [key: string]: any } = useParams();
  const { uuid } = params;

  const [pickupEvent, setPickupEvent] = useState<PublicOrderPickupEvent>();
  const [pastPickupEvents, setPastPickupEvents] = useState<Array<PublicOrderPickupEvent>>([]);
  const [futurePickupEvents, setFuturePickupEvents] = useState<Array<PublicOrderPickupEvent>>([]);

  useEffect(() => {
    if (uuid) {
      fetchPickupEvent(uuid)
        .then(setPickupEvent)
        .catch((reason) => {
          notify('API Error', reason.message || reason);
        });
    } else {
      fetchPastPickupEvents()
        .then(setPastPickupEvents)
        .catch((reason) => {
          notify('API Error', reason.message || reason);
        });
      fetchFuturePickupEvents()
        .then(setFuturePickupEvents)
        .catch((reason) => {
          notify('API Error', reason.message || reason);
        });
    }
  }, [uuid]);

  const activePickupEvents = pastPickupEvents.concat(futurePickupEvents).filter((pEvent) => {
    return pEvent.status === 'ACTIVE';
  });

  return (
    <PageLayout>
      <AdminPreparePage pickupEvent={pickupEvent} pickupEvents={activePickupEvents} />
    </PageLayout>
  );
};

export default AdminPreparePageContainer;
