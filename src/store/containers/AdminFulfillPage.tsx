import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchPickupEvent, fetchFuturePickupEvents } from '../storeActions';
import { PublicOrderPickupEvent } from '../../types';
import { notify } from '../../utils';

import PageLayout from '../../layout/containers/PageLayout';
import AdminFulfillPage from '../components/AdminFulfillPage';

interface AdminFulfillPageContainerProps {
  fetchPickupEvent: Function;
  fetchFuturePickupEvents: Function;
}

const AdminFulfillPageContainer: React.FC<AdminFulfillPageContainerProps> = (props) => {
  const params: { [key: string]: any } = useParams();
  const { uuid } = params;

  const [pickupEvent, setPickupEvent] = useState<PublicOrderPickupEvent>();
  const [pickupEvents, setPickupEvents] = useState<Array<PublicOrderPickupEvent>>();

  useEffect(() => {
    if (uuid) {
      // TODO: Change this code to omit the `fetchFuturePickupEvents` call once `fetchPickupEvent` actually exists
      props
        .fetchPickupEvent(uuid)
        .then((value) => {
          setPickupEvent(value);
        })
        .catch((reason) => {
          // check to see if uuid exists in pickupEvents
          props
            .fetchFuturePickupEvents()
            .then((value) => {
              setPickupEvents(value);

              const event = value?.filter((elem) => elem.uuid === uuid);
              if (event && event?.length > 0) {
                setPickupEvent(event[0]);
                notify('API Error', "The API Route didn't work, but we had the data before anyways. BE should probably fix this");
              } else {
                notify('API Error', reason.message || reason);
              }
            })
            .catch((reasonTwo) => {
              notify('API Error', reasonTwo.message || reasonTwo);
            });
        });
    } else {
      props
        .fetchFuturePickupEvents()
        .then((value) => {
          setPickupEvents(value);
        })
        .catch((reason) => {
          notify('API Error', reason.message || reason);
        });
    }
  }, [props, uuid]);

  return (
    <PageLayout>
      <AdminFulfillPage pickupEvent={pickupEvent} pickupEvents={pickupEvents} />
    </PageLayout>
  );
};

export default connect(() => ({}), { fetchPickupEvent, fetchFuturePickupEvents })(AdminFulfillPageContainer);
