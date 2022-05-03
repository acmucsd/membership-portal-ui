import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { eventSelector, fetchEvent } from '../../event/eventSlice';
import PageLayout from '../../layout/containers/PageLayout';
import { useAppDispatch } from '../../redux/store';
import { ProfileParams } from '../../types';
import EditEventPage from '../components/EditEventPage';

const EditEventPageContainer: React.FC = () => {
  const { event } = useSelector(eventSelector);
  const dispatch = useAppDispatch();
  const params = useParams<ProfileParams>();

  useEffect(() => {
    dispatch(fetchEvent(params.uuid));
  }, [dispatch, params.uuid]);

  return (
    <PageLayout>
      <EditEventPage event={event} />
    </PageLayout>
  );
};

export default EditEventPageContainer;
