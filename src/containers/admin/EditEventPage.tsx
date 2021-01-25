import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { useParams } from 'react-router-dom';
import EditEventPage from '../../components/admin/EditEventPage';
import PageLayout from '../PageLayout';

import { fetchEvent } from '../../actions/eventsActions';

interface EditEventPageContainerProps {
  event: {
    uuid: string;
    cover: string;
    description: string;
    location: string;
    pointValue: string;
    title: string;
  };
  fetchEvent: Function;
}

const EditEventPageContainer: React.FC<EditEventPageContainerProps> = (props) => {
  const { event } = props;

  const params: { [key: string]: any } = useParams();

  useEffect(() => {
    props.fetchEvent(params.uuid);
  }, []);

  return (
    <PageLayout>
      <EditEventPage event={event} />
    </PageLayout>
  );
};

const mapStateToProps = (state: { [key: string]: any }) => ({
  event: state.events.event,
});

export default connect(mapStateToProps, { fetchEvent })(EditEventPageContainer);
