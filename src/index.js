import React from 'react';
import ReactDOM from 'react-dom';
import EventCard from './components/EventCard/EventCard';

function App() {
  return (
    <div className='App'>
      <EventCard />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
