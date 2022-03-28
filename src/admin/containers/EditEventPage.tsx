import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { useParams } from 'react-router-dom';
import EditEventPage from '../components/EditEventPage';
import PageLayout from '../../layout/containers/PageLayout';

import { fetchEvent as fetchEventConnect } from '../../event/eventActions';

interface EditEventPageContainerProps {
  event: {
    uuid: string;
    cover: string;
    description: string;
    location: string;
    eventLink?: string;
    pointValue: string;
    title: string;
  };
  fetchEvent: Function;
}

const EditEventPageContainer: React.FC<EditEventPageContainerProps> = (props) => {
  const { event, fetchEvent } = props;

  const params: { [key: string]: any } = useParams();

  useEffect(() => {
    fetchEvent(params.uuid);
  }, [fetchEvent, params.uuid]);

  return (
    <PageLayout>
      <EditEventPage event={event} />
    </PageLayout>
  );
};

const mapStateToProps = (state: { [key: string]: any }) => ({
  event: state.event.event,
});

export default connect(mapStateToProps, { fetchEvent: fetchEventConnect })(EditEventPageContainer);
