import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useContext, useEffect } from 'react';

import TransducerContextProvider, { TransducerContext } from '../../src/context/TransducerContext';
import { Transducer } from '../../src/models/model';
import { TRANSDUCERS } from '../data/testData';

const TestComponent = () => {
  const { 
    transducers, 
    fetchTransducers, 
    addTransducer, 
    deleteTransducer, 
    editTransducer 
  } = useContext(TransducerContext);

  useEffect(() => {
    fetchTransducers(TRANSDUCERS);
  }, []);

  return (
    <>
      <ul>
        {transducers.map((transducer: Transducer) => (
          <div key={transducer.id}>
            <h2>{transducer.name}</h2>
            <p>{transducer.location}</p>
          </div>
        ))}
      </ul>
      <button onClick={() => addTransducer(NEW_TRANSDUCER)}>
        Add
      </button>
      <button onClick={() => deleteTransducer(transducers[0].id)}>
        Delete
      </button>
      <button onClick={() => editTransducer(NEW_TRANSDUCER_EDIT)}>
        Edit
      </button>
    </>
  );
};

describe('TransducerContextProvider', () => {
  test('should render child component using TransducerContextProvider fetchTransducers', () => {
    render(
      <TransducerContextProvider>
        <TestComponent />
      </TransducerContextProvider>
    );

    const heading = screen.getAllByRole('heading');
    expect(heading.length).toBe(5);
  });

  test('should render child component using TransducerContextProvider addTransducers', async () => {
    render(
      <TransducerContextProvider>
        <TestComponent />
      </TransducerContextProvider>
    );

    const button = screen.getByRole('button', {name: 'Add'});
    const user = userEvent.setup();
    await user.click(button);

    const heading = screen.getAllByRole('heading');
    expect(heading.length).toBe(6);
  });

  test('should render child component using TransducerContextProvider deleteTransducers', async () => {
    render(
      <TransducerContextProvider>
        <TestComponent />
      </TransducerContextProvider>
    );

    const button = screen.getByRole('button', {name: 'Delete'});
    const user = userEvent.setup();
    await user.click(button);

    const heading = screen.getAllByRole('heading');
    expect(heading.length).toBe(4);
  });

  test('should render child component using TransducerContextProvider editTransducers', async () => {
    render(
      <TransducerContextProvider>
        <TestComponent />
      </TransducerContextProvider>
    );

    const addButton = screen.getByRole('button', {name: 'Add'});
    const user = userEvent.setup();
    await user.click(addButton);

    let heading = screen.getByRole('heading', {name: 'New'});
    expect(heading).toBeInTheDocument();

    const editButton = screen.getByRole('button', {name: 'Edit'});
    await user.click(editButton);
    
    heading = screen.getByRole('heading', {name: 'Edited'});
    expect(heading).toBeInTheDocument();
  });
});

const NEW_TRANSDUCER: Transducer = {
  id: '23456',
  name: 'New',
  location: 'RISMAN',
  department: 'MFM',
  transducerType: 'TV',
  room: '4',
  serialNumber: 'K1302Z',
  internalIdentifier: '14',
  controlNumber: '00FB-13221',
  dateReceived: "2024-02-15T03:50:45.695Z",
  outOfService: false,
  currentCondition: [
    {
      id: crypto.randomUUID(),
      condition: 'Working',
      conditionChangedDate: "2024-02-15T03:50:45.695Z",
      note: 'New from GE',
    },
  ],
};

const NEW_TRANSDUCER_EDIT: Transducer = {
  id: '23456',
  name: 'Edited',
  location: 'RISMAN',
  department: 'MFM',
  transducerType: 'TV',
  room: '4',
  serialNumber: 'K1302Z32',
  internalIdentifier: '14',
  controlNumber: '00FB-13221',
  dateReceived: "2024-02-15T03:50:45.695Z",
  outOfService: false,
  currentCondition: [
    {
      id: crypto.randomUUID(),
      condition: 'Working',
      conditionChangedDate: "2024-02-15T03:50:45.695Z",
      note: 'New from GE',
    },
    {
      id: crypto.randomUUID(),
      condition: 'Working',
      conditionChangedDate: "2024-02-16T03:50:45.695Z",
      note: 'Edited',
    },
  ],
};