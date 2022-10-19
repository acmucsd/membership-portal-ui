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
  const { fetchPickupEvent: fetchPickupEventFunction, fetchFuturePickupEvents: fetchFuturePickupEventsFunction } = props;

  const [pickupEvent, setPickupEvent] = useState<PublicOrderPickupEvent>();
  const [pickupEvents, setPickupEvents] = useState<Array<PublicOrderPickupEvent>>();

  useEffect(() => {
    if (uuid) {
      fetchPickupEventFunction(uuid)
        .then((value) => {
          setPickupEvent(value);
        })
        .catch((reason) => {
          notify('API Error', reason.message || reason);
        });
    } else {
      fetchFuturePickupEventsFunction()
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
