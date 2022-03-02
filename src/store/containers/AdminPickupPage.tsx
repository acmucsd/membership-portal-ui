import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../../layout/containers/PageLayout';
import { useAppDispatch } from '../../redux/store';
import { PublicOrderPickupEvent } from '../../types';
import { notify } from '../../utils';
import AdminPickupPage from '../components/AdminPickupPage';
import { cancelPickupEvent, deletePickupEvent, fetchFuturePickupEvents, fetchPickupEvent } from '../storeSlice';

const AdminPickupPageContainer: React.FC = () => {
  const params: { [key: string]: any } = useParams();
  const { uuid } = params;

  const [pickupEvent, setPickupEvent] = useState<PublicOrderPickupEvent>();
  const [pickupEvents, setPickupEvents] = useState<Array<PublicOrderPickupEvent>>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (uuid) {
      dispatch(fetchPickupEvent(uuid))
        .unwrap()
        .then((value) => setPickupEvent(value))
        .catch((reason) => notify('API Error', reason.message || reason));
    } else {
      dispatch(fetchFuturePickupEvents())
        .unwrap()
        .then((value) => setPickupEvents(value))
        .catch((reason) => notify('API Error', reason.message || reason));
    }
  }, [dispatch, uuid]);

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
