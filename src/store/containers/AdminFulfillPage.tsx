import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PublicOrderPickupEvent } from '../../api';
import PageLayout from '../../layout/containers/PageLayout';
import { useAppDispatch } from '../../redux/store';
import { notify } from '../../utils';
import AdminFulfillPage from '../components/AdminFulfillPage';
import { fetchPastPickupEvents, fetchFuturePickupEvents, fetchPickupEvent } from '../utils';

interface AdminFulfillPageContainerProps {}

const AdminFulfillPageContainer: React.FC<AdminFulfillPageContainerProps> = () => {
  const params: { [key: string]: any } = useParams();
  const { uuid } = params;

  const [pickupEvent, setPickupEvent] = useState<PublicOrderPickupEvent>();
  const [pastPickupEvents, setPastPickupEvents] = useState<Array<PublicOrderPickupEvent>>([]);
  const [futurePickupEvents, setFuturePickupEvents] = useState<Array<PublicOrderPickupEvent>>([]);
  const dispatch = useAppDispatch();

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
  }, [uuid, dispatch]);

  const activePickupEvents = pastPickupEvents.concat(futurePickupEvents).filter((pEvent) => {
    return pEvent.status === 'ACTIVE';
  });

  return (
    <PageLayout>
      <AdminFulfillPage pickupEvent={pickupEvent} pickupEvents={activePickupEvents} />
    </PageLayout>
  );
};

export default AdminFulfillPageContainer;
