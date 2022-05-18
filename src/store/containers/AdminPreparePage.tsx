import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../../layout/containers/PageLayout';
import { useAppDispatch } from '../../redux/store';
import { PublicOrderPickupEvent } from '../../types';
import { notify } from '../../utils';
import AdminPreparePage from '../components/AdminPreparePage';
import { fetchPastPickupEvents, fetchFuturePickupEvents, fetchPickupEvent } from '../storeSlice';

const AdminPreparePageContainer: React.FC = () => {
  const params: { [key: string]: any } = useParams();
  const { uuid } = params;

  const [pickupEvent, setPickupEvent] = useState<PublicOrderPickupEvent>();
  const [pastPickupEvents, setPastPickupEvents] = useState<Array<PublicOrderPickupEvent>>([]);
  const [futurePickupEvents, setFuturePickupEvents] = useState<Array<PublicOrderPickupEvent>>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (uuid) {
      dispatch(fetchPickupEvent(uuid))
        .unwrap()
        .then((value) => {
          setPickupEvent(value);
        })
        .catch((reason) => {
          notify('API Error', reason.message || reason);
        });
    } else {
      dispatch(fetchPastPickupEvents())
        .unwrap()
        .then((value) => {
          setPastPickupEvents(value);
        })
        .catch((reason) => {
          notify('API Error', reason.message || reason);
        });
      dispatch(fetchFuturePickupEvents())
        .unwrap()
        .then((value) => {
          setFuturePickupEvents(value);
        })
        .catch((reason) => {
          notify('API Error', reason.message || reason);
        });
    }
  }, [dispatch, uuid]);

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
