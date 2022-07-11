import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PublicEvent } from '../../api';
import { fetchEvent } from '../../event/utils';
import PageLayout from '../../layout/containers/PageLayout';
import { ProfileParams } from '../../types';
import EditEventPage from '../components/EditEventPage';

const EditEventPageContainer: React.FC = () => {
  const params = useParams<ProfileParams>();

  const [event, setEvent] = useState<PublicEvent>();

  useEffect(() => {
    fetchEvent(params.uuid).then(setEvent);
  }, [params.uuid]);

  if (!event) {
    return null;
  }

  return (
    <PageLayout>
      <EditEventPage event={event} />
    </PageLayout>
  );
};

export default EditEventPageContainer;
