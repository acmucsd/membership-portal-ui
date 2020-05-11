import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { useParams } from 'react-router-dom';
import EditEventPage from '../../components/EditEventPage';
import PageLayout from '../PageLayout';

import { fetchEvent } from '../../actions/eventsActions';

const EditEventPageContainer = (props) => {
  const { event } = props;

  const params = useParams();

  useEffect(() => {
    props.fetchEvent(params.uuid);
  }, []);

  return (
    <PageLayout>
      <EditEventPage event={event} />
    </PageLayout>
  );
};

const mapStateToProps = (state) => ({
  event: state.events.event,
});

EditEventPageContainer.propTypes = {
  event: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { fetchEvent })(EditEventPageContainer);
