import React, { useState } from 'react';
import { connect } from 'react-redux';
import AdminOrderPage from '../components/AdminOrderPage';
import PageLayout from './PageLayout';

// Dummy functions to log into console effects from
// actions from the container.
//
// Ideally, we will replace these functions with ones
// that directly update the order item on the API.
//
// The console calls are placeholders as of now and will
// be removed when middleware is attached to the container.
const setNote = (note: string) => {
  // eslint-disable-next-line no-console
  console.log(`setNote called! Contents: ${note}`);
};

const setFulfill = (fulfilled: boolean) => {
  // eslint-disable-next-line no-console
  console.log(`setFulfilled called! Checked value of checkmark: ${fulfilled}`);
};

const testProps = {
  orders: [
    {
      uuid: '1784089c-94e1-433f-ac67-e114dd124b9e',
      orderedAt: new Date('February 27, 2001 12:00:00'),
      items: [
        {
          uuid: 'f5ac9abe-8062-487c-9156-52adbe381591',
          itemName: 'Example different item',
          price: 19500,
          quantity: 2,
          fulfilled: false,
          description: 'Self-explanatory.',
          notes: '',
        },
        {
          uuid: '5b80b81c-6947-4445-baa1-2c1d9f373856',
          itemName: 'ACM Mug',
          price: 2500,
          quantity: 1,
          fulfilled: false,
          description: 'mug',
          notes: '',
        },
      ],
    },
    {
      uuid: '72a08e11-0942-440c-a2dd-91abe2ad09ac',
      orderedAt: new Date('May 30, 2020 12:00:00'),
      items: [
        {
          uuid: 'eeb77041-4566-4e0c-9e89-a58e0b7b2afd',
          itemName: 'Unisex Raccoon Print Shell Jacket - M',
          price: 21300,
          quantity: 1,
          fulfilled: false,
          description: 'Self-explanatory.',
          notes: '',
        },
        {
          uuid: 'df08d112-7e8d-4103-9012-cb26cb3012ab',
          itemName: 'ACM Mug 2?!',
          quantity: 30,
          fulfilled: false,
          price: 30000,
          description: 'mug',
          notes: '',
        },
      ],
    },
  ],
};

const AdminOrderPageContainer: React.FC = () => {
  const [noteVisible, setNoteVisible] = useState(false);
  const [scratchNote, setScratchNote] = useState('');

  return (
    <PageLayout>
      <AdminOrderPage
        orders={testProps.orders}
        setNote={setNote}
        setFulfill={setFulfill}
        noteVisible={noteVisible}
        setNoteVisible={setNoteVisible}
        scratchNote={scratchNote}
        setScratchNote={setScratchNote}
      />
    </PageLayout>
  );
};

export default connect(null, null)(AdminOrderPageContainer);
